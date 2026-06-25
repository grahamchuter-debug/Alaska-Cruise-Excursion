import Link from "next/link";
import type { PortExcursionMatrixRow, PortExcursionScoreTier } from "@/data/types";

const COLUMNS: { key: keyof PortExcursionMatrixRow["scores"]; label: string }[] = [
  { key: "whaleWatching", label: "Whale watching" },
  { key: "bearViewing", label: "Bear viewing" },
  { key: "glaciers", label: "Glaciers" },
  { key: "railways", label: "Railways" },
  { key: "walkability", label: "Walkability" },
  { key: "families", label: "Families" },
  { key: "adventure", label: "Adventure" },
  { key: "photography", label: "Photography" },
  { key: "value", label: "Value" },
  { key: "firstTime", label: "First-time" },
];

const tierClass: Record<PortExcursionScoreTier, string> = {
  Excellent: "bg-caribbean-100 text-caribbean-900 font-semibold",
  "Very Good": "bg-caribbean-50 text-caribbean-800",
  Good: "bg-white text-gray-800",
  Fair: "bg-gray-50 text-gray-600",
  Limited: "bg-gray-100 text-gray-500",
  "Land only": "bg-amber-50 text-amber-900 text-xs",
};

export function AlaskaPortExcursionMatrixTable({ rows }: { rows: PortExcursionMatrixRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-[56rem] w-full text-sm border-collapse">
        <thead>
          <tr className="bg-caribbean-700 text-white">
            <th className="sticky left-0 z-10 bg-caribbean-700 px-3 py-3 text-left font-semibold min-w-[8rem]">
              Port
            </th>
            {COLUMNS.map((col) => (
              <th key={col.key} className="px-2 py-3 text-center font-semibold whitespace-nowrap text-xs">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {rows.map((row) => (
            <tr key={row.portSlug} className="hover:bg-caribbean-50/40">
              <td className="sticky left-0 z-10 bg-white px-3 py-3 align-top border-r border-gray-100">
                <Link
                  href={`/ports/${row.portSlug}`}
                  className="font-medium text-caribbean-700 hover:underline"
                >
                  {row.portName}
                </Link>
                {row.portNote && (
                  <p className="mt-1 text-xs text-gray-500 leading-snug">{row.portNote}</p>
                )}
              </td>
              {COLUMNS.map((col) => {
                const tier = row.scores[col.key];
                return (
                  <td key={col.key} className="px-2 py-2 text-center align-middle">
                    <span
                      className={`inline-block rounded-md px-1.5 py-1 text-xs leading-tight ${tierClass[tier]}`}
                    >
                      {tier}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
