import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Cart } from "../@core/domain/entities/cart";
import { container, Registry } from "../@core/infra/container-registry";
import { AddProductInCart } from "../@core/application/cart/add-product-in-cart.use-case";
import { Product } from "../@core/domain/entities/product";
import { RemoveProductFromCart } from "../@core/application/cart/remove-product-from-cart.use-case";
import { ClearCart } from "../@core/application/cart/clear-cart.use-case";
import { GetCart } from "../@core/application/cart/get-cart.use-case";

export type CartContextType = {
  cart: Cart;
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  reload: () => void;
  clear: () => void;
};

const defaultContext: CartContextType = {
  cart: new Cart({ products: [] }),
  addProduct: (product: Product) => {},
  removeProduct: (id: string) => {},
  reload: () => {},
  clear: () => {},
};

export const CartContext = createContext(defaultContext);

const addProductUseCase = container.get<AddProductInCart>(
  Registry.AddProductInCartUseCase
);

const removeProductFromCartUseCase = container.get<RemoveProductFromCart>(
  Registry.RemoveProductFromCartUseCase
);

const ClearCartUseCase = container.get<ClearCart>(Registry.ClearCartUseCase);
const GetCartUseCase = container.get<GetCart>(Registry.GetCartUseCase);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<Cart>(defaultContext.cart);

  const addProduct = (newProduct: Product) => {
    const newCart = addProductUseCase.execute(newProduct);
    setCart(newCart);
  };

  const removeProduct = (productId: string) => {
    const newCart = removeProductFromCartUseCase.execute(productId);
    setCart(newCart);
  };

  const clear = () => {
    const newCart = ClearCartUseCase.execute();
    setCart(newCart);
  };

  const reload = async () => {
    const newCart = await GetCartUseCase.execute();
    setCart(newCart);
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        reload,
        addProduct,
        removeProduct,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
