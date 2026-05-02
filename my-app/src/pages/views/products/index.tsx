import styles from "../../produk/product.module.scss";
import Link from "next/link";
import { ProductType } from "@/types/Product.type";
import Image from "next/image";

type TampilanProdukProps = {
  products: ProductType[];
  isLoading?: boolean;
  error?: unknown;
};

const TampilanProduk = ({
  products,
  isLoading = false,
  error,
}: TampilanProdukProps) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles.produk_title}>Daftar Produk</h1>

      <div className={styles.produk_content}>
        {isLoading ? (
          <div className={styles.produk_content_skeleton}>
            <div className={styles.produk_content_skeleton_image}></div>
            <div className={styles.produk_content_skeleton_name}></div>
            <div className={styles.produk_content_skeleton_category}></div>
            <div className={styles.produk_content_skeleton_price}></div>
          </div>
        ) : error ? (
          <p>Gagal memuat data produk</p>
        ) : products.length > 0 ? (
          <>
            {products.map((product: ProductType) => (
              <Link 
                href={`/produk/${product.id}`} 
                key={product.id} 
                className={styles.produk_content_item}
              >
                <div className={styles.produk_content_item_image}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    unoptimized={true}
                  />
                </div>

                <h4 className={styles.produk_content_item_name}>
                  {product.name}
                </h4>

                <p className={styles.produk_content_item_category}>
                  {product.category}
                </p>

                <p className={styles.produk_content_item_price}>
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </p>
              </Link>
            ))}
          </>
        ) : (
          <div className={styles.produk_content_skeleton}>
            <div className={styles.produk_content_skeleton_image}></div>
            <div className={styles.produk_content_skeleton_name}></div>
            <div className={styles.produk_content_skeleton_category}></div>
            <div className={styles.produk_content_skeleton_price}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;
