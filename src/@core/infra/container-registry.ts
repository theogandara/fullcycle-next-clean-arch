import "reflect-metadata";
import { Container } from "inversify";
import { http } from "./http";
import { ProductHttpGateway } from "./gateways/product.gateway";
import { ListProducts } from "../application/product/list-products.use-case";
import { CartGatewayLocalStorage } from "./gateways/cart.gateway";
import { GetCart } from "../application/cart/get-cart.use-case";
import { ClearCart } from "../application/cart/clear-cart.use-case";
import { RemoveProductFromCart } from "../application/cart/remove-product-from-cart.use-case";
import { AddProductInCart } from "../application/cart/add-product-in-cart.use-case";
import { GetProduct } from "../application/product/get-product.use-case";

export const Registry = {
  // HTTP
  AxiosAdapter: Symbol.for("AxiosAdapter"),
  // GATEWAY
  ProductGateway: Symbol.for("ProductGateway"),
  CartGateway: Symbol.for("CartGateway"),
  // USECASE
  ListProductsUseCase: Symbol.for("ListProductsUseCase"),
  GetProductUseCase: Symbol.for("GetProductUseCase"),

  GetCartUseCase: Symbol.for("GetCartUseCase"),
  ClearCartUseCase: Symbol.for("ClearCartUseCase"),
  RemoveProductFromCartUseCase: Symbol.for("RemoveProductFromCartUseCase"),
  AddProductInCartUseCase: Symbol.for("AddProductInCartUseCase"),
};

export const container = new Container();
// -> HTTP
container.bind(Registry.AxiosAdapter).toConstantValue(http);
// -> GATEWAY
// -> products
container.bind(Registry.ProductGateway).toDynamicValue((ctx) => {
  return new ProductHttpGateway(ctx.container.get(Registry.AxiosAdapter));
});
// -> cart
container.bind(Registry.CartGateway).toDynamicValue((ctx) => {
  return new CartGatewayLocalStorage();
});
// -> USECASE
// -> products
container.bind(Registry.ListProductsUseCase).toDynamicValue((ctx) => {
  return new ListProducts(ctx.container.get(Registry.ProductGateway));
});
container.bind(Registry.GetProductUseCase).toDynamicValue((ctx) => {
  return new GetProduct(ctx.container.get(Registry.ProductGateway));
});
// -> cart
container.bind(Registry.GetCartUseCase).toDynamicValue((ctx) => {
  return new GetCart(ctx.container.get(Registry.CartGateway));
});
container.bind(Registry.ClearCartUseCase).toDynamicValue((ctx) => {
  return new ClearCart(ctx.container.get(Registry.CartGateway));
});
container.bind(Registry.RemoveProductFromCartUseCase).toDynamicValue((ctx) => {
  return new RemoveProductFromCart(ctx.container.get(Registry.CartGateway));
});
container.bind(Registry.AddProductInCartUseCase).toDynamicValue((ctx) => {
  return new AddProductInCart(ctx.container.get(Registry.CartGateway));
});
