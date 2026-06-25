import Link from "next/link";
import type { AttractionGuidePage } from "@/data/types";
import { getPortBySlug } from "@/data/ports";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import { getSpecialistPartnerCta } from "@/lib/specialist-links";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";

export function AttractionGuidePageView({ guide }: { guide: AttractionGuidePage }) {
  const port = getPortBySlug(guide.portSlug);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Alaska Ports", path: "/ports" },
    { name: port?.name ?? guide.portSlug, path: `/ports/${guide.portSlug}` },
    { name: guide.title, path: `/${guide.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(guide.faqs),
          travelGuideSchema({
            title: guide.seoTitle,
            description: guide.metaDescription,
            path: `/${guide.slug}`,
          }),
        ]}
      />
      <PageHero title={guide.title} subtitle={guide.heroSubtitle} compact />
      <article className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />

          <section className="mb-10">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">What it is</h2>
            <p className="text-gray-700 leading-relaxed">{guide.whatItIs}</p>
          </section>

          <section className="mb-10">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">Why cruise passengers visit</h2>
            <p className="text-gray-700 leading-relaxed">{guide.whyCruisePassengersVisit}</p>
          </section>

          <section className="mb-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-caribbean-100 bg-caribbean-50/40 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-caribbean-800">Distance from port</h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">{guide.distanceFromPort}</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-600">Time needed</h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">{guide.timeNeeded}</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">Best for</h2>
            <div className="flex flex-wrap gap-2">
              {guide.bestFor.map((item) => (
                <span key={item} className="rounded-full bg-caribbean-50 px-3 py-1.5 text-sm font-medium text-caribbean-800">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">Facilities</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {guide.facilities.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-caribbean-600 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10 rounded-xl border border-gray-200 bg-gray-50/60 p-5 sm:p-6">
            <h2 className="section-title text-xl sm:text-2xl mb-3">Cruise suitability</h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{guide.cruiseSuitability}</p>
          </section>

          <section className="mb-10">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">Recommended excursions</h2>
            <div className="grid gap-4">
              {guide.recommendedExcursions.map((excursion) => (
                <div key={excursion.name} className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="font-semibold text-gray-900">{excursion.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{excursion.description}</p>
                  {excursion.href && (
                    <a
                      href={excursion.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex text-sm font-medium text-caribbean-700 hover:underline"
                    >
                      {getSpecialistPartnerCta(guide.portSlug)} →
                    </a>
                  )}
                </div>
              ))}
            </div>
            <ExcursionCardCTAs
              portSlug={guide.portSlug}
              sectionHint={guide.category === "beach" ? "beaches" : "adventure"}
              className="mt-5"
            />
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl mb-4">Related planning guides</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {guide.relatedGuideHrefs.map((link) =>
                link.href.startsWith("http") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-gradient group flex h-full flex-col"
                  >
                    <span className="font-medium text-gray-900 group-hover:text-caribbean-700">{link.label}</span>
                    <span className="mt-3 text-sm text-caribbean-700">View guide →</span>
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} className="card-gradient group flex h-full flex-col">
                    <span className="font-medium text-gray-900 group-hover:text-caribbean-700">{link.label}</span>
                    <span className="mt-3 text-sm text-caribbean-700">View guide →</span>
                  </Link>
                ),
              )}
            </div>
          </section>

          <FAQSection faqs={guide.faqs} />
        </div>
      </article>
    </>
  );
}
