'use client';

import { Bell } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64">
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-end h-16 px-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-6 h-6" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <img
                    src="/avatar.png"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">Mi Empresa</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
} 