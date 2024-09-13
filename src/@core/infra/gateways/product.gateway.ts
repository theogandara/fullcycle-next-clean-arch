import { AxiosInstance } from "axios";
import { Product } from "../../domain/entities/product";
import { ProductGateway } from "../../domain/gateways/product.gateway";

export class ProductHttpGateway implements ProductGateway {
  constructor(private http: AxiosInstance) {}

  async findAll(): Promise<Product[]> {
    return this.http.get("/products").then((res) =>
      res.data.map((element: Product) => {
        new Product({
          id: element.id,
          name: element.name,
          description: element.description,
          price: element.price,
        });
      })
    );
  }
  findById(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
