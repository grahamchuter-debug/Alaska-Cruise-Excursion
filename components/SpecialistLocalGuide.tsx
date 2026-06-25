import { SpecialistPartnerCard } from "@/components/SpecialistPartnerCard";
import { getPortBySlug } from "@/data/ports";

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
      <SpecialistPartnerCard portSlug={portSlug} hidePortGuideLink={hidePortGuideLink} />
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
      : "Each port below has a dedicated local specialist partner with live tour listings, local pricing, and pier pickup details beyond what a regional overview can cover.";

  return (
    <section className="mb-12">
      <h2 className="section-title text-2xl sm:text-3xl mb-3">{heading}</h2>
      <p className="text-gray-600 mb-6 text-sm leading-relaxed">{intro ?? defaultIntro}</p>
      <div className={`grid gap-4 ${uniqueSlugs.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {uniqueSlugs.map((slug) => (
          <SpecialistPartnerCard key={slug} portSlug={slug} />
        ))}
      </div>
    </section>
  );
}
