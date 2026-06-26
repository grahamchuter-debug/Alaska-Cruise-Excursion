import Link from "next/link";
import {
  getScheduleCoverageStatus,
  getLiveImportedSchedulePorts,
  getScheduleCoverageSummary,
  SCHEDULE_IMPORT_QUEUE,
} from "@/data/schedule-coverage";
import { getShipCallCountForPortYear } from "@/data/schedules";

export function ScheduleCoverageBanner({
  portSlug,
  portName,
  variant = "default",
}: {
  portSlug: string;
  portName: string;
  variant?: "default" | "compact" | "homepage";
}) {
  const status = getScheduleCoverageStatus(portSlug);

  if (status === "live") {
    const calls2026 = getShipCallCountForPortYear(portSlug, 2026);
    const calls2027 = getShipCallCountForPortYear(portSlug, 2027);
    const total = calls2026 + calls2027;
    const livePorts = getLiveImportedSchedulePorts();
    const liveNote =
      livePorts.length === 1
        ? `${portName} has verified imported ship calls on this site`
        : `${portName} has verified imported ship calls (${livePorts.length} Alaska ports live)`;

    return (
      <div
        className={`rounded-xl border border-emerald-200 bg-emerald-50/80 ${
          variant === "compact" ? "px-4 py-3" : "p-5 sm:p-6"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">Live imported schedule</p>
        <p className={`mt-1 text-emerald-950 ${variant === "compact" ? "text-sm" : "text-sm sm:text-base"}`}>
          {liveNote}
          {total > 0 ? ` — ${total.toLocaleString()} calls listed across 2026 and 2027` : ""}. Monthly tables
          show real arrival and departure times.
        </p>
      </div>
    );
  }

  if (status === "coming-soon") {
    return (
      <div
        className={`rounded-xl border border-amber-200 bg-amber-50/80 ${
          variant === "compact" ? "px-4 py-3" : "p-5 sm:p-6"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-900">Coming soon</p>
        <p className={`mt-1 text-amber-950 ${variant === "compact" ? "text-sm" : "text-sm sm:text-base"}`}>
          {portName} schedule hub pages are live, but verified ship-call imports are not published yet. We do not
          show placeholder sailings — monthly tables will appear as data is imported and checked.
        </p>
        {variant === "homepage" && (
          <p className="mt-2 text-sm text-amber-900/90">
            Next in import queue: {SCHEDULE_IMPORT_QUEUE.slice(0, 4).join(", ").replace(/-/g, " ")}.
          </p>
        )}
        {variant !== "compact" && (
          <p className="mt-3 text-sm text-amber-900/90">
            Plan excursions with the{" "}
            <Link href={`/ports/${portSlug}`} className="font-medium underline hover:text-amber-950">
              {portName} port guide
            </Link>{" "}
            and{" "}
            <Link href="/ship-schedules/juneau" className="font-medium underline hover:text-amber-950">
              live Juneau and Skagway schedules
            </Link>{" "}
            while {portName} imports complete.
          </p>
        )}
      </div>
    );
  }

  return null;
}

export function HomepageScheduleCoverageNote() {
  return (
    <div className="mb-6 rounded-xl border border-caribbean-200 bg-caribbean-50/60 p-5 sm:p-6">
      <p className="text-sm font-semibold text-caribbean-900">Schedule import status</p>
      <p className="mt-2 text-sm text-gray-700 leading-relaxed">{getScheduleCoverageSummary()}</p>
      <p className="mt-3 text-sm text-gray-600">
        Additional Inside Passage and Gulf ports — including{" "}
        {SCHEDULE_IMPORT_QUEUE.slice(0, 5).join(", ").replace(/-/g, " ")} — are being imported and verified.
      </p>
    </div>
  );
}
