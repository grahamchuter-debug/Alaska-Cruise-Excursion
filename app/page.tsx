import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getPortBySlug } from "@/data/ports";
import { excursionTypes } from "@/data/excursion-types";
import { cruiseLines } from "@/data/cruise-lines";
import { getPortGuideCount } from "@/data/content-inventory";
import { schedulePorts } from "@/data/schedules";
import { featuredPortCards, HOMEPAGE_SCHEDULE_FEATURED, getHomepageFaqs } from "@/data/homepage";
import { getFeaturedBestAlaskaGuides } from "@/data/best-alaska-guides-hub";
import { comparisons } from "@/data/comparisons";
import { AuthorityPortCard } from "@/components/AuthorityPortCard";
import { SchedulePreviewCard } from "@/components/SchedulePreviewCard";
import { HomepageScheduleCoverageNote } from "@/components/ScheduleCoverageBanner";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, travelGuideSchema, websiteSchema } from "@/lib/schema";
import { AlaskaExcursionFinder } from "@/components/AlaskaExcursionFinder";
import { HeroBackground } from "@/components/HeroBackground";
import { TrustBadgeStrip } from "@/components/TrustBadge";
import { NavCardIcon, excursionTypeNavIcon } from "@/components/NavCardIcon";
import { NavCardCta } from "@/components/NavCardCta";
import { ships } from "@/data/ships";

export const metadata = buildMetadata({
  title: "Alaska Cruise Excursions & Port Planning | Ship Schedules & Shore Tours",
  description: SITE.description,
  path: "/",
  keywords: [
    "Alaska cruise excursions",
    "Alaska cruise ports",
    "whale watching Alaska",
    "Kenai Fjords",
    "White Pass Railway",
    "Alaska ship schedules",
  ],
});

const activityIcons: Record<string, string> = {
  "whale-watching": "🐋",
  "bear-viewing": "🐻",
  "glacier-tours": "🏔️",
  "railway-tours": "🚂",
  "dog-sledding": "🛷",
  "flightseeing": "✈️",
};

