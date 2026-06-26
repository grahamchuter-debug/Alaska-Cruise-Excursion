import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getPortBySlug } from "@/data/ports";
import { cruiseLines } from "@/data/cruise-lines";
import { getPortGuideCount } from "@/data/content-inventory";
import { schedulePorts } from "@/data/schedules";
import {
  featuredPortCards,
  HOMEPAGE_EXCURSION_TYPES,
  HOMEPAGE_SCHEDULE_FEATURED,
  getHomepageFaqs,
} from "@/data/homepage";
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
import { NavCardIcon } from "@/components/NavCardIcon";
import { NavCardCta } from "@/components/NavCardCta";
import { HomepageExcursionTypeCard } from "@/components/HomepageExcursionTypeCard";
import { ships } from "@/data/ships";
import { getEnrichedExcursionType } from "@/lib/excursion-type-pathways";

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

export default function HomePage() {
  const homepageActivities = HOMEPAGE_EXCURSION_TYPES.map((item) => {
    const type = getEnrichedExcursionType(item.slug);
    return type ? { ...item, type } : null;
  }).filter(Boolean) as Array<{
    slug: string;
    label: string;
    heroPortSlug: string;
    type: NonNullable<ReturnType<typeof getEnrichedExcursionType>>;
  }>;

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

      {/* 1. Hero */}
      <section className="home-hero">
        <HeroBackground />
        <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-2 text-caribbean-100 drop-shadow-sm">Alaska cruise planning authority</p>
          <h1 className="home-hero-heading">Alaska Cruise Excursions &amp; Port Planning</h1>
          <p className="mt-3 max-w-2xl text-base leading-snug text-white/90 sm:text-[1.0625rem] drop-shadow-sm">
            Start with what you want to do — whales, bears, glaciers, railways — then match excursions to your ship
            schedule and book with vetted local specialists.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/excursion-types" className="btn-primary">
              Browse activities
            </Link>
            <Link href="/alaska-cruise-excursion-planner" className="btn-secondary border-white/30 text-white hover:bg-white/10">
              Alaska Excursion Finder
            </Link>
          </div>
          <div className="mt-4">
            <TrustBadgeStrip variant="dark" />
          </div>
        </div>
      </section>

      {/* 2. Find by excursion type */}
      <section className="section-padding bg-white border-b border-caribbean-100">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="section-eyebrow">Activity-led planning</p>
              <h2 className="section-title mt-1">Find by Excursion Type</h2>
              <p className="section-subtitle">
                Choose the experience first — wildlife, glaciers, railways, culture — then compare the best Alaska ports
                for that activity.
              </p>
            </div>
            <Link href="/excursion-types" className="btn-secondary shrink-0">
              All activities
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {homepageActivities.map(({ slug, label, heroPortSlug, type }) => (
              <HomepageExcursionTypeCard
                key={slug}
                type={type}
                label={label}
                heroPortSlug={heroPortSlug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Alaska Cruise Excursion Finder / Planner */}
      <section className="section-padding bg-caribbean-50 border-b border-caribbean-100">
        <div className="container-wide max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="section-eyebrow">Personalised matching</p>
            <h2 className="section-title mt-1">Alaska Cruise Excursion Finder</h2>
            <p className="section-subtitle">
              Select interests — whales, bears, glaciers, eagles, railways — and get port, month, and specialist
              recommendations matched to your cruise.
            </p>
          </div>
          <AlaskaExcursionFinder variant="home" />
        </div>
      </section>

      {/* 4. Ship schedules */}
      <section className="section-padding bg-white border-b border-caribbean-100">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="section-eyebrow">Plan around your ship</p>
              <h2 className="section-title mt-1">Alaska Cruise Ship Schedules</h2>
              <p className="section-subtitle">
                Juneau and Skagway have live imported schedules today. Ketchikan, Seward, and other hub ports update as
                verified monthly data is imported.
              </p>
            </div>
            <Link href="/ship-schedules" className="btn-secondary shrink-0">
              Schedule hub
            </Link>
          </div>
          <HomepageScheduleCoverageNote />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homepageSchedules.map(({ port, status }) => (
              <SchedulePreviewCard key={port.slug} port={port} status={status} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Find by port */}
      <section className="section-padding bg-caribbean-50 border-b border-caribbean-100">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="section-eyebrow">Port authority guides</p>
              <h2 className="section-title mt-1">Find by Port</h2>
              <p className="section-subtitle">
                {getPortGuideCount()} Alaska port guides with dock notes, excursion picks, and links to vetted local
                specialist operators.
              </p>
            </div>
            <Link href="/ports" className="btn-secondary shrink-0">
              All ports
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPorts.slice(0, 8).map(({ port, description, bestFor }) => (
              <AuthorityPortCard
                key={port.slug}
                port={port}
                description={description}
                bestFor={bestFor}
                specialistVariant="partner-card"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Best Alaska shore excursions */}
      <section className="section-padding bg-white border-b border-caribbean-100">
        <div className="container-wide">
          <div className="mb-8">
            <p className="section-eyebrow">Authority rankings</p>
            <h2 className="section-title mt-1">Best Alaska Shore Excursions</h2>
            <p className="section-subtitle">Ranked guides for wildlife, glaciers, railways, and port planning.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBestGuides.slice(0, 6).map((guide) => (
              <Link
                key={guide.slug}
                href={`/${guide.slug}`}
                className="card-editorial group flex h-full flex-col overflow-hidden hover:shadow-premium-hover transition-shadow"
              >
                <div className="border-b border-caribbean-100 bg-gradient-to-br from-caribbean-50 to-white px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600">Best guide</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-caribbean-900 group-hover:text-caribbean-700">
                    {guide.title}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm text-gray-600 line-clamp-3 flex-1">{guide.heroSubtitle}</p>
                  <NavCardCta className="mt-4">Read guide</NavCardCta>
                </div>
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

      {/* 7. Cruise lines / ships */}
      <section className="section-padding bg-caribbean-50 border-b border-caribbean-100">
        <div className="container-wide">
          <div className="mb-8">
            <p className="section-eyebrow">Operator planning</p>
            <h2 className="section-title mt-1">Cruise Lines &amp; Ships</h2>
            <p className="section-subtitle">
              Plan by operator — Princess, Holland America, Royal Caribbean, and featured Alaska ships.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-caribbean-800 mb-4">Cruise lines</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {cruiseLines.map((line) => (
                  <Link
                    key={line.slug}
                    href={`/alaska-cruise-lines/${line.slug}`}
                    className="card-gradient group flex h-full flex-col p-5 hover:border-caribbean-300"
                  >
                    <NavCardIcon icon="cruise-line" variant="hero" className="mb-3" />
                    <h4 className="font-display font-semibold text-gray-900 group-hover:text-caribbean-700">
                      {line.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2 flex-1">{line.tagline}</p>
                    <NavCardCta className="mt-4">View line guide</NavCardCta>
                  </Link>
                ))}
              </div>
              <Link href="/alaska-cruise-lines" className="btn-secondary text-sm mt-5 inline-flex">
                All cruise lines
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-caribbean-800 mb-4">Featured ships</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {ships.map((ship) => (
                  <Link
                    key={ship.slug}
                    href={`/alaska-cruise-ships/${ship.slug}`}
                    className="card-gradient group flex h-full flex-col p-5 hover:border-caribbean-300"
                  >
                    <NavCardIcon icon="route" variant="hero" className="mb-3" />
                    <h4 className="font-display font-semibold text-gray-900 group-hover:text-caribbean-700">
                      {ship.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2 flex-1">{ship.tagline}</p>
                    <NavCardCta className="mt-4">View ship guide</NavCardCta>
                  </Link>
                ))}
              </div>
              <Link href="/alaska-cruise-ships" className="btn-secondary text-sm mt-5 inline-flex">
                All ships
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Planning guides and comparisons */}
      <section className="section-padding bg-white border-b border-caribbean-100">
        <div className="container-wide">
          <div className="mb-8">
            <p className="section-eyebrow">Decision support</p>
            <h2 className="section-title mt-1">Planning Guides &amp; Comparisons</h2>
            <p className="section-subtitle">Head-to-head port decisions, seasonality, and land-extension planning.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/${comp.slug}`}
                className="card-editorial group flex h-full flex-col p-5 hover:shadow-premium-hover transition-shadow"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600">Port comparison</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-gray-900 group-hover:text-caribbean-700">
                  {comp.portA} vs {comp.portB}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-1">{comp.summary}</p>
                <NavCardCta className="mt-4">Compare ports</NavCardCta>
              </Link>
            ))}
            <Link
              href="/alaska-cruise-with-denali"
              className="card-editorial group flex h-full flex-col p-5 hover:shadow-premium-hover transition-shadow"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600">Land extension</p>
              <h3 className="mt-1 font-display text-lg font-semibold text-gray-900 group-hover:text-caribbean-700">
                Alaska Cruise with Denali
              </h3>
              <p className="mt-2 text-sm text-gray-600 flex-1">Land extension and cruisetour planning.</p>
              <NavCardCta className="mt-4">Read guide</NavCardCta>
            </Link>
            <Link
              href="/best-time-to-cruise-alaska"
              className="card-editorial group flex h-full flex-col p-5 hover:shadow-premium-hover transition-shadow"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-caribbean-600">Seasonality</p>
              <h3 className="mt-1 font-display text-lg font-semibold text-gray-900 group-hover:text-caribbean-700">
                Best Time to Cruise Alaska
              </h3>
              <p className="mt-2 text-sm text-gray-600 flex-1">Seasonality for whales, bears, and weather.</p>
              <NavCardCta className="mt-4">Read guide</NavCardCta>
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
