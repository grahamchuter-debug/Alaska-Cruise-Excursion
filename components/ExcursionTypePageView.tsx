import Link from "next/link";
import type { ExcursionType } from "@/data/types";
import { getPortBySlug } from "@/data/ports";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import { ExcursionTypeHero } from "@/components/ExcursionTypeHero";
import { BookingJourneyPanel } from "@/components/BookingJourneyPanel";
import { DestinationHeroBand } from "@/components/DestinationHeroBand";
import { PremiumEditorialCard } from "@/components/PremiumEditorialCard";
import { CruiseConfidenceBadge } from "@/components/CruiseConfidenceBadge";
import { CruiseConfidenceLabels } from "@/components/CruiseConfidenceLabels";
import {
  evaluatePortConfidence,
  CRUISE_CONFIDENCE_DISCLAIMER,
  type CruiseConfidenceAssessment,
  type CruiseConfidenceLevel,
} from "@/lib/cruise-confidence";
import { excursionTypeImageTheme } from "@/lib/port-themes";

const CONFIDENCE_SECTIONS: {
  level: CruiseConfidenceLevel;
  title: string;
  description: string;
}[] = [
  {
    level: "high",
    title: "High Confidence",
    description:
      "Straightforward pier logistics, comfortable return buffers, and excursion durations that fit typical cruise windows.",
  },
  {
    level: "medium",
    title: "Medium Confidence",
    description:
      "Manageable with planning — allow standard return margins and confirm operator pickup times at busy ports.",
  },
  {
    level: "plan-carefully",
    title: "Plan Carefully",
    description:
      "Tender ports, long transfers, or active formats need early departures and conservative excursion selection.",
  },
];

function groupPortsByConfidence(portSlugs: string[]) {
  const groups: Record<CruiseConfidenceLevel, { slug: string; assessment: CruiseConfidenceAssessment }[]> = {
    high: [],
    medium: [],
    "plan-carefully": [],
  };

  for (const slug of portSlugs) {
    const assessment = evaluatePortConfidence(slug);
    groups[assessment.level].push({ slug, assessment });
  }

  return groups;
}

function SuitabilityCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-caribbean-100 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-700">
        <span className="mr-1.5" aria-hidden>
          {icon}
        </span>
        {label}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-gray-700">{value}</p>
    </div>
  );
}

