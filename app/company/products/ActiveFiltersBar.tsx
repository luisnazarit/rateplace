import Link from "next/link";
import React from "react";

interface ActiveFiltersBarProps {
  filters: Record<string, string | undefined>;
  basePath?: string;
}

function removeParamFromQuery(query: Record<string, string | undefined>, param: string) {
  const newQuery = { ...query };
  delete newQuery[param];
  return newQuery;
}

function buildQueryString(query: Record<string, string | undefined>) {
  const params = Object.entries(query)
    .filter(([_, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v ?? "")}`)
    .join("&");
  return params ? `?${params}` : "";
}

const FILTER_LABELS: Record<string, string> = {
  search: "Búsqueda",
  category: "Categoría",
  limit: "Límite",
};

const ActiveFiltersBar: React.FC<ActiveFiltersBarProps> = ({ filters, basePath = "" }) => {
  const activeFilters = Object.entries(filters).filter(
    ([key, value]) => ["search", "category", "limit"].includes(key) && value && value !== ""
  );

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {activeFilters.map(([key, value]) => {
        const newQuery = removeParamFromQuery(filters, key);
        const href = `${basePath}${buildQueryString(newQuery)}`;
        return (
          <span
            key={key}
            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
          >
            {FILTER_LABELS[key] || key}: {value}
            <Link
              href={href}
              className="ml-2 text-blue-500 hover:text-blue-700 cursor-pointer"
              aria-label={`Eliminar filtro ${key}`}
              scroll={false}
            >
              ×
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default ActiveFiltersBar; 