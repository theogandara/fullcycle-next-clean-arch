import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { http } from "../../utils/http";
import { Product } from "../../utils/model";
import { CartContext } from "../../context/cart.provider";
import { useContext } from "react";

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
  const { data: product } = await http.get(`/products/${id}`);
  return { props: { product } };
};
