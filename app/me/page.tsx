import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function MePage() {
  const session = await auth();

  const myProducts = await prisma?.order.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Mis Compras
        </h3>
        {myProducts?.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className="text-gray-500">No tienes compras registradas</p>
            <p className="text-sm text-gray-400 mt-2">
              Cuando realices una compra, aparecerá aquí
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