export default function HomePage() {
  const featuredPorts = featuredPortCards
    .map((card) => {
      const port = getPortBySlug(card.slug);
      return port ? { port, ...card } : null;
    })
    .filter(Boolean) as Array<{
    port: NonNullable<ReturnType<typeof getPortBySlug>>;
    slug: string;
    description: string;
    bestFor: string;
  }>;

  const homepageSchedules = HOMEPAGE_SCHEDULE_FEATURED.map(({ slug, status }) => {
    const port = schedulePorts.find((p) => p.slug === slug);
    return port ? { port, status } : null;
  }).filter(Boolean) as Array<{
    port: NonNullable<(typeof schedulePorts)[number]>;
    status: "live" | "coming-soon";
  }>;

  const homepageFaqs = getHomepageFaqs();
  const featuredBestGuides = getFeaturedBestAlaskaGuides();
  const featuredActivities = excursionTypes.slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          websiteSchema(),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(homepageFaqs),
          travelGuideSchema({
            title: "Alaska Cruise Excursions & Port Planning",
            description: SITE.description,
            path: "/",
          }),
        ]}
      />

      <section className="home-hero">
        <HeroBackground />
        <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-2 text-caribbean-100 drop-shadow-sm">Alaska cruise planning authority</p>
          <h1 className="home-hero-heading">Alaska Cruise Excursions &amp; Port Planning</h1>
          <p className="mt-3 max-w-2xl text-base leading-snug text-white/90 sm:text-[1.0625rem] drop-shadow-sm">
            Choose the best Alaska shore excursions, wildlife experiences, glacier trips, and rail journeys — then plan
            around your ship schedule with confidence.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/alaska-cruise-excursion-planner" className="btn-primary">
              Alaska Excursion Finder
            </Link>
            <Link href="/plan-my-alaska-cruise" className="btn-secondary border-white/30 text-white hover:bg-white/10">
              Plan my cruise
            </Link>
          </div>
          <div className="mt-4">
            <TrustBadgeStrip variant="dark" />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white border-b border-caribbean-100">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="section-eyebrow">Activity-led planning</p>
              <h2 className="section-title mt-1">Find by Excursion Type</h2>
              <p className="section-subtitle">Start with what you want to do — whales, bears, glaciers, railways, and more.</p>
            </div>
            <Link href="/excursion-types" className="btn-secondary shrink-0">
              All activities
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredActivities.map((type) => (
              <Link
                key={type.slug}
                href={`/excursion-types/${type.slug}`}
                className="group rounded-2xl border border-caribbean-100 bg-card-gradient p-5 shadow-premium transition-shadow hover:shadow-premium-hover"
              >
                <span className="text-2xl" aria-hidden="true">
                  {activityIcons[type.slug] ?? "🏔️"}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-caribbean-900 group-hover:text-caribbean-700">
                  {type.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{type.tagline}</p>
                <NavCardCta className="mt-4">Explore</NavCardCta>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-caribbean-50">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="section-title">Find by Port</h2>
              <p className="section-subtitle">
                {getPortGuideCount()} Alaska port authority guides with dock notes and specialist links.
              </p>
            </div>
            <Link href="/ports" className="btn-secondary shrink-0">
              All ports
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPorts.slice(0, 8).map(({ port, description, bestFor }) => (
              <AuthorityPortCard key={port.slug} port={port} description={description} bestFor={bestFor} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white border-b border-caribbean-100">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="section-title">Alaska Cruise Ship Schedules</h2>
              <p className="section-subtitle">
                Juneau is the only port with live imported schedules today. Skagway, Ketchikan, and Seward hubs are
                ready — verified monthly data is being imported for additional Alaska ports.
              </p>
            </div>
            <Link href="/ship-schedules" className="btn-secondary shrink-0">
              Schedule hub
            </Link>
          </div>
          <HomepageScheduleCoverageNote />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homepageSchedules.map(
              ({ port, status }) => (
                <SchedulePreviewCard key={port.slug} port={port} status={status} />
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-caribbean-50">
        <div className="container-wide">
          <h2 className="section-title">Best Alaska Shore Excursions</h2>
          <p className="section-subtitle mb-8">Authority-ranked guides for wildlife, glaciers, and port planning.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBestGuides.slice(0, 6).map((guide) => (
              <Link
                key={guide.slug}
                href={`/${guide.slug}`}
                className="rounded-2xl border border-caribbean-100 bg-white p-6 shadow-premium hover:shadow-premium-hover transition-shadow"
              >
                <h3 className="font-display text-xl font-semibold text-caribbean-900">{guide.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{guide.heroSubtitle}</p>
                <NavCardCta className="mt-4">Read guide</NavCardCta>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/best-alaska-guides" className="btn-secondary">
              All Alaska guides
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white border-b border-caribbean-100">
        <div className="container-wide max-w-6xl">
          <h2 className="section-title">Alaska Cruise Excursion Finder</h2>
          <p className="section-subtitle mb-8">
            Select interests — whales, bears, glaciers, eagles, railways — and get port, month, and specialist
            recommendations.
          </p>
          <AlaskaExcursionFinder variant="home" />
        </div>
      </section>

      <section className="section-padding bg-caribbean-50">
        <div className="container-wide">
          <h2 className="section-title">Cruise Lines &amp; Ships</h2>
          <p className="section-subtitle mb-8">Plan by operator — Princess, Holland America, Royal Caribbean, and more.</p>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-caribbean-800 mb-4">Cruise lines</h3>
              <ul className="space-y-2">
                {cruiseLines.map((line) => (
                  <li key={line.slug}>
                    <Link href={`/alaska-cruise-lines/${line.slug}`} className="text-caribbean-700 hover:underline font-medium">
                      {line.name}
                    </Link>
                    <span className="text-sm text-gray-500 ml-2">{line.tagline}</span>
                  </li>
                ))}
              </ul>
              <Link href="/alaska-cruise-lines" className="btn-secondary text-sm mt-4 inline-flex">
                All cruise lines
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-caribbean-800 mb-4">Featured ships</h3>
              <ul className="space-y-2">
                {ships.map((ship) => (
                  <li key={ship.slug}>
                    <Link href={`/alaska-cruise-ships/${ship.slug}`} className="text-caribbean-700 hover:underline font-medium">
                      {ship.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/alaska-cruise-ships" className="btn-secondary text-sm mt-4 inline-flex">
                All ships
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="section-title">Regional Guides &amp; Comparisons</h2>
          <p className="section-subtitle mb-8">Head-to-head port decisions and land-extension planning.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/${comp.slug}`}
                className="rounded-2xl border border-caribbean-100 p-5 hover:border-caribbean-300 transition-colors"
              >
                <h3 className="font-semibold text-caribbean-900">{comp.portA} vs {comp.portB}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{comp.summary}</p>
              </Link>
            ))}
            <Link href="/alaska-cruise-with-denali" className="rounded-2xl border border-caribbean-100 p-5 hover:border-caribbean-300">
              <h3 className="font-semibold text-caribbean-900">Alaska Cruise with Denali</h3>
              <p className="mt-2 text-sm text-gray-600">Land extension and cruisetour planning.</p>
            </Link>
            <Link href="/best-time-to-cruise-alaska" className="rounded-2xl border border-caribbean-100 p-5 hover:border-caribbean-300">
              <h3 className="font-semibold text-caribbean-900">Best Time to Cruise Alaska</h3>
              <p className="mt-2 text-sm text-gray-600">Seasonality for whales, bears, and weather.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-caribbean-50 border-t border-caribbean-100">
        <div className="container-wide max-w-3xl">
          <div className="rounded-2xl border border-caribbean-200 bg-white p-8 text-center shadow-editorial">
            <h2 className="section-title">Ready to plan your Alaska cruise?</h2>
            <p className="section-subtitle mt-2">
              Compare independent tours vs cruise line options, smaller groups where operators offer them, and
              return-to-ship confidence — without booking claims we cannot verify.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/plan-my-alaska-cruise" className="btn-primary">
                Plan my Alaska cruise
              </Link>
              <Link href="/alaska-faq" className="btn-secondary">
                Alaska FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FAQSection title="Alaska Cruise Excursion FAQ" faqs={homepageFaqs} />
    </>
  );
}
