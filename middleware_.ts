import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const { auth, signIn, signOut } = NextAuth(authConfig);

export default auth((req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const requestHeaders = new Headers(req.headers);
  
  // Only set the header if pathname is defined
  if (pathname) {
    requestHeaders.set("x-pathname", pathname);
  }

  const hostname = req.headers.get('host') || '';
  const subdomain = hostname.split('.')[0]; // tienda1.localhost → tienda1

  const url = req.nextUrl.clone();

  // Adjuntamos el subdominio como parámetro de búsqueda
  url.searchParams.set('account', subdomain);

  return NextResponse.rewrite(url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
