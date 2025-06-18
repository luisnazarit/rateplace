import { Package, DollarSign, Users } from 'lucide-react';

interface ActivityItem {
  icon: React.ReactNode;
  title: string;
  time: string;
  value: string;
  iconBgColor: string;
  iconColor: string;
}

const activities: ActivityItem[] = [
  {
    icon: <Package className="w-5 h-5" />,
    title: 'Nuevo producto agregado',
    time: 'Hace 2 horas',
    value: 'Producto #1234',
    iconBgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: 'Nueva venta realizada',
    time: 'Hace 3 horas',
    value: '$45,000',
    iconBgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Nuevo cliente registrado',
    time: 'Hace 5 horas',
    value: 'Cliente #5678',
    iconBgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Actividad Reciente
      </h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`flex items-center justify-between py-3 ${
              index !== activities.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 ${activity.iconBgColor} rounded-lg`}>
                <div className={activity.iconColor}>{activity.icon}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
            <span className="text-sm text-gray-600">{activity.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 