import { useContext } from "react";
import { CartContext } from "../context/cart.provider";

type MyCartProps = {};

const MyCart = (props: MyCartProps) => {
  const cartContext = useContext(CartContext);

  return (
    <nav>
      Cart - Total {cartContext.cart.total} | Items{" "}
      {cartContext.cart.products.length}
    </nav>
  );
};

export default MyCart;
