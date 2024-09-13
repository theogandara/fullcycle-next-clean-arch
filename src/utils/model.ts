export type Product = {
  id: number;
  description: string;
  price: number;
  name: string;
};

export type Order = {
  id: number;
  products: Product[];
  credit_card_number: string;
};
