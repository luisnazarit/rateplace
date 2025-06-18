import { BarChart3, Package, Users, DollarSign } from "lucide-react";
import { StatCard } from "./StatCard";

const stats = [
  {
    title: "Ventas Totales",
    value: "$1,234,567",
    change: "+12.5%",
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    title: "Productos",
    value: "156",
    change: "+8.2%",
    icon: <Package className="w-6 h-6" />,
  },
  {
    title: "Clientes",
    value: "2,345",
    change: "+15.3%",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Crecimiento",
    value: "23.8%",
    change: "+4.1%",
    icon: <BarChart3 className="w-6 h-6" />,
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
