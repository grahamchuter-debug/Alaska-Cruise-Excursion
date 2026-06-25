import Link from "next/link";
import { getBestScheduleUrl } from "@/lib/schedule-cta-url";
import {
  getSpecialistExcursionUrl,
  type SpecialistExcursionUrlInput,
} from "@/lib/specialist-links";

export interface ExcursionCardCTAsProps extends SpecialistExcursionUrlInput {
  portSlug: string;
  className?: string;
  variant?: "default" | "on-dark";
  /** Hide "View Port Guide" when the user is already on that port's guide page. */
  hidePortGuideLink?: boolean;
}

export function ExcursionCardCTAs({
  portSlug,
  excursionTypeSlug,
  excursionType,
  sectionHint,
  guideHref,
  text,
  className,
  variant = "default",
  hidePortGuideLink = false,
}: ExcursionCardCTAsProps) {
  const specialistHref = getSpecialistExcursionUrl(portSlug, {
    excursionTypeSlug,
    excursionType,
    sectionHint,
    guideHref,
    text,
  });
  const scheduleCta = getBestScheduleUrl({ portSlug });
  const primaryClass = variant === "on-dark" ? "btn-primary bg-white text-caribbean-800 hover:bg-caribbean-50" : "btn-primary";
  const secondaryClass =
    variant === "on-dark"
      ? "btn-secondary border-white/70 text-white hover:bg-white/10"
      : "btn-secondary";

  return (
    <div className={`flex flex-wrap gap-2 ${className ?? "mt-4"}`}>
      <a
        href={specialistHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${primaryClass} text-xs`}
      >
        View Recommended Excursions
      </a>
      {!hidePortGuideLink && (
        <Link href={`/ports/${portSlug}`} className={`${secondaryClass} text-xs`}>
          View Port Guide
        </Link>
      )}
      {scheduleCta && (
        <Link href={scheduleCta.href} className={`${secondaryClass} text-xs`}>
          Check Ship Schedule
        </Link>
      )}
      {scheduleCta?.fallbackNote && (
        <p className="w-full text-xs text-gray-500">{scheduleCta.fallbackNote}</p>
      )}
    </div>
  );
}
