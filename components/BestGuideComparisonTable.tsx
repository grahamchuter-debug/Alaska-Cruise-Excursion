import Link from "next/link";
import type { BestGuideTableRow } from "@/data/types";

export function BestGuideComparisonTable({ rows }: { rows: BestGuideTableRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-caribbean-700 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Port</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Best For</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Top Excursion</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Transfer</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Rating</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {rows.map((row) => (
            <tr key={row.portSlug} className="hover:bg-caribbean-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                <Link href={`/ports/${row.portSlug}`} className="text-caribbean-700 hover:underline">
                  {row.portName}
                </Link>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.bestFor}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.bestExcursion}</td>
              <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{row.transferTime}</td>
              <td className="px-4 py-3 text-sm text-tropical-mango font-semibold">★ {row.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
