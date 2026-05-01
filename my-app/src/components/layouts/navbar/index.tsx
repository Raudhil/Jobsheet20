import Image from "next/image";
import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import Script from "next/dist/client/script";

const Navbar = () => {
  const { data }: any = useSession();
  const [imageError, setImageError] = useState(false);
  const userImage = useMemo(() => {
    if (typeof data?.user?.image !== "string") return "";
    return data.user.image.trim();
  }, [data?.user?.image]);

  const userInitial = useMemo(() => {
    const source = data?.user?.fullname || data?.user?.email || "U";
    return source.charAt(0).toUpperCase();
  }, [data?.user?.fullname, data?.user?.email]);

  //const { data: session } = useSession()
  // console.log("session", session)
  return (
    <div className={styles.navbar}>
      {/* <div className={styles.navbar__brand}>MyApp</div> */}
      <div className={styles.navbar__brand} id="title"></div>
      <Script id="title-script" strategy="lazyOnload">
        {`document.getElementById('title').innerHTML = 'MyApp';`}
      </Script>
      <div className={styles.navbar__right}>
        {data ? (
          <>
            <div className={styles.navbar__user}>
              Welcome, {data.user?.fullname}
              {userImage && !imageError ? (
                <Image
                  src={userImage}
                  alt={data.user.fullname || "User avatar"}
                  width={50}
                  height={50}
                  className={styles.navbar__user__image}
                  onError={() => setImageError(true)}
                  unoptimized={true}
                  priority={false}
                />
              ) : (
                <div className={styles.navbar__user__fallback}>
                  {userInitial}
                </div>
              )}
            </div>
            <button
              className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
