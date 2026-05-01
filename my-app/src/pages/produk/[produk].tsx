import type { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { ProductType } from "../types/Product.type";
import {
  retrieveDataByID,
  retrieveProducts,
} from "../utils/db/servicefirebase";

// Dynamic import dengan loading fallback
const DetailProduk = dynamic(() => import("../views/DetailProduct"), {
  loading: () => <p style={{ textAlign: "center", padding: "20px" }}>Memuat detail produk...</p>,
  ssr: true, // Server-side render untuk SEO
});

const HalamanProduk = ({ product }: { product: ProductType }) => {
  return (
    <div>
      <DetailProduk products={product} />
    </div>
  );
};

export default HalamanProduk;

export const getStaticPaths: GetStaticPaths = async () => {
  const products = (await retrieveProducts("products")) as ProductType[];

  const paths = products
    .filter((product) => typeof product.id === "string" && product.id.length > 0)
    .map((product) => ({
      params: { produk: product.id },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ product: ProductType }, { produk: string }> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const product = (await retrieveDataByID("products", params.produk)) as ProductType | null;

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};