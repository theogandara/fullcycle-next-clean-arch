import { Cart } from "../../domain/entities/cart";
import { CartGateway } from "../../domain/gateways/cart.gateway";

export class ClearCart {
  constructor(public cartGateway: CartGateway) {}

  execute(): Cart {
    const cart = this.cartGateway.get();
    cart.clear();
    this.cartGateway.save(cart);
    return cart;
  }
}
