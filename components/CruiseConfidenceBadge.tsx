import {
  formatConfidenceTitle,
  getCruiseConfidenceStyles,
  type CruiseConfidenceLevel,
  type ReturnConfidence,
} from "@/lib/cruise-confidence";

interface CruiseConfidenceBadgeProps {
  level: CruiseConfidenceLevel | ReturnConfidence;
  className?: string;
  showDot?: boolean;
}

export function CruiseConfidenceBadge({
  level,
  className = "",
  showDot = true,
}: CruiseConfidenceBadgeProps) {
  const styles = getCruiseConfidenceStyles(level);
  const title =
    level === "high" || level === "moderate" || level === "caution"
      ? formatConfidenceTitle(
          level === "high" ? "high" : level === "moderate" ? "medium" : "plan-carefully",
        )
      : formatConfidenceTitle(level);

  return (
    <span
      className={`inline-flex cursor-default items-center gap-2 rounded-md border px-3 py-1 text-xs font-medium uppercase tracking-wide ${styles.badge} ${className}`}
    >
      {showDot && <span className={`h-2 w-2 shrink-0 rounded-full ${styles.dot}`} aria-hidden />}
      {title}
    </span>
  );
}
