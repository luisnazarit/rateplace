interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

export function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-500">{icon}</div>
        <span className="text-sm font-medium text-green-600">{change}</span>
      </div>
      <div className="mt-4">
        <h6 className=" text-gray-500">{title}</h6>
        <p className="mt-1 text-2xl font-semibold text-gray-300">{value}</p>
      </div>
    </div>
  );
}
