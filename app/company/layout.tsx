import Sidebar from "../components/Sidebar";
import { getCurrentUserRole, getCurrentAccount } from "@/lib/getTenant";
import { redirect } from "next/navigation";

export default async function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verificar si el usuario tiene acceso a la cuenta de negocio
  const accountRole = await getCurrentUserRole();
  const account = await getCurrentAccount();

  // Si no hay sesión o no hay cuenta, redirigir
  if (!accountRole || !account) {
    redirect('/');
  }

  return (
    <div className="min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
