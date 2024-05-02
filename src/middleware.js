import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname === "/managers/general_manager" &&
      req.nextauth.token.userData.designation === "Admin"
    ) {
      const id = new URL(req.url).searchParams.get("department");
      const res = NextResponse.next();

      res.cookies.set("department_id", id);

      return res;
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/customer/profile", "/managers/general_manager"],
};
