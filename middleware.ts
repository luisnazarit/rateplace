import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Rutas que requieren autenticación de business account
  const protectedBusinessRoutes = [
    "/company",
    "/company/products",
    "/company/orders",
    "/company/settings",
  ];

  // Verificar si la ruta actual requiere autenticación de business account
  const isBusinessRoute = protectedBusinessRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isBusinessRoute) {
    // Si no hay sesión o no hay usuario, redirigir al login
    if (!session?.user) {
      const url = new URL("/api/auth/signin", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    // Obtener el subdominio del host
    const hostname = request.headers.get("host") || "";
    const subdomain = hostname.split(".")[0];

    // Verificar si el usuario tiene acceso a la cuenta de negocio
    const accountRole = await prisma.accountRole.findFirst({
      where: {
        userId: session.user.id,
        account: {
          slug: subdomain,
        },
      },
      include: {
        account: true,
        role: true,
      },
    });

    // Si el usuario no tiene acceso a la cuenta, redirigir al dashboard principal
    if (!accountRole) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Agregar información de la cuenta y el rol a los headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-business-account", accountRole.account.id);
    requestHeaders.set("x-user-role", accountRole.role.name);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

// Configurar las rutas que deben ser protegidas por el middleware
export const config = {
  matcher: [
    "/company/:path*",
    "/company/products/:path*",
    "/company/orders/:path*",
    "/company/settings/:path*",
  ],
};
