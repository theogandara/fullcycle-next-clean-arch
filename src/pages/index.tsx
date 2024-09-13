import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { ListProducts } from "../@core/application/product/list-products.use-case";
import { container, Registry } from "../@core/infra/container-registry";
import { Product } from "../@core/domain/entities/product";

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
  const listProductsUseCase = container.get<ListProducts>(
    Registry.ListProductsUseCase
  );
  const products = await listProductsUseCase.execute();
  return {
    props: {
      products: products.map((element) => element.toJSON()),
    },
  };
};
