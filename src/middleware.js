import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {
  console.log("\n******Middleware = ", req.nextUrl.pathname);
  console.log(req.nextauth.token);
});

export const config = {
  matcher: ["/products","/profile"],
};
