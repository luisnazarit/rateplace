"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

function NavItem({ href, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-slate-400  hover:bg-slate-700"
      }`}
    >
      {label}
    </Link>
  );
}

export default function MeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/me", label: "Mis Compras" },
    { href: "/me/favorites", label: "Favoritos" },
    { href: "/me/profile", label: "Mis Datos" },
  ];

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
        <div className="bg-slate-800 rounded-lg shadow mb-6">
          <div className="">
            <nav className="flex gap-2" aria-label="Tabs">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={pathname === item.href}
                />
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
