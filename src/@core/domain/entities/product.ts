type ProductType = {
  price: number;
  name: string;
  description: string;
  image: string;
  id: string;
  category: string;
};

export class Product {
  constructor(public product: ProductType) {}

  get price(): number {
    return this.product.price;
  }
  get name(): string {
    return this.product.name;
  }
  get description(): string {
    return this.product.description;
  }
  get image(): string {
    return this.product.image;
  }
  get id(): string {
    return this.product.id;
  }
  get category(): string {
    return this.product.category;
  }
}
