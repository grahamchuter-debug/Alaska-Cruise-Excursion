import type { MatchTier } from "@/lib/excursion-finder-engine";

interface MatchReasonsPanelProps {
  matchLabel: MatchTier;
  reasons: string[];
  className?: string;
}

export function MatchReasonsPanel({ matchLabel, reasons, className = "" }: MatchReasonsPanelProps) {
  if (reasons.length === 0) return null;

  return (
    <div
      className={`rounded-xl border border-gray-100 bg-white/80 p-5 shadow-sm ${className}`}
    >
      <p className="text-xs font-medium text-gray-500">Why we recommend it</p>
      <p className="mt-1 text-sm font-medium text-gray-900">{matchLabel}</p>
      <ul className="mt-3 space-y-2.5">
        {reasons.map((reason) => (
          <li key={reason} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-700">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-caribbean-500" aria-hidden="true" />
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
