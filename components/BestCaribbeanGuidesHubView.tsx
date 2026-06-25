import Link from "next/link";
import { getPortBySlug } from "@/data/ports";
import { getBestScheduleUrl } from "@/lib/schedule-cta-url";
import {
  bestCaribbeanGuidesHub,
  getFeaturedBestCaribbeanGuides,
} from "@/data/best-caribbean-guides-hub";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { AuthorityHubLinks } from "@/components/AuthorityHubLinks";
import { NavCardCta } from "@/components/NavCardCta";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";

const hubFaqs = [
  {
    question: "What are the best Caribbean guides for cruise passengers?",
    answer:
      "Our ranked guides cover beaches, snorkelling ports, family-friendly ports, first-time cruiser picks, and top 2027 cruise ports. Each links to authority port pages, comparisons, and ship schedules.",
  },
  {
    question: "How are Caribbean ports ranked in these guides?",
    answer:
      "Rankings use authority port research: excursion quality, transfer time, value on a 6–8 hour port day, and operator standards — not paid placement.",
  },
  {
    question: "Do these guides link to ship schedules?",
    answer:
      "Yes. Where we track a port's schedule hub, guides link to yearly and monthly pages. Verified 2027 data is strongest for St. Thomas and Ocho Rios today.",
  },
];

export function BestCaribbeanGuidesHubView() {
  const featuredGuides = getFeaturedBestCaribbeanGuides();
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: bestCaribbeanGuidesHub.title, path: `/${bestCaribbeanGuidesHub.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(hubFaqs),
          travelGuideSchema({
            title: bestCaribbeanGuidesHub.seoTitle,
            description: bestCaribbeanGuidesHub.metaDescription,
            path: `/${bestCaribbeanGuidesHub.slug}`,
          }),
        ]}
      />
      <PageHero title={bestCaribbeanGuidesHub.title} subtitle={bestCaribbeanGuidesHub.heroSubtitle} />
      <section className="section-padding">
        <div className="container-wide max-w-5xl">
          <Breadcrumbs items={breadcrumbs} />

          <p className="text-gray-700 leading-relaxed text-lg mb-10 max-w-3xl">
            {bestCaribbeanGuidesHub.introduction}
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {featuredGuides.map((guide, index) => (
              <Link
                key={guide.slug}
                href={`/${guide.slug}`}
                className="card-gradient group flex h-full flex-col border-2 border-transparent hover:border-caribbean-200"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600">
                  Guide {index + 1}
                </p>
                <h2 className="mt-2 font-display text-xl font-bold text-gray-900 group-hover:text-caribbean-700">
                  {guide.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{guide.heroSubtitle}</p>
                <NavCardCta className="pt-4">Read guide — {guide.topPorts.length} ranked ports</NavCardCta>
              </Link>
            ))}
          </div>

          <section className="mt-14">
            <h2 className="section-title text-2xl sm:text-3xl mb-6">Quick links by port</h2>
            <p className="text-gray-700 mb-6">
              Every guide ranks ports with links to authority guides, comparisons, and schedules.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredGuides[0]?.topPorts.slice(0, 6).map((item, rank) => {
                const port = getPortBySlug(item.slug);
                const scheduleCta = getBestScheduleUrl({ portSlug: item.slug, year: 2027 });
                if (!port) return null;
                return (
                  <div key={item.slug} className="rounded-xl border border-caribbean-100 bg-white p-4">
                    <p className="text-xs font-semibold text-caribbean-600">#{rank + 1}</p>
                    <h3 className="font-display text-lg font-bold text-gray-900">{port.name}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link href={`/ports/${item.slug}`} className="btn-primary text-xs">
                        Port guide
                      </Link>
                      {scheduleCta && (
                        <Link href={scheduleCta.href} className="btn-secondary text-xs">
                          Schedule
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-12 flex flex-wrap gap-3">
            <Link href="/best-shore-excursion-every-caribbean-port" className="btn-primary text-sm">
              Every Port Excursion Table
            </Link>
            <Link href="/busiest-caribbean-cruise-ports-2027" className="btn-secondary text-sm">
              Busiest Ports 2027
            </Link>
            <Link href="/caribbean-cruise-calendar-2027" className="btn-secondary text-sm">
              2027 Cruise Calendar
            </Link>
            <Link href="/cruise-planner" className="btn-secondary text-sm">
              Cruise Planner
            </Link>
          </section>

          <div className="mt-12">
            <FAQSection faqs={hubFaqs} />
          </div>

          <div className="mt-12">
            <AuthorityHubLinks />
          </div>
        </div>
      </section>
    </>
  );
}
