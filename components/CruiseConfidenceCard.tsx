import {
  CRUISE_CONFIDENCE_DISCLAIMER,
  getCruiseConfidenceStyles,
  type CruiseConfidenceAssessment,
} from "@/lib/cruise-confidence";
import { CruiseConfidenceBadge } from "@/components/CruiseConfidenceBadge";
import { CruiseConfidenceLabels } from "@/components/CruiseConfidenceLabels";

interface CruiseConfidenceCardProps {
  assessment: CruiseConfidenceAssessment;
  className?: string;
  showDisclaimer?: boolean;
  title?: string;
}

export function CruiseConfidenceCard({
  assessment,
  className = "",
  showDisclaimer = true,
  title = "Cruise Confidence",
}: CruiseConfidenceCardProps) {
  const styles = getCruiseConfidenceStyles(assessment.level);

  return (
    <div className={`rounded-2xl border p-5 shadow-editorial sm:p-6 ${styles.card} ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-gray-500">{title}</p>
          <p className={`mt-1 font-display text-lg font-semibold ${styles.accent}`}>{assessment.title}</p>
        </div>
        <CruiseConfidenceBadge level={assessment.level} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-700">{assessment.guidance}</p>
      <CruiseConfidenceLabels labels={assessment.supportingLabels} className="mt-4" compact />
      {showDisclaimer && (
        <p className="mt-4 text-xs leading-relaxed text-gray-500">{CRUISE_CONFIDENCE_DISCLAIMER}</p>
      )}
    </div>
  );
}
