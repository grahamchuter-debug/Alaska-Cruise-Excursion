import Link from "next/link";
import type { ScheduleHubDetails, SchedulePageContent } from "@/data/schedule-page-content";
import { NavCardCta } from "@/components/NavCardCta";

interface SchedulePageContentSectionsProps {
  content: SchedulePageContent;
  /** Optional port name for default section titles on port-year pages */
  portName?: string;
}

export function SchedulePageContentSections({
  content,
  portName,
}: SchedulePageContentSectionsProps) {
  const whyTitle =
    content.whyPassengersUseTitle ??
    (portName
      ? `Why Cruise Passengers Use This ${portName} Schedule`
      : "Why Cruise Passengers Use This Schedule");

  const planningTitle =
    content.planningTitle ??
    (portName ? `Planning Your Day In ${portName}` : "Planning Your Alaska Port Days");

  const { planningYourDay } = content;

  return (
    <>
      <section className="mb-12">
        <h2 className="section-title text-2xl sm:text-3xl mb-4">{whyTitle}</h2>
        <ul className="space-y-3">
          {content.whyPassengersUse.map((point) => (
            <li key={point} className="flex items-start gap-3 text-gray-700 leading-relaxed">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-caribbean-700 text-white text-xs">
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="section-title text-2xl sm:text-3xl mb-4">{planningTitle}</h2>
        <p className="text-gray-700 leading-relaxed mb-6">{planningYourDay.summary}</p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">What passengers typically do</h3>
            <ul className="space-y-2">
              {planningYourDay.typicalActivities.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1 text-caribbean-700" aria-hidden="true">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Top attractions</h3>
            <ul className="space-y-2">
              {planningYourDay.topAttractions.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1 text-caribbean-700" aria-hidden="true">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Recommended excursion types</h3>
            <ul className="space-y-2">
              {planningYourDay.recommendedExcursions.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1 text-caribbean-700" aria-hidden="true">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Timing considerations</h3>
            <ul className="space-y-2">
              {planningYourDay.timingConsiderations.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1 text-caribbean-700" aria-hidden="true">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Return-to-ship guidance:</strong> {planningYourDay.returnGuidance}
        </p>
      </section>

      {content.hubDetails && (
        <ScheduleHubDetailSections hubDetails={content.hubDetails} portName={portName} />
      )}

      {content.internalLinks.length > 0 && (
        <section className="mb-12">
          <h2 className="section-title text-2xl sm:text-3xl mb-6">Related Planning Resources</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.internalLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-gradient group flex h-full flex-col hover:border-caribbean-300"
                >
                  <span className="font-medium text-gray-900">{link.label}</span>
                  <span className="block text-sm text-gray-600 mt-1">{link.description}</span>
                  <NavCardCta className="pt-4">Visit website</NavCardCta>
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="card-gradient group flex h-full flex-col hover:border-caribbean-300"
                >
                  <span className="font-medium text-gray-900">{link.label}</span>
                  <span className="block text-sm text-gray-600 mt-1">{link.description}</span>
                  <NavCardCta className="pt-4">Open resource</NavCardCta>
                </Link>
              ),
            )}
          </div>
        </section>
      )}
    </>
  );
}

/** Intro block for schedule pages using centralized page content */
export function SchedulePageIntro({ content }: { content: SchedulePageContent }) {
  return (
    <section className="mb-12 max-w-3xl">
      <p className="text-gray-700 leading-relaxed text-lg">{content.intro}</p>
    </section>
  );
}

function ScheduleHubDetailSections({
  hubDetails,
  portName,
}: {
  hubDetails: ScheduleHubDetails;
  portName?: string;
}) {
  const locationLabel = portName ?? "this port";

  return (
    <section className="mb-12 space-y-6">
      <h2 className="section-title text-2xl sm:text-3xl">
        {portName ? `${portName} Port-Day Essentials` : "Port-Day Essentials"}
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Most popular excursions</h3>
          <ul className="space-y-4">
            {hubDetails.popularExcursions.map((excursion) => (
              <li key={excursion.name}>
                <p className="font-medium text-gray-900">{excursion.name}</p>
                <p className="mt-1 text-xs font-medium text-caribbean-700">{excursion.duration}</p>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{excursion.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Cruise terminal information</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{hubDetails.terminalInfo}</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Tender vs dock</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{hubDetails.tenderVsDock}</p>
          </div>

          <div className="rounded-xl border border-caribbean-200 bg-caribbean-50/50 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Typical time in port</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{hubDetails.typicalTimeInPort}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Best excursion timing for {locationLabel}</h3>
        <ul className="space-y-2">
          {hubDetails.bestExcursionTiming.map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-1 text-caribbean-700" aria-hidden="true">
                •
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
