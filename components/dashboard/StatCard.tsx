interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: "emerald" | "blue" | "orange" | "red" | "purple" | "indigo";
}

export default function StatCard({ title, value, icon, trend, color = "blue" }: StatCardProps) {
  const colorClasses = {
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-600",
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    orange: "bg-orange-50 border-orange-200 text-orange-600",
    red: "bg-red-50 border-red-200 text-red-600",
    purple: "bg-purple-50 border-purple-200 text-purple-600",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-600",
  };

  return (
    <div className={`${colorClasses[color]} border-2 rounded-xl p-6 shadow-sm hover:shadow-md transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <div className="opacity-70">{icon}</div>}
      </div>
      <p className="text-3xl font-bold text-gray-800 mb-2">{value}</p>
      {trend && (
        <p className={`text-sm font-medium ${
          trend.isPositive ? 'text-emerald-600' : 'text-red-600'
        }`}>
          {trend.isPositive ? '↗' : '↘'} {trend.value}
        </p>
      )}
    </div>
  );
}
