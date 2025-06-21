import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

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

    // La verificación de acceso a la cuenta de negocio se hará en los componentes de página
    // donde Prisma puede ejecutarse correctamente
    return NextResponse.next();
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
