'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Package,
  FileText,
  Newspaper,
  BarChart3,
  Settings,
  Users,
  Menu,
  X,
  Home,
} from 'lucide-react';
import { BusinessAccount } from '@prisma/client';

const menuItems = [
  {
    title: 'Inicio',
    path: '/company',
    icon: <Home className="w-6 h-6" />,
  },
  {
    title: 'Productos',
    path: '/company/products',
    icon: <Package className="w-6 h-6" />,
  },
  {
    title: 'Posts',
    path: '/company/posts',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: 'Noticias',
    path: '/company/news',
    icon: <Newspaper className="w-6 h-6" />,
  },
  {
    title: 'Estadísticas',
    path: '/company/stats',
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    title: 'Configuración',
    path: '/company/settings',
    icon: <Settings className="w-6 h-6" />,
  },
  {
    title: 'Usuarios',
    path: '/company/users',
    icon: <Users className="w-6 h-6" />,
  },
];

export default function Sidebar({
  account
}: {
  account: BusinessAccount}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-gray-850 border-r border-gray-800 w-64`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
          <Link href="/company" className="flex items-center space-x-2">
            <img src={account.logo || 'logo.png'} alt="Logo" className="w-8 h-8" />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-800 lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg hover:bg-gray-100 lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
} 