import Link from "next/link";
import { getBestScheduleUrl } from "@/lib/schedule-cta-url";
import {
  formatSpecialistDomain,
  getSpecialistExcursionUrl,
  getSpecialistPartnerCta,
  type SpecialistExcursionUrlInput,
} from "@/lib/specialist-links";
import { getPortBySlug } from "@/data/ports";

export interface ExcursionCardCTAsProps extends SpecialistExcursionUrlInput {
  portSlug: string;
  className?: string;
  variant?: "default" | "on-dark";
  /** Hide "View Port Guide" when the user is already on that port's guide page. */
  hidePortGuideLink?: boolean;
  /** Show specialist domain under the primary CTA. */
  showSpecialistDomain?: boolean;
  /** Specialist outbound CTA only — omit port guide and schedule buttons. */
  specialistOnly?: boolean;
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
  showSpecialistDomain = true,
  specialistOnly = false,
}: ExcursionCardCTAsProps) {
  const port = getPortBySlug(portSlug);
  const specialistHref = getSpecialistExcursionUrl(portSlug, {
    excursionTypeSlug,
    excursionType,
    sectionHint,
    guideHref,
    text,
  });
  const scheduleCta = getBestScheduleUrl({ portSlug });
  const primaryClass =
    variant === "on-dark" ? "btn-primary bg-white text-caribbean-800 hover:bg-caribbean-50" : "btn-primary";
  const secondaryClass =
    variant === "on-dark"
      ? "btn-secondary border-white/70 text-white hover:bg-white/10"
      : "btn-secondary";
  const ctaLabel = getSpecialistPartnerCta(portSlug);
  const domain = port ? formatSpecialistDomain(port.specialistUrl) : null;

  const specialistCta = (
    <div className="flex min-w-[12rem] flex-col gap-1">
      <a
        href={specialistHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${primaryClass} text-xs inline-flex items-center justify-center gap-1.5`}
      >
        {ctaLabel}
        <svg className="h-3.5 w-3.5 shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
      {showSpecialistDomain && domain && (
        <p className="text-[11px] font-medium text-gray-500 pl-0.5">{domain}</p>
      )}
    </div>
  );

  if (specialistOnly) {
    return <div className={className ?? "mt-4"}>{specialistCta}</div>;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className ?? "mt-4"}`}>
      {specialistCta}
      {!hidePortGuideLink && (
        <Link href={`/ports/${portSlug}`} className={`${secondaryClass} text-xs self-start`}>
          View Port Guide
        </Link>
      )}
      {scheduleCta && (
        <Link href={scheduleCta.href} className={`${secondaryClass} text-xs self-start`}>
          Check Ship Schedule
        </Link>
      )}
      {scheduleCta?.fallbackNote && (
        <p className="w-full text-xs text-gray-500">{scheduleCta.fallbackNote}</p>
      )}
    </div>
  );
}
