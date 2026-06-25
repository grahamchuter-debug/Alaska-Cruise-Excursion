import Link from "next/link";
import { getPortBySlug } from "@/data/ports";

function specialistDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function SpecialistLocalGuideCard({
  portSlug,
  hidePortGuideLink = false,
}: {
  portSlug: string;
  hidePortGuideLink?: boolean;
}) {
  const port = getPortBySlug(portSlug);
  if (!port) return null;

  const domain = specialistDomain(port.specialistUrl);

  return (
    <div className="rounded-xl border-2 border-caribbean-200 bg-gradient-to-br from-caribbean-50 to-white p-6 sm:p-7 h-full flex flex-col">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-caribbean-700 text-white">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
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
        <div>
          <h3 className="font-display text-lg font-bold text-gray-900">{port.name}</h3>
          <p className="text-xs text-caribbean-600 font-medium mt-0.5">{port.bestFor}</p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed text-sm flex-1">
        This authority guide helps you compare {port.name} excursions and plan your port day.{" "}
        <strong>{port.specialistName}</strong> goes deeper with live tour listings, local operator
        pricing, pier pickup details, and booking options you will not find on generic cruise
        aggregators.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <a
          href={port.specialistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm inline-flex items-center justify-center gap-2"
        >
          Browse {port.name} shore excursions at {domain}
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
          <Link href={`/ports/${port.slug}`} className="btn-secondary text-sm text-center">
            {port.name} authority port guide
          </Link>
        )}
      </div>
    </div>
  );
}

/** Single-port "Detailed Local Guide" section for authority pages. */
export function SpecialistLocalGuide({
  portSlug,
  hidePortGuideLink = false,
}: {
  portSlug: string;
  hidePortGuideLink?: boolean;
}) {
  const port = getPortBySlug(portSlug);
  if (!port) return null;

  return (
    <section className="mb-12">
      <h2 className="section-title text-2xl sm:text-3xl mb-3">Detailed Local Guide</h2>
      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
        Ready to book? Our specialist partner for {port.name} lists vetted local operators with
        pier-aware pickup times, transparent pricing, and excursion details tailored to cruise ship
        schedules.
      </p>
      <SpecialistLocalGuideCard portSlug={portSlug} hidePortGuideLink={hidePortGuideLink} />
    </section>
  );
}

/** Multi-port "Detailed Local Guides" section, deduplicates slugs automatically. */
export function SpecialistLocalGuideSection({
  portSlugs,
  intro,
}: {
  portSlugs: string[];
  intro?: string;
}) {
  const uniqueSlugs = [...new Set(portSlugs)].filter((slug) => getPortBySlug(slug));
  if (uniqueSlugs.length === 0) return null;

  const heading = uniqueSlugs.length === 1 ? "Detailed Local Guide" : "Detailed Local Guides";
  const defaultIntro =
    uniqueSlugs.length === 1
      ? "When you are ready to book, visit the dedicated local specialist site for live availability, operator pricing, and pier pickup details."
      : "Each port below has a dedicated local specialist site with live tour listings, local pricing, and pier pickup details beyond what a regional overview can cover.";

  return (
    <section className="mb-12">
      <h2 className="section-title text-2xl sm:text-3xl mb-3">{heading}</h2>
      <p className="text-gray-600 mb-6 text-sm leading-relaxed">{intro ?? defaultIntro}</p>
      <div
        className={`grid gap-4 ${uniqueSlugs.length > 1 ? "sm:grid-cols-2" : ""}`}
      >
        {uniqueSlugs.map((slug) => (
          <SpecialistLocalGuideCard key={slug} portSlug={slug} />
        ))}
      </div>
    </section>
  );
}
