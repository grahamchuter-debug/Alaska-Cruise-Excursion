import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { AlaskaExcursionFinderWithRoute } from "@/components/AlaskaExcursionFinderWithRoute";
import { AlaskaWildlifeSeasonCalendar } from "@/components/AlaskaWildlifeSeasonCalendar";
import { BookingJourneyPanel } from "@/components/BookingJourneyPanel";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import { finderFaqs, getPortComparisonRows, portDayMistakes } from "@/data/excursion-finder";
import { getPortBySlug } from "@/data/ports";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Alaska Excursion Finder | Activity-Led Shore Excursion Plan",
  description:
    "Activity-led Alaska cruise excursion finder. Choose whales, bears, glaciers, railways, and more — get recommended ports, seasons, authority guides, and specialist sites for May–September cruises.",
  path: "/alaska-cruise-excursion-planner",
  keywords: [
    "Alaska excursion finder",
    "Alaska cruise shore excursions",
    "Alaska cruise planner",
    "port day planner",
  ],
});

export default function AlaskaExcursionPlannerPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Alaska Excursion Finder", path: "/alaska-cruise-excursion-planner" },
  ];

  const comparisonRows = getPortComparisonRows();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(finderFaqs),
          travelGuideSchema({
            title: "Alaska Excursion Finder",
            description:
              "Personalised Alaska shore excursion recommendations with Cruise Match scores and return-to-ship confidence.",
            path: "/alaska-cruise-excursion-planner",
          }),
        ]}
      />

      <PageHero
        title="Alaska Excursion Finder™"
        subtitle="Activity-led planning for May through September Alaska cruises — choose your interests first, then get recommended ports, excursion types, seasons, authority guides, and local specialist sites."
      />

      <section className="section-padding">
        <div className="container-wide max-w-6xl">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mb-12">
            <AlaskaExcursionFinderWithRoute />
          </div>

          <div className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl">How the finder works</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Choose what you want to do — whales, bears, glaciers, railways, flightseeing, and more. Add your sailing
              month if you know it. Ports are optional: the finder recommends the best Alaska ports for each interest,
              links to excursion type guides and authority rankings, and surfaces vetted local specialist sites.
            </p>
            <p className="mt-3 text-sm text-gray-500">
              This is a personalised planning tool for cruise passengers, not a live AI booking engine. Always confirm
              excursion duration and all-aboard times with your operator and cruise line.
            </p>
          </div>

          <AlaskaWildlifeSeasonCalendar />

          <div className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl">Compare Alaska Cruise Ports</h2>
            <p className="section-subtitle mb-6">
              Side by side planning for headline Alaska ports, then jump to authority guides or local booking sites.
            </p>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-caribbean-50">
                    <th className="px-4 py-3 font-semibold text-gray-900">Port</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Best for</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Top excursion</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Time needed</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Activity</th>
                    <th className="px-4 py-3 font-semibold text-gray-900">Next steps</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.portSlug} className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        <Link href={`/ports/${row.portSlug}`} className="text-caribbean-700 hover:underline">
                          {row.portName}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{row.bestFor}</td>
                      <td className="px-4 py-3 text-gray-600">{row.topExcursion}</td>
                      <td className="px-4 py-3 text-gray-600">{row.duration}</td>
                      <td className="px-4 py-3 text-gray-600">{row.activityLevel}</td>
                      <td className="px-4 py-3">
                        <ExcursionCardCTAs portSlug={row.portSlug} className="mt-0" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-4 md:hidden">
              {comparisonRows.map((row) => (
                <div key={row.portSlug} className="card-gradient">
                  <h3 className="font-semibold text-gray-900">
                    <Link href={`/ports/${row.portSlug}`} className="text-caribbean-700 hover:underline">
                      {row.portName}
                    </Link>
                  </h3>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div>
                      <dt className="font-medium text-gray-700">Best for</dt>
                      <dd className="text-gray-600">{row.bestFor}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700">Top excursion</dt>
                      <dd className="text-gray-600">{row.topExcursion}</dd>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <dt className="font-medium text-gray-700">Time</dt>
                        <dd className="text-gray-600">{row.duration}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-700">Activity</dt>
                        <dd className="text-gray-600">{row.activityLevel}</dd>
                      </div>
                    </div>
                  </dl>
                  <ExcursionCardCTAs portSlug={row.portSlug} className="mt-4" />
                </div>
              ))}
            </div>
            <Link href="/ports" className="mt-6 inline-flex text-sm font-medium text-caribbean-700 hover:underline">
              View all Alaska ports →
            </Link>
          </div>

          <div className="mb-12">
            <h2 className="section-title text-2xl sm:text-3xl">Don&apos;t Waste Your Alaska Port Day</h2>
            <p className="section-subtitle mb-8">
              Common cruise-day mistakes at popular Alaska ports, and the better excursion choices that deliver real
              payoff.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {portDayMistakes.map((tip) => {
                const port = getPortBySlug(tip.portSlug);
                return (
                  <div key={tip.portSlug} className="card-gradient">
                    <h3 className="font-display text-lg font-bold text-gray-900">{port?.name ?? tip.portSlug}</h3>
                    <p className="mt-3 text-sm text-gray-700">
                      <span className="font-semibold text-rose-700">Avoid:</span> {tip.mistake}
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                      <span className="font-semibold text-emerald-700">Better:</span> {tip.better}
                    </p>
                    {port && <ExcursionCardCTAs portSlug={tip.portSlug} className="mt-4" />}
                  </div>
                );
              })}
            </div>
          </div>

          <BookingJourneyPanel
            title="Turn your finder results into bookings"
            description="After you generate a plan, use activity recommendations and port cards to open excursion guides, authority pages, and local specialist sites."
          />

          <FAQSection faqs={finderFaqs} title="Alaska Excursion Finder FAQs" />
        </div>
      </section>
    </>
  );
}
