import Link from "next/link";
import Image from "next/image";
import { ProductType } from "../../types/Product.type";
import styles from "../DetailProduct/detailProduct.module.scss";

const DetailProduk = ({ products }: { products: ProductType }) => {
  return (
    <>
      <h1 className={styles.title}>Detail Produk</h1>

      <div className={styles.produkDetail}>
        <div className={styles.image}>
          <Image 
            src={products.image} 
            alt={products.name}
            width={400}
            height={400}
            unoptimized={true}
            priority={true}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>{products.name}</h1>
          <p className={styles.category}>{products.category}</p>
          <p className={styles.price}>
            Rp {Number(products.price).toLocaleString("id-ID")}
          </p>
          <Link href="/produk" className={styles.button}>
            Kembali ke daftar produk
          </Link>
        </div>
      </div>
    </>
  );
};

export default DetailProduk;