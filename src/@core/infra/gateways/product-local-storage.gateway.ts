import { Product } from "../../domain/entities/product";
import { ProductGateway } from "../../domain/gateways/product.gateway";

export class ProductHttpGateway implements ProductGateway {
  constructor() {}

  async findAll(): Promise<Product[]> {
    const products = localStorage.getItem("products");

    return JSON.parse(products || "[]");
  }

  async findById(id: string): Promise<Product> {
    return new Product({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      price: 10,
      image: "http://localhost:3000/image.png",
      category: "Category 1",
    });
  }
}
