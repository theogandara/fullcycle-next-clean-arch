import { Cart } from "../../domain/entities/cart";
import { CartGateway } from "../../domain/gateways/cart.gateway";

export class RemoveProductFromCart {
  constructor(public cartGateway: CartGateway) {}

  execute(id: string): Cart {
    const cart = this.cartGateway.get();
    cart.removeProduct(id);
    this.cartGateway.save(cart);
    return cart;
  }
}
