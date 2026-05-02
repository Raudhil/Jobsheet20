import DetailProduk from "../../views/DetailProduct";
import { ProductType } from "@/types/Product.type";

const HalamanProdukServer = ({ product }: { product: ProductType }) => {
  return (
    <div>
      <DetailProduk products={product} />
    </div>
  );
};

export default HalamanProdukServer;

export async function getServerSideProps({ params }: { params: { produk: string } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/produk/${params?.produk}`
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
}
