import { Product } from "./product";

export type CartProps = {
  products: Product[];
};

export class Cart {
  constructor(public props: CartProps) {}

  addProduct(product: Product) {
    this.props.products.push(product);
  }

  removeProduct(id: string) {
    this.props.products = this.props.products.filter(
      (element) => element.id !== id
    );
  }

  clear() {
    this.props.products = [];
  }

  get total() {
    return this.props.products.reduce(
      (total, element) => total + element.price,
      0
    );
  }

  get products() {
    return this.props.products;
  }
}
