"use client";

import { ShieldCheck } from "lucide-react";
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

export default function MeNavigation({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/me", label: "Mis Compras" },
    { href: "/me/favorites", label: "Favoritos" },
    { href: "/me/profile", label: "Mis Datos" },
  ];

  return (
    <div className="bg-slate-800 rounded-lg shadow mb-6">
      <div className="">
        <nav className="flex gap-2 w-full" aria-label="Tabs">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={pathname === item.href}
            />
          ))}
          {isAdmin && (
            <Link
              className="ml-auto px-6 py-3 text-sm flex gap-2 items-center font-medium rounded-lg transition-colors text-primary-500 hover:bg-slate-700"
              href="/company"
            >
              <ShieldCheck className="w-4 h-4" />
              Administrar tienda
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
