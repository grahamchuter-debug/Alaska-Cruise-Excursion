import Link from "next/link";
import { MEETING_POINT_DISCLAIMER } from "@/data/types";
import {
  formatTaxiNeeded,
  formatWalkingRealistic,
  resolveExcursionLogistics,
} from "@/lib/excursion-logistics";

interface MeetingPointSnapshotProps {
  portSlug: string;
  excursionName: string;
  compact?: boolean;
  className?: string;
}

function SnapshotField({
  label,
  value,
  compact,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "min-w-0" : ""}>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-caribbean-700">{label}</dt>
      <dd className={`mt-1 font-medium text-gray-900 ${compact ? "text-xs leading-snug" : "text-sm leading-relaxed"}`}>
        {value}
      </dd>
    </div>
  );
}

function StatusBadge({
  label,
  tone,
}: {
  label: string;
  tone: "neutral" | "positive" | "caution";
}) {
  const tones = {
    neutral: "bg-gray-100 text-gray-800 border-gray-200",
    positive: "bg-emerald-50 text-emerald-800 border-emerald-200",
    caution: "bg-amber-50 text-amber-900 border-amber-200",
  };
  return (
    <span className={`inline-flex cursor-default rounded-md border px-2.5 py-0.5 text-xs font-normal ${tones[tone]}`}>
      {label}
    </span>
  );
}

function badgeToneForTaxi(value: "yes" | "no" | "optional"): "neutral" | "positive" | "caution" {
  if (value === "no") return "positive";
  if (value === "yes") return "caution";
  return "neutral";
}

function badgeToneForWalking(value: "yes" | "no" | "depends"): "neutral" | "positive" | "caution" {
  if (value === "yes") return "positive";
  if (value === "no") return "caution";
  return "neutral";
}

export function MeetingPointSnapshot({
  portSlug,
  excursionName,
  compact = false,
  className = "",
}: MeetingPointSnapshotProps) {
  const logistics = resolveExcursionLogistics(portSlug, excursionName);
  if (!logistics) return null;

  return (
    <aside
      className={`rounded-xl border-2 border-caribbean-100 bg-gradient-to-br from-white via-caribbean-50/30 to-white ${
        compact ? "p-4" : "p-5 sm:p-6"
      } ${className}`}
      aria-label={`Meeting point snapshot for ${logistics.excursionName}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-caribbean-700">
            Meeting point snapshot
          </p>
          <h4 className={`mt-1 font-display font-semibold text-gray-900 ${compact ? "text-sm" : "text-base"}`}>
            Getting to {logistics.excursionName}
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <StatusBadge
            label={`Taxi: ${formatTaxiNeeded(logistics.taxiNeeded)}`}
            tone={badgeToneForTaxi(logistics.taxiNeeded)}
          />
          <StatusBadge
            label={`Walk: ${formatWalkingRealistic(logistics.walkingRealistic)}`}
            tone={badgeToneForWalking(logistics.walkingRealistic)}
          />
        </div>
      </div>

      <dl
        className={`mt-4 grid gap-4 ${
          compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        <SnapshotField label="Where to meet" value={logistics.meetingPoint} compact={compact} />
        <SnapshotField label="Distance from cruise ship" value={logistics.distanceFromShip} compact={compact} />
        <SnapshotField label="Walking time" value={logistics.walkingTime} compact={compact} />
        <SnapshotField label="Taxi needed" value={formatTaxiNeeded(logistics.taxiNeeded)} compact={compact} />
        <SnapshotField
          label="Walking realistic"
          value={formatWalkingRealistic(logistics.walkingRealistic)}
          compact={compact}
        />
        <SnapshotField label="Likely pier / terminal" value={logistics.likelyPier} compact={compact} />
      </dl>

      <div className={`mt-4 rounded-lg border border-caribbean-100 bg-white/80 px-4 py-3 ${compact ? "text-xs" : "text-sm"}`}>
        <p className="font-semibold text-gray-900">Practical tip for cruise passengers</p>
        <p className="mt-1 leading-relaxed text-gray-700">{logistics.passengerNote}</p>
      </div>

      {logistics.googleMapsUrl && (
        <p className="mt-4">
          <Link
            href={logistics.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-semibold text-caribbean-800 hover:text-caribbean-900 hover:underline"
          >
            {logistics.googleMapsLabel ?? "Open destination on Google Maps"}
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </p>
      )}

      <p className={`mt-4 text-gray-500 ${compact ? "text-[11px]" : "text-xs"} leading-relaxed`}>
        {MEETING_POINT_DISCLAIMER}
      </p>
    </aside>
  );
}
