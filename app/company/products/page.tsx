import Link from "next/link";
import ProductsTable from "./ProductsTable";
import { prisma } from "@/lib/prisma";
import { getCurrentTenant } from "@/lib/getTenant";
import TextField from "@/components/commons/TextField";
import ActiveFiltersBar from "./ActiveFiltersBar";

type ProductsPageProps = {
  searchParams?: Promise<Record<string, string>>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const currentPage = (await searchParams)?.page || "1";
  const search = (await searchParams)?.search || "";
  const category = (await searchParams)?.category || "";
  const limit = (await searchParams)?.limit || "10";

  const products = await prisma.product.findMany({
    where: {
      ...(search && {
        name: {
          mode: "insensitive",
          contains: search,
        },
      }),
      account: {
        slug: await getCurrentTenant(),
      },
    },
    take: Number(limit),
    skip: (Number(currentPage) - 1) * Number(limit),
  });

  const meta = await prisma.product.count({
    where: {
      account: {
        slug: await getCurrentTenant(),
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>Productos</h1>
        <Link
          href="/company/products/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Nuevo Producto
        </Link>
      </div>

      <ActiveFiltersBar
        filters={{ search, category, limit }}
        basePath={"/company/products"}
      />

      <div className="bg-gray-800 p-4 rounded-lg">
        <form action="/company/products" method="get">
          <TextField
            name="search"
            defaultValue={search}
            label="Buscar"
            type="search"
            placeholder="Buscar productos"
          />
        </form>
      </div>

      <ProductsTable products={products} />

      <nav className="bg-gray-800 p-4 rounded-lg flex gap-2" aria-label="Pagination">
        {currentPage !== "1" && (
          <Link
            href={`?page=${
              Number(currentPage) - 1
            }&search=${search}&limit=${limit}`}
            className="relative items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Anterior
          </Link>
        )}

        {Array.from({ length: Math.ceil(meta / Number(limit)) }).map((_, i) => (
          <Link
            key={i}
            href={`?page=${i + 1}&search=${search}&limit=${limit}`}
            className={`relative items-center px-4 py-2  text-sm font-medium rounded-md   hover:bg-gray-50 ${
              Number(currentPage) === i + 1 ? "bg-blue-600 text-white" : "text-gray-700 bg-white"
            }`}
          >
            {i + 1}
          </Link>
        ))}

        {Number(currentPage) * Number(limit) < meta && (
          <Link
            href={`?page=${
              Number(currentPage) + 1
            }&search=${search}&limit=${limit}`}
            className="relative items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Siguiente
          </Link>
        )}
      </nav>
    </div>
  );
}
