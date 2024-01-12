import { Product } from "../../domain/entities/product";
import { ProductGateway } from "../../domain/gateways/product.gateway";
import { AxiosInstance } from "axios";

export class ProductHttpGateway implements ProductGateway {
  constructor(private http: AxiosInstance) {}

  async findAll(): Promise<Product[]> {
    return this.http.get<Product[]>("/products").then((res) =>
      res.data.map(
        (prd) =>
          new Product({
            price: prd.price,
            name: prd.name,
            description: prd.description,
            image: prd.image,
            id: prd.id,
            category: prd.category,
          })
      )
    );
  }

  async findById(id: string): Promise<Product> {
    return this.http.get<Product>(`/products/${id}`).then(
      (res) =>
        new Product({
          price: res.data.price,
          name: res.data.name,
          description: res.data.description,
          image: res.data.image,
          id: res.data.id,
          category: res.data.category,
        })
    );
  }
}
