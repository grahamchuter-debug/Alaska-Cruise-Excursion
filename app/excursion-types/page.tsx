import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { excursionTypes } from "@/data/excursion-types";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, travelGuideSchema } from "@/lib/schema";
import { NavCardCta } from "@/components/NavCardCta";

export const metadata = buildMetadata({
  title: "Alaska Shore Excursion Types",
  description: "Explore Alaska shore excursion categories: whale watching, glacier tours, bear viewing, railways, flightseeing, wildlife cruises, kayaking, fishing, and native culture. Find the best ports for each type.",
  path: "/excursion-types",
  keywords: ["excursion types", "Alaska tours", "shore excursion categories"],
});

export default function ExcursionTypesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Excursion Types", path: "/excursion-types" },
          ]),
          travelGuideSchema({
            title: "Alaska Shore Excursion Types",
            description: "Guide to Alaska shore excursion categories and the best ports for each.",
            path: "/excursion-types",
          }),
        ]}
      />
      <PageHero
        title="Excursion Types"
        subtitle="Find the right shore excursion category for your Alaska port day. Each guide covers what to expect, best ports, and expert tips."
      />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Excursion Types", path: "/excursion-types" },
            ]}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {excursionTypes.map((type) => (
              <Link key={type.slug} href={`/excursion-types/${type.slug}`} className="card-editorial group flex h-full flex-col">
                <h2 className="font-display text-xl font-semibold text-gray-900 transition-colors group-hover:text-caribbean-800">
                  {type.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{type.tagline}</p>
                <p className="mt-4 text-xs font-medium text-gray-500">Best ports for this experience</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {type.bestPorts.slice(0, 3).map((p) => (
                    <span key={p.slug} className="rounded-full border border-caribbean-100 bg-caribbean-50/60 px-2.5 py-0.5 text-xs text-caribbean-900">
                      {p.name}
                    </span>
                  ))}
                </div>
                <NavCardCta className="pt-5">Explore {type.name.toLowerCase()} guide</NavCardCta>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
