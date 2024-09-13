import { Cart } from "../../domain/entities/cart";
import { Product } from "../../domain/entities/product";
import { CartGateway } from "../../domain/gateways/cart.gateway";

export class CartGatewayLocalStorage implements CartGateway {
  private readonly CART_KEY = "CART";

  get(): Cart {
    const products = JSON.parse(localStorage.getItem(this.CART_KEY) || "{}");
    return new Cart({
      products: products.map(
        (p: any) =>
          new Product({
            name: p.name,
            id: p.id,
            description: p.description,
            price: p.price,
          })
      ),
    });
  }
  save(cart: Cart): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart.products));
  }
}
