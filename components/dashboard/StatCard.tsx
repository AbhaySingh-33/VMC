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
    emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400",
    blue: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400",
    orange: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400",
    red: "from-red-500/20 to-red-600/10 border-red-500/30 text-red-400",
    purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400",
    indigo: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400",
  };

  return (
    <div className={`bg-linear-to-br ${colorClasses[color]} backdrop-blur-sm border rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-300">{title}</h3>
        {icon && <div className="opacity-60">{icon}</div>}
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      {trend && (
        <p className={`text-xs ${trend.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}
        </p>
      )}
    </div>
  );
}
