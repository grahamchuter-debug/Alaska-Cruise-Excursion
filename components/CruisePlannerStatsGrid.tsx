import Link from "next/link";
import { getPlannerStatCards } from "@/data/content-inventory";

export function CruisePlannerStatsGrid() {
  const stats = getPlannerStatCards();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Link
          key={stat.label}
          href={stat.href}
          className="card text-center hover:border-caribbean-200"
        >
          <div className="text-3xl font-bold text-caribbean-700">{stat.count}</div>
          <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
        </Link>
      ))}
    </div>
  );
}
