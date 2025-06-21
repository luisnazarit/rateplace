import { auth } from "@/auth";
import MeNavigation from "./components/MeNavigation";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

async function getSubdomainFromHeaders() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  return host.split(".")[0];
}

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const slug = await getSubdomainFromHeaders();

  const user = await prisma?.user.findUnique({
    where: {
      email: session?.user?.email,
    },
    include: {
      accountRoles: {
        where: {
          account: {
            slug
          }
        },
        include: {
          role: true,
          account: true
        }
      }
    }
  });

  const userIdAdmin = user?.accountRoles?.find(
    (accountRole) => accountRole.role.name === "ADMIN"
  )?.userId;

  const isAdmin = !!userIdAdmin;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mi Cuenta</h1>
          <p className="text-gray-600">
            Gestiona tus compras, favoritos y datos personales
          </p>
        </div>

        {/* Navigation Menu */}
        <MeNavigation isAdmin={isAdmin} />

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
