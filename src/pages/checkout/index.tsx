import type { NextPage } from "next";
import { FormEvent, useContext } from "react";
import { CartContext } from "../../context/cart.provider";

type CheckoutPageProps = {};

const CheckoutPage: NextPage<CheckoutPageProps> = () => {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const cartContext = useContext(CartContext);

  return (
    <div>
      <h3>Meu carrinho</h3>

      <ul>
        {cartContext.products.map((product) => {
          return (
            <li key={product.id}>
              Produto {product.name} - {product.price}
            </li>
          );
        })}
      </ul>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="credit_card_number">Cartão de crédito</label>
          <input
            id="credit_card_number"
            name="credit_card_number"
            type="text"
          />
        </div>

        <div>
          <button type="submit">Comprar</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
