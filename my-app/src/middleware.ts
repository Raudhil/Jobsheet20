import { NextResponse } from "next/server";
import withAuth from "./Middleware/withAuth";

function onlyAdmin() {
  return NextResponse.next();
}

export default withAuth(onlyAdmin, ["/produk", "/about", "/profile", "/admin", "/editor"]);

export const config = {
  matcher: ["/produk", "/about", "/profile", "/admin", "/editor"],
};