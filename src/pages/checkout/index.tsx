import type { NextPage } from "next";
import { FormEvent, useContext } from "react";
import { CartContext } from "../../context/cart.provider";
import { http } from "../../@core/infra/http";
import { useRouter } from "next/router";

type CheckoutPageProps = {};

const CheckoutPage: NextPage<CheckoutPageProps> = () => {
  const router = useRouter();
  const cartContext = useContext(CartContext);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const credit_card_number = event.currentTarget.credit_card_number.value;
    const { data: order } = await http.post("/orders", {
      products: cartContext.cart.products.map((element) => element.props),
      credit_card_number,
    });
    router.push(`/checkout/${order.id}/success`);
  }

  return (
    <div>
      <h3>Meu carrinho</h3>

      <ul>
        {cartContext.cart.products.map((product) => {
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
