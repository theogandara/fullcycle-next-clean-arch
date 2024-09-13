import { Product } from "../../domain/entities/product";
import { ProductGateway } from "../../domain/gateways/product.gateway";

export class GetProduct {
  constructor(public productGateway: ProductGateway) {}

  async execute(id: string): Promise<Product> {
    return await this.productGateway.findById(id);
  }
}
