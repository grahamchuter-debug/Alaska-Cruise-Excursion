import Link from "next/link";
import { getSpecialistPartner } from "@/lib/specialist-links";

export function SpecialistPartnerCard({
  portSlug,
  variant = "default",
  hidePortGuideLink = false,
  className = "",
}: {
  portSlug: string;
  variant?: "default" | "compact";
  hidePortGuideLink?: boolean;
  className?: string;
}) {
  const partner = getSpecialistPartner(portSlug);
  if (!partner) return null;

  const isCompact = variant === "compact";

  return (
    <div
      className={`flex h-full flex-col rounded-xl border-2 border-caribbean-200 bg-gradient-to-br from-caribbean-50 to-white ${
        isCompact ? "p-5" : "p-6 sm:p-7"
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex shrink-0 items-center justify-center rounded-full bg-caribbean-700 text-white ${
            isCompact ? "h-9 w-9" : "h-10 w-10"
          }`}
          aria-hidden
        >
          <svg className={isCompact ? "h-4 w-4" : "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600">
            Local specialist partner
          </p>
          <h3 className={`font-display font-bold text-gray-900 ${isCompact ? "text-base" : "text-lg"}`}>
            {partner.siteName}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-gray-500">{partner.domain}</p>
          {!isCompact && (
            <p className="mt-1 text-xs text-caribbean-700 font-medium">{partner.bestFor}</p>
          )}
        </div>
      </div>

      {!isCompact && (
        <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-700">
          Vetted {partner.portName} operators with pier-aware pickup, local pricing, and excursion details
          matched to cruise ship schedules — independent from generic cruise aggregators.
        </p>
      )}

      {isCompact && (
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Live {partner.portName} tour listings and pier pickup details on the dedicated local site.
        </p>
      )}

      <div className={`flex flex-col gap-2 sm:flex-row sm:flex-wrap ${isCompact ? "mt-4" : "mt-5"}`}>
        <a
          href={partner.homepageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm inline-flex items-center justify-center gap-2"
        >
          {partner.ctaLabel}
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
        {!hidePortGuideLink && (
          <Link href={`/ports/${partner.portSlug}`} className="btn-secondary text-sm text-center">
            {partner.portName} authority guide
          </Link>
        )}
      </div>
    </div>
  );
}
