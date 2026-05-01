import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../navbar";
import { Roboto } from "next/font/google";

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

type AppShellProps = {
  children: React.ReactNode;
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400","500","700"]
});

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const { pathname, push } = useRouter();
  const { status } = useSession();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const protectedRoutes = ["/produk", "/about", "/profile"];
    const isProtectedRoute = protectedRoutes.includes(pathname);

    setIsReady(false);

    if (!isProtectedRoute) {
      setIsReady(true);
      return;
    }

    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
      push("/");
      return;
    }

    setIsReady(true);
  }, [pathname, push, status]);

  if (!isReady) {
    return null;
  }

  return (
    <main className={roboto.className}>
      {!disableNavbar.includes(pathname) && <Navbar />}
      {children}
    </main>
  );
};

export default AppShell;