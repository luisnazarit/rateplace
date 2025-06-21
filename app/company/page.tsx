import { StatsGrid } from "../components/StatsGrid";
import { RecentActivity } from "../components/RecentActivity";
import { getCurrentAccount } from "@/lib/getTenant";
import { redirect } from "next/navigation";

export default async function CompanyDashboard() {
  const account = await getCurrentAccount();

  if (!account) {
    redirect('/');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1>
          Dashboard {account.name}
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
