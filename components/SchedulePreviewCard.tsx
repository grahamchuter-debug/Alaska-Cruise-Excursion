import Link from "next/link";
import type { ShipSchedulePort } from "@/data/types";
import { getShipCallCountForPortYear } from "@/data/schedules";
import { NavCardCta } from "@/components/NavCardCta";
export function SchedulePreviewCard({ port }: { port: ShipSchedulePort }) {
  const count2026 = getShipCallCountForPortYear(port.slug, 2026);
  const count2027 = getShipCallCountForPortYear(port.slug, 2027);
  const href = `/ship-schedules/${port.slug}`;

  return (
    <Link href={href} className="card group flex h-full flex-col hover:border-caribbean-200">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-caribbean-700 transition-colors">
            {port.name}
          </h3>
          <p className="text-sm text-gray-500">{port.country}</p>
        </div>
        <span className="shrink-0 rounded-full bg-caribbean-50 px-2.5 py-0.5 text-xs font-medium text-caribbean-700">
          2026 &amp; 2027
        </span>
      </div>
      <p className="mt-3 text-sm text-gray-600 line-clamp-2">{port.description}</p>
      <p className="mt-3 text-xs text-gray-500">
        {count2026 + count2027 > 0
          ? `${count2026 + count2027} verified ship call${count2026 + count2027 !== 1 ? "s" : ""} listed`
          : "2026 and 2027 schedules, import in progress"}
      </p>
      <NavCardCta className="pt-4">View {port.name} schedule</NavCardCta>
    </Link>
  );
}
