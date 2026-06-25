import Link from "next/link";
import type { PortExcursionAuthorityRow } from "@/data/types";
import { getPortBySlug } from "@/data/ports";
import { evaluateAuthorityRowConfidence } from "@/lib/cruise-confidence";
import {
  formatSpecialistDomain,
  getSpecialistHomeUrl,
  getSpecialistPartnerCta,
} from "@/lib/specialist-links";
import { CruiseConfidenceBadge } from "@/components/CruiseConfidenceBadge";

export function PortExcursionAuthorityTable({ rows }: { rows: PortExcursionAuthorityRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-caribbean-700 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Port</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Best Excursion</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Duration</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Best For</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Activity Level</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Cruise Confidence</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Why Recommended</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {rows.map((row) => {
            const port = getPortBySlug(row.portSlug);
            const confidence = evaluateAuthorityRowConfidence(row);
            return (
              <tr key={row.portSlug} className="hover:bg-caribbean-50 transition-colors align-top">
                <td className="px-4 py-4 text-sm">
                  <Link
                    href={`/ports/${row.portSlug}`}
                    className="font-semibold text-caribbean-700 hover:underline"
                  >
                    {row.portName}
                  </Link>
                  {port && (
                    <div className="mt-1">
                      <a
                        href={getSpecialistHomeUrl(row.portSlug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-caribbean-700 hover:underline"
                      >
                        {getSpecialistPartnerCta(row.portSlug)} →
                      </a>
                      <p className="text-[10px] text-gray-500">{formatSpecialistDomain(port.specialistUrl)}</p>
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{row.bestExcursion}</td>
                <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">{row.duration}</td>
                <td className="px-4 py-4 text-sm text-gray-700">{row.bestFor}</td>
                <td className="px-4 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      row.activityLevel === "Easy"
                        ? "bg-green-100 text-green-800"
                        : row.activityLevel === "Moderate"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {row.activityLevel}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm">
                  <CruiseConfidenceBadge level={confidence.level} />
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 leading-relaxed max-w-xs">
                  {row.whyRecommended}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
