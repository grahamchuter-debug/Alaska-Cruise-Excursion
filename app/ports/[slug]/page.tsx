import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPortBySlug, getAllPortSlugs } from "@/data/ports";
import { getPortAuthority } from "@/data/port-authority";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PortPageHero } from "@/components/PortPageHero";
import { FAQSection } from "@/components/FAQSection";
import { SpecialistLocalGuide } from "@/components/SpecialistLocalGuide";
import { PortRelatedLinks } from "@/components/PortRelatedLinks";
import { PortAuthoritySections } from "@/components/PortAuthoritySections";
import { PortPlanningToolkit } from "@/components/PortPlanningToolkit";
import { AuthorityHubLinks } from "@/components/AuthorityHubLinks";
import { BookingJourneyPanel } from "@/components/BookingJourneyPanel";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import { AttractionGridCard } from "@/components/AttractionGridCard";
import { CruisePortInformationBox } from "@/components/CruisePortInformationBox";
import { getPortRelatedLinks } from "@/data/port-related";
import { getAttractionDestination } from "@/lib/attraction-links";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";
import {
  augmentMetadataDescription,
  augmentMetadataTitle,
  getPortGuideHeroTitle,
  getPortGuideIntro,
} from "@/lib/cruise-port-display";

export function generateStaticParams() {
  return getAllPortSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const port = getPortBySlug(slug);
    const authority = getPortAuthority(slug);
    if (!port) return {};
    const baseTitle = authority?.seoTitle ?? `${port.name} Shore Excursions & Cruise Port Guide`;
    const baseDescription =
      authority?.seoDescription ?? `${port.overview.slice(0, 155)}...`;
    return buildMetadata({
      title: augmentMetadataTitle(baseTitle, port.name, slug),
      description: augmentMetadataDescription(baseDescription, slug, "port"),
      path: `/ports/${slug}`,
      keywords: [`${port.name} shore excursions`, `${port.name} cruise port`, port.country],
    });
  });
}

export default async function PortPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const port = getPortBySlug(slug);
  const authority = getPortAuthority(slug);
  if (!port || !authority) notFound();

  const heroTitle = getPortGuideHeroTitle(slug, port.name);
  const heroIntro = getPortGuideIntro(slug) ?? port.tagline;
  const pageTitle = augmentMetadataTitle(
    authority.seoTitle,
    port.name,
    slug,
  );
  const pageDescription = augmentMetadataDescription(
    authority.seoDescription,
    slug,
    "port",
  );

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Caribbean Ports", path: "/ports" },
    { name: port.name, path: `/ports/${slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(port.faqs),
          travelGuideSchema({
            title: pageTitle,
            description: pageDescription,
            path: `/ports/${slug}`,
          }),
        ]}
      />
      <PortPageHero port={port} title={heroTitle} subtitle={heroIntro}>
        <ExcursionCardCTAs portSlug={slug} variant="on-dark" className="mt-0" hidePortGuideLink />
      </PortPageHero>
      <article className="section-padding">
        <div className="container-wide max-w-5xl">
          <Breadcrumbs items={breadcrumbs} />

          <CruisePortInformationBox portSlug={slug} className="mb-8" />

          <PortPlanningToolkit port={port} hidePortGuideLink />

          <PortAuthoritySections port={port} authority={authority} hidePortGuideLink />

          <section id="nearby-attractions" className="mb-10 scroll-mt-24">
            <h2 className="section-title text-xl sm:text-2xl mb-3">Nearby Attractions</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {port.topAttractions.map((attr) => (
                <AttractionGridCard
                  key={attr.name}
                  attraction={attr}
                  destination={getAttractionDestination(slug, attr.name, attr)}
                  compact
                />
              ))}
            </div>
            <ExcursionCardCTAs portSlug={slug} className="mt-6" hidePortGuideLink />
          </section>

          <SpecialistLocalGuide portSlug={slug} hidePortGuideLink />

          <PortRelatedLinks links={getPortRelatedLinks(slug)} />

          <BookingJourneyPanel
            portSlug={slug}
            hidePortGuideLink
            title={`Book ${port.name} shore excursions`}
            description="Compare recommended excursions with local specialists or check which ships are in port on your sailing date."
          />

          <FAQSection faqs={port.faqs} />

          <div className="mt-12">
            <AuthorityHubLinks current="ports" portSlug={slug} />
          </div>
        </div>
      </article>
    </>
  );
}
