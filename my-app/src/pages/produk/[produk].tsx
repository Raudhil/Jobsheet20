import type { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { ProductType } from "@/types/Product.type";

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

export const getServerSideProps: GetServerSideProps<
  { product: ProductType },
  { produk: string }
> = async ({ params }) => {
  if (!params?.produk) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/produk/${params.produk}`
  );

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const response: { data: ProductType | null } = await res.json();

  if (!response.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: response.data,
    },
  };
};
