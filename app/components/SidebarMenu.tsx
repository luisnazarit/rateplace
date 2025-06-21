"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  FileText,
  Newspaper,
  BarChart3,
  Settings,
  Users,
  Home,
} from "lucide-react";

const menuItems = [
  {
    title: "Inicio",
    path: "/company",
    icon: <Home className="w-6 h-6" />,
  },
  {
    title: "Productos",
    path: "/company/products",
    icon: <Package className="w-6 h-6" />,
  },
  {
    title: "Posts",
    path: "/company/posts",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Noticias",
    path: "/company/news",
    icon: <Newspaper className="w-6 h-6" />,
  },
  {
    title: "Estadísticas",
    path: "/company/stats",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    title: "Configuración",
    path: "/company/settings",
    icon: <Settings className="w-6 h-6" />,
  },
  {
    title: "Usuarios",
    path: "/company/users",
    icon: <Users className="w-6 h-6" />,
  },
];

export default function SidebarMenu() {
  const pathname = usePathname();

  return (
    <nav className="p-4 space-y-2">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            pathname === item.path
              ? "bg-blue-50 text-blue-600"
              : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
} 