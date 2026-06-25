import Link from "next/link";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";

interface BookingJourneyPanelProps {
  portSlug?: string;
  sectionHint?: string;
  title?: string;
  description?: string;
  className?: string;
  hidePortGuideLink?: boolean;
}

export function BookingJourneyPanel({
  portSlug,
  sectionHint,
  title = "Ready to book your shore excursions?",
  description = "Plan with local specialist partners, open the authority port guide, or check ship schedules before you commit.",
  className = "mb-12",
  hidePortGuideLink = false,
}: BookingJourneyPanelProps) {
  return (
    <section
      className={`rounded-2xl border border-caribbean-200 bg-gradient-to-br from-caribbean-50/80 via-white to-tropical-sand/20 p-6 sm:p-8 ${className}`}
    >
      <h2 className="font-display text-xl font-bold text-gray-900 sm:text-2xl">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
      {portSlug ? (
        <ExcursionCardCTAs
          portSlug={portSlug}
          sectionHint={sectionHint}
          className="mt-5"
          hidePortGuideLink={hidePortGuideLink}
        />
      ) : (
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/alaska-cruise-excursion-planner" className="btn-primary text-sm">
            Alaska Excursion Finder
          </Link>
          <Link href="/ports" className="btn-secondary text-sm">
            View Port Guides
          </Link>
          <Link href="/ship-schedules" className="btn-secondary text-sm">
            Check Ship Schedules
          </Link>
          <Link href="/excursion-types" className="btn-secondary text-sm">
            Excursion Types
          </Link>
        </div>
      )}
    </section>
  );
}
