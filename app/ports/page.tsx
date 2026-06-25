import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ports } from "@/data/ports";
import { regions as regionPages } from "@/data/regions";
import { getPortGuideCount } from "@/data/content-inventory";
import { PageHero } from "@/components/PageHero";
import { PortCard } from "@/components/PortCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AuthorityHubLinks } from "@/components/AuthorityHubLinks";
import { NavCardCta } from "@/components/NavCardCta";
import { PortSearch } from "@/components/PortSearch";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, travelGuideSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Alaska Cruise Ports Guide",
  description:
    "Comprehensive guides to Alaska cruise ports including shore excursion recommendations, port information, and passenger tips for every major destination.",
  path: "/ports",
  keywords: ["Alaska cruise ports", "port guides", "shore excursion ports"],
});

export default function PortsPage() {
  const portCount = getPortGuideCount();
  const portRegions = [...new Set(ports.map((p) => p.region))];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Alaska Ports", path: "/ports" },
          ]),
          travelGuideSchema({
            title: "Alaska Cruise Ports Guide",
            description: "Comprehensive guides to Alaska cruise ports and shore excursions.",
            path: "/ports",
          }),
        ]}
      />
      <PageHero
        title="Alaska Cruise Ports"
        subtitle="Explore in-depth guides to Alaska's most popular cruise ports. Compare excursions, read passenger tips, and connect with local specialists."
      />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Alaska Ports", path: "/ports" },
            ]}
          />

          <section className="mb-12">
            <PortSearch variant="page" syncQueryFromUrl />
          </section>

          <section className="mb-12 rounded-xl border border-caribbean-100 bg-caribbean-50/40 p-6">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-2">
              All {portCount} Alaska Cruise Ports
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              Every port below has an authority guide, specialist local excursion website, related port links, and a Detailed Local Guide section.
            </p>
            <div className="flex flex-wrap gap-2">
              {ports.map((port) => (
                <Link
                  key={port.slug}
                  href={`/ports/${port.slug}`}
                  className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-caribbean-700 border border-caribbean-100 hover:border-caribbean-300"
                >
                  {port.name}
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="section-title text-2xl mb-6">Browse by Alaska Region</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {regionPages.map((region) => (
                <Link key={region.slug} href={`/${region.slug}`} className="card-gradient group flex h-full flex-col">
                  <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-caribbean-700">
                    {region.title.replace(" Guide", "")}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{region.heroSubtitle}</p>
                  <NavCardCta className="pt-4">View {region.title.replace(" Guide", "")} guide</NavCardCta>
                </Link>
              ))}
            </div>
          </section>

          {portRegions.map((region) => (
            <div key={region} className="mb-12">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">{region}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {ports
                  .filter((p) => p.region === region)
                  .map((port) => (
                    <PortCard key={port.slug} port={port} />
                  ))}
              </div>
            </div>
          ))}

          <div className="mt-8">
            <AuthorityHubLinks current="ports" />
          </div>
        </div>
      </section>
    </>
  );
}
