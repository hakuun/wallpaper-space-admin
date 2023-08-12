import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const adminMethod = ["POST", "PUT", "PATCH", "DELETE"];
const whiteList = ["/api/auth"];

const isWhiteList = (url: string) => {
  return whiteList.some((path) => url.includes(path));
};

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request) {
    const token = request.nextauth.token;
    const isAdminRequest = adminMethod.includes(request.method);
    const isAdmin = token && token?.role === "Admin";
    if (isWhiteList(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    if (isAdminRequest && !isAdmin) {
      return new NextResponse(
        JSON.stringify({
          message: "Unauthorized, Only admin users can do this",
        }),
        {
          status: 403,
        }
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
