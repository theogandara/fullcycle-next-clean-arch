import { AxiosInstance } from "axios";
import { Product } from "../../domain/entities/product";
import { ProductGateway } from "../../domain/gateways/product.gateway";

export class ProductHttpGateway implements ProductGateway {
  constructor(public http: AxiosInstance) {}

  async findAll(): Promise<Product[]> {
    return this.http.get("/products").then((res) => {
      const data = res.data.map((element: Product) => {
        return new Product({
          id: element.id,
          name: element.name,
          description: element.description,
          price: element.price,
        });
      });

      return data;
    });
  }
  async findById(id: string): Promise<Product> {
    return this.http.get(`/products/${id}`).then((res) => {
      return res.data;
    });
  }
}
