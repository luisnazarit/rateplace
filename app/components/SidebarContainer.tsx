"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import SidebarMenu from "./SidebarMenu";

export default function SidebarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-850 border-r border-gray-800 w-64`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
          <Link href="/company" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-12" />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-800 lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <SidebarMenu />
        {children}
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
