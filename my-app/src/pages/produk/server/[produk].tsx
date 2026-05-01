import DetailProduk from "../../views/DetailProduct";
import { ProductType } from "../../types/Product.type";
import { retrieveDataByID } from "../../utils/db/servicefirebase";

const HalamanProdukServer = ({ product }: { product: ProductType }) => {
  return (
    <div>
      <DetailProduk products={product} />
    </div>
  );
};

export default HalamanProdukServer;

export async function getServerSideProps({ params }: { params: { produk: string } }) {
  const product = await retrieveDataByID("products", params.produk);

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
}