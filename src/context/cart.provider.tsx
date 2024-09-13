import { createContext, PropsWithChildren, useState } from "react";
import { Product } from "../utils/model";

export type CartContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clear: () => void;
  total: number;
};

const defaultContext: CartContextType = {
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  clear: () => {},
  total: 0,
};

export const CartContext = createContext(defaultContext);
export const CartProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const addProduct = (newProduct: Product) => {
    if (products === null) return setProducts([newProduct]);
    setProducts((prevState) => [...prevState!, newProduct]);
  };

  const removeProduct = (productToBeDeleted: Product) => {
    if (products === null) return;

    setProducts((prevState) =>
      prevState!.filter((prd) => prd.id !== productToBeDeleted.id)
    );
  };
  const clear = () => {
    setProducts([]);
  };

  const total = products!?.reduce((acc, product) => acc + product.price, 0);

  return (
    <CartContext.Provider
      value={{
        products: products || [],
        total,
        addProduct,
        removeProduct,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
