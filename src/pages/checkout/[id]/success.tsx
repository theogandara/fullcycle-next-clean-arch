import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { http } from "../../../utils/http";
import { Order } from "../../../utils/model";

type CheckoutSuccessPageProps = {
  order: Order;
};

const CheckoutSuccessPage: NextPage<CheckoutSuccessPageProps> = ({ order }) => {
  return (
    <div>
      <h3>Parabéns</h3>

      <ul>
        {order.products.map((prd) => {
          return (
            <li key={prd.id}>
              <div>
                Produto {prd.name}-{prd.price}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CheckoutSuccessPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params || {};

  const { data: order } = await http.get(`/orders/${id}`);

  return {
    props: {
      order,
    },
  };
};