export function ExcursionTypePageView({
  type,
  breadcrumbs,
}: {
  type: ExcursionType;
  breadcrumbs: { name: string; path: string }[];
}) {
  const portSlugs = [
    ...new Set([
      ...type.bestPorts.map((port) => port.slug),
      ...(type.recommendedByPort?.map((row) => row.portSlug) ?? []),
    ]),
  ];
  const confidenceGroups = groupPortsByConfidence(portSlugs);
  const bestPortsTitle =
    type.authoritySectionTitle ?? `Best Caribbean Ports For ${type.name}`;

  return (
    <>
      <ExcursionTypeHero type={type} />
      <article className="section-padding">
        <div className="container-wide max-w-5xl">
          <Breadcrumbs items={breadcrumbs} />

          {type.whyPassengersChoose && type.whyPassengersChoose.length > 0 && (
            <section className="mb-12 rounded-2xl border border-caribbean-200 bg-gradient-to-br from-caribbean-50/60 via-white to-tropical-sand/20 p-6 sm:p-8">
              <h2 className="section-title text-2xl sm:text-3xl mb-4">
                Why Cruise Passengers Choose {type.name}
              </h2>
              <ul className="space-y-3">
                {type.whyPassengersChoose.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-caribbean-700 text-white text-xs">
                      ✓
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-2">{bestPortsTitle}</h2>
            <p className="section-subtitle mb-6">
              Start with the ports that deliver the strongest {type.name.toLowerCase()} — then open specialist
              sites or port guides to book.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {type.bestPorts.map((portRow) => {
                const port = getPortBySlug(portRow.slug);
                const confidence = evaluatePortConfidence(portRow.slug);
                if (!port) return null;
                return (
                  <article
                    key={portRow.slug}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-caribbean-100/80 bg-white shadow-md"
                  >
                    <DestinationHeroBand
                      imageTheme={port.imageTheme}
                      imageAlt={port.imageAlt}
                      title={port.name}
                      subtitle={port.country}
                      eyebrow={port.bestFor}
                      heightClass="h-36 sm:h-40"
                      portSlug={port.slug}
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-sm leading-relaxed text-gray-700">{portRow.reason}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <CruiseConfidenceBadge level={confidence.level} />
                        <CruiseConfidenceLabels labels={confidence.supportingLabels} compact />
                      </div>
                      <ExcursionCardCTAs
                        portSlug={portRow.slug}
                        excursionTypeSlug={type.slug}
                        text={`${type.name} ${portRow.reason}`}
                        className="mt-5"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {type.recommendedByPort && type.recommendedByPort.length > 0 && (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-2">Recommended Excursions By Port</h2>
              <p className="section-subtitle mb-6">
                Signature {type.name.toLowerCase()} at top cruise ports — move from interest to booking through
                local specialist sites.
              </p>
              <div className="grid gap-5 lg:grid-cols-2">
                {type.recommendedByPort.map((port) => {
                  const confidence = evaluatePortConfidence(port.portSlug);
                  const portData = getPortBySlug(port.portSlug);
                  const imageTheme = portData?.imageTheme ?? excursionTypeImageTheme(type.name);
                  return (
                    <article
                      key={port.portSlug}
                      className="flex h-full flex-col overflow-hidden rounded-2xl border border-caribbean-100/80 bg-white shadow-md"
                    >
                      <PremiumEditorialCard
                        eyebrow={port.portName}
                        title={port.excursions[0] ?? type.name}
                        subtitle={
                          port.excursions.length > 1
                            ? `+ ${port.excursions.length - 1} more signature pick${port.excursions.length > 2 ? "s" : ""}`
                            : `${type.name} at ${port.portName}`
                        }
                        imageTheme={imageTheme}
                        imageLabel={`${type.name} at ${port.portName}`}
                        portSlug={port.portSlug}
                        href={`/ports/${port.portSlug}`}
                        ctaLabel="View port guide"
                        details={[
                          {
                            label: "Signature picks",
                            value: port.excursions.join(" · "),
                          },
                          {
                            label: "Cruise confidence",
                            value: confidence.title,
                          },
                        ]}
                        className="flex-1 rounded-none border-0 shadow-none"
                      />
                      <div className="border-t border-gray-100 bg-gradient-to-b from-caribbean-50/30 to-white px-4 py-4 sm:px-5">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <CruiseConfidenceBadge level={confidence.level} />
                          <CruiseConfidenceLabels labels={confidence.supportingLabels} compact />
                        </div>
                        <ExcursionCardCTAs
                          portSlug={port.portSlug}
                          excursionTypeSlug={type.slug}
                          text={port.excursions.join(" ")}
                          className="mt-0"
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-2">Cruise Confidence Guidance</h2>
            <p className="section-subtitle mb-6">
              How confidently cruise passengers can plan {type.name.toLowerCase()} at each port tier — planning
              guidance only, not a guarantee.
            </p>
            <p className="mb-6 text-xs text-gray-500">{CRUISE_CONFIDENCE_DISCLAIMER}</p>
            <div className="grid gap-5 lg:grid-cols-3">
              {CONFIDENCE_SECTIONS.map((section) => {
                const ports = confidenceGroups[section.level];
                return (
                  <div
                    key={section.level}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <CruiseConfidenceBadge level={section.level} className="mb-3" />
                    <h3 className="font-display text-lg font-semibold text-gray-900">{section.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{section.description}</p>
                    {ports.length > 0 ? (
                      <ul className="mt-4 space-y-3">
                        {ports.map(({ slug, assessment }) => {
                          const port = getPortBySlug(slug);
                          if (!port) return null;
                          return (
                            <li key={slug} className="rounded-lg border border-gray-100 bg-gray-50/80 p-3">
                              <Link
                                href={`/ports/${slug}`}
                                className="text-sm font-semibold text-caribbean-800 hover:underline"
                              >
                                {port.name}
                              </Link>
                              <p className="mt-1 text-xs leading-relaxed text-gray-600">{assessment.guidance}</p>
                              <ExcursionCardCTAs
                                portSlug={slug}
                                excursionTypeSlug={type.slug}
                                className="mt-3"
                              />
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="mt-4 text-sm text-gray-500">
                        No ports in this tier for this excursion category on your typical routes.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {type.suitability && (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-2">Who This Excursion Type Suits</h2>
              <p className="section-subtitle mb-6">
                Family, first-time cruiser, and mobility notes to help you choose the right port day format.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <SuitabilityCard label="Families" value={type.suitability.family} icon="👨‍👩‍👧‍👦" />
                <SuitabilityCard
                  label="First-Time Cruisers"
                  value={type.suitability.firstTimeCruisers}
                  icon="⚓"
                />
                <SuitabilityCard label="Mobility" value={type.suitability.mobility} icon="🚐" />
              </div>
            </section>
          )}

          {type.specialistSites && type.specialistSites.length > 0 && (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-2">
                {type.specialistSectionTitle ?? "Local Specialist Booking Sites"}
              </h2>
              <p className="section-subtitle mb-6">
                Book directly with vetted port specialists — category pages open when available.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {type.specialistSites.map((site) => (
                  <div
                    key={site.portSlug}
                    className="rounded-xl border border-caribbean-100 bg-white p-5 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600">
                      {site.portName}
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">{site.siteLabel}</p>
                    <ExcursionCardCTAs
                      portSlug={site.portSlug}
                      excursionTypeSlug={type.slug}
                      className="mt-4"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {type.authorityLinks && type.authorityLinks.length > 0 && (
            <section className="mb-12">
              <h2 className="section-title text-2xl sm:text-3xl mb-6">Related Planning Guides</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {type.authorityLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="card block hover:border-caribbean-200"
                  >
                    <h3 className="font-semibold text-gray-900">{link.label}</h3>
                    {link.description && (
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{link.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{type.overview}</p>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">What to Expect</h2>
            <ul className="space-y-3">
              {type.whatToExpect.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-caribbean-700 text-white text-xs">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {type.bookingPathways && type.bookingPathways.length > 0 && (
            <section className="mb-12 rounded-2xl border border-caribbean-200 bg-caribbean-50/40 p-6 sm:p-8">
              <h2 className="section-title text-2xl sm:text-3xl mb-2">Your Booking Route</h2>
              <p className="text-sm text-gray-600 mb-5">
                Interest → port → excursion → specialist booking. Follow these links to keep moving forward.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {type.bookingPathways.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex h-full flex-col rounded-xl border border-caribbean-100 bg-white px-4 py-3 text-sm hover:border-caribbean-300"
                    >
                      <span className="font-semibold text-caribbean-800">{link.label}</span>
                      {link.description && (
                        <span className="mt-1 text-gray-600">{link.description}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Planning Tips</h2>
            <ul className="space-y-3">
              {type.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tropical-mango text-white text-xs">
                    ★
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          <BookingJourneyPanel
            title={`Book ${type.name.toLowerCase()} for your cruise`}
            description="Use the Caribbean Excursion Finder to match ports on your itinerary, or browse all port guides and ship schedules before you book with local specialists."
          />

          <FAQSection faqs={type.faqs} />
        </div>
      </article>
    </>
  );
}
