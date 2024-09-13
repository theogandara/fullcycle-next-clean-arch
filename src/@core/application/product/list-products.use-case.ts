import { Product } from "../../domain/entities/product";
import { ProductGateway } from "../../domain/gateways/product.gateway";

export class ListProducts {
  constructor(private productGateway: ProductGateway) {}

  async execute(): Promise<Product[]> {
    return await this.productGateway.findAll();
  }
}
