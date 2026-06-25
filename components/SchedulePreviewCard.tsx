import Link from "next/link";
import type { ShipSchedulePort } from "@/data/types";
import { getShipCallCountForPortYear } from "@/data/schedules";
import { getScheduleCoverageStatus } from "@/data/schedule-coverage";
import { NavCardCta } from "@/components/NavCardCta";

export function SchedulePreviewCard({
  port,
  status,
}: {
  port: ShipSchedulePort;
  status?: "live" | "coming-soon";
}) {
  const coverage = status ?? getScheduleCoverageStatus(port.slug);
  const count2026 = getShipCallCountForPortYear(port.slug, 2026);
  const count2027 = getShipCallCountForPortYear(port.slug, 2027);
  const totalCalls = count2026 + count2027;
  const href = `/ship-schedules/${port.slug}`;
  const isLive = coverage === "live";

  return (
    <Link
      href={href}
      className={`card group flex h-full flex-col ${
        isLive ? "hover:border-caribbean-200" : "border-dashed border-gray-200 bg-gray-50/50 hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3
            className={`font-display text-lg font-bold transition-colors ${
              isLive ? "text-gray-900 group-hover:text-caribbean-700" : "text-gray-800"
            }`}
          >
            {port.name}
          </h3>
          <p className="text-sm text-gray-500">{port.country}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            isLive ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"
          }`}
        >
          {isLive ? "Live data" : "Coming soon"}
        </span>
      </div>
      <p className="mt-3 text-sm text-gray-600 line-clamp-2">{port.description}</p>
      <p className="mt-3 text-xs text-gray-500">
        {isLive
          ? `${totalCalls.toLocaleString()} verified ship call${totalCalls !== 1 ? "s" : ""} imported for 2026 & 2027`
          : "Schedule hub ready — verified imports not published yet"}
      </p>
      <NavCardCta className="pt-4">
        {isLive ? `View ${port.name} schedule` : `${port.name} hub (import pending)`}
      </NavCardCta>
    </Link>
  );
}
