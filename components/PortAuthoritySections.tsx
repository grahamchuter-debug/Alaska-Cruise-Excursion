import type { Port } from "@/data/types";
import type { PortAuthorityContent } from "@/data/types";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import { MeetingPointSnapshot } from "@/components/MeetingPointSnapshot";
import { evaluateExcursionConfidence, evaluatePortConfidence } from "@/lib/cruise-confidence";
import { CruiseConfidenceBadge } from "@/components/CruiseConfidenceBadge";
import { CruiseConfidenceLabels } from "@/components/CruiseConfidenceLabels";
import { CruiseConfidenceCard } from "@/components/CruiseConfidenceCard";
import { getSignatureExcursionLogistics } from "@/data/excursion-logistics";
import { matchesSignatureExcursion } from "@/lib/excursion-logistics";

export function PortAuthoritySections({
  port,
  authority,
  hidePortGuideLink = false,
}: {
  port: Port;
  authority: PortAuthorityContent;
  hidePortGuideLink?: boolean;
}) {
  const overviewLead = port.overview.split(". ").slice(0, 2).join(". ") + ".";
  const portConfidence = evaluatePortConfidence(port.slug);
  const signatureLogistics = getSignatureExcursionLogistics(port.slug);
  const featuredExcursions = port.bestExcursions.slice(0, 4);
  const signatureShownInGrid = featuredExcursions.some((exc) =>
    matchesSignatureExcursion(port.slug, exc.name),
  );

  return (
    <>
      <CruiseConfidenceCard assessment={portConfidence} className="mb-10" />
      <section className="mb-10 rounded-xl border border-gray-100 bg-gray-50/50 p-5 sm:p-6">
        <h2 className="section-title text-xl sm:text-2xl mb-3">At a Glance</h2>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{overviewLead}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {port.highlights.map((h) => (
            <span
              key={h}
              className="info-badge-subtle"
            >
              {h}
            </span>
          ))}
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {authority.whyVisit.slice(0, 4).map((item) => (
            <li key={item} className="text-sm text-gray-700 flex gap-2">
              <span className="text-caribbean-600 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl sm:text-2xl mb-4">Top Shore Excursions</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {featuredExcursions.map((exc) => {
            const confidence = evaluateExcursionConfidence(port.slug, exc);
            const isSignature = matchesSignatureExcursion(port.slug, exc.name);
            return (
            <div key={exc.name} className={`rounded-lg border bg-white p-4 ${isSignature ? "border-caribbean-200 ring-1 ring-caribbean-100" : "border-gray-200"}`}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{exc.name}</h3>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  {isSignature && (
                    <span className="info-label text-[10px] uppercase tracking-wide">
                      Signature pick
                    </span>
                  )}
                  {exc.rating && (
                    <span className="text-xs text-tropical-mango font-semibold">★ {exc.rating}</span>
                  )}
                  <CruiseConfidenceBadge level={confidence.level} />
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">{exc.description}</p>
              <div className="mt-2 flex gap-2 text-xs text-gray-500">
                <span>{exc.duration}</span>
                <span>·</span>
                <span>{exc.type}</span>
              </div>
              {isSignature && (
                <MeetingPointSnapshot
                  portSlug={port.slug}
                  excursionName={exc.name}
                  compact
                  className="mt-4"
                />
              )}
              <CruiseConfidenceLabels labels={confidence.supportingLabels} className="mt-3" compact />
              <ExcursionCardCTAs
                portSlug={port.slug}
                excursionType={exc.type}
                text={`${exc.name} ${exc.description}`}
                hidePortGuideLink={hidePortGuideLink}
              />
            </div>
            );
          })}
        </div>
        {signatureLogistics && !signatureShownInGrid && (
          <MeetingPointSnapshot
            portSlug={port.slug}
            excursionName={signatureLogistics.excursionName}
            className="mt-4"
          />
        )}
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl sm:text-2xl mb-4">Terminal Quick Facts</h2>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Dock", value: port.portInfo.dockType },
            { label: "Walking", value: port.portInfo.walkingDistance },
            { label: "Tender", value: port.portInfo.tenderRequired ? "Yes" : "No" },
            { label: "Currency", value: port.portInfo.currency },
            { label: "Language", value: port.portInfo.language },
            { label: "Time Zone", value: port.portInfo.timeZone },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-gray-100 bg-white p-3">
              <dt className="text-xs font-medium text-gray-500">{item.label}</dt>
              <dd className="mt-1 text-sm text-gray-900">{item.value}</dd>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-gray-600">
          <strong>Safety:</strong> {port.portInfo.safetyNotes}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl sm:text-2xl mb-4">Passenger Tips</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {port.passengerTips.slice(0, 6).map((tip) => (
            <li key={tip} className="text-sm text-gray-700 flex gap-2 rounded-lg bg-white border border-gray-100 px-3 py-2">
              <span className="text-caribbean-600 shrink-0">✓</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
