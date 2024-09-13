import type { GetServerSideProps, NextPage } from "next";
import { http } from "../utils/http";
import { Product } from "../utils/model";
import Link from "next/link";

type HomeProps = {
  products: Product[];
};

const Home: NextPage<HomeProps> = ({ products }) => {
  return (
    <div>
      <h1>Ecommerce Full Cycle</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <label>Nome:</label>
              {product.name}
              <Link href={`/products/${product.id}`}>Ver</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: products } = await http.get("/products");
  return { props: { products } };
};
