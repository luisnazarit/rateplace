import { StatsGrid } from "../components/StatsGrid";
import { RecentActivity } from "../components/RecentActivity";
import { prisma } from "@/lib/prisma";
import { getCurrentTenant } from "@/lib/getTenant";
import { redirect } from "next/navigation";

export default async function CompanyDashboard() {

  const slug = await getCurrentTenant();

  if(!slug) {
    redirect('/')
  }

  const account = await prisma.businessAccount.findUnique({
    where: {
      slug
    },
  })

  if (!account) {
    redirect('/')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido a tu Panel de Control {account.name}
        </h1>
        <p className="mt-1 text-gray-600">
          Aquí puedes gestionar tu negocio y ver el rendimiento de tus ventas
        </p>
      </div>

      <StatsGrid />
      <RecentActivity />
    </div>
  );
}
