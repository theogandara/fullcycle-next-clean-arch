import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { CartContext } from "../../context/cart.provider";
import { useContext } from "react";
import { container, Registry } from "../../@core/infra/container-registry";
import { GetProduct } from "../../@core/application/product/get-product.use-case";
import { Product } from "../../@core/domain/entities/product";

type ProductDetailPageProps = {
  product: Product;
};

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  const cartContext = useContext(CartContext);
  return (
    <div>
      <h3>{product.name}</h3>
      <label>{product.price}</label>
      <button onClick={() => cartContext.addProduct(product)}>
        Adicionar ao carrinho
      </button>
    </div>
  );
};

export default ProductDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params || {};
  const getProductUseCase = container.get<GetProduct>(
    Registry.GetProductUseCase
  );
  const product = await getProductUseCase.execute(String(id));

  return { props: { product } };
};
