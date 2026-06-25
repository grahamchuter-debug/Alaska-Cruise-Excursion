import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ports } from "@/data/ports";
import { getPortGuideCount } from "@/data/content-inventory";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PortCard } from "@/components/PortCard";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, travelGuideSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Alaska Cruise Port Guides",
  description:
    "Authority guides to Alaska cruise ports with shore excursion recommendations, pier logistics, and passenger tips for every major call.",
  path: "/alaska-cruise-port-guides",
  keywords: ["Alaska cruise ports", "Alaska port guides", "Alaska shore excursions"],
});

export default function AlaskaCruisePortGuidesPage() {
  const portCount = getPortGuideCount();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Alaska Port Guides", path: "/alaska-cruise-port-guides" },
          ]),
          travelGuideSchema({
            title: "Alaska Cruise Port Guides",
            description: "Comprehensive guides to Alaska cruise ports and shore excursions.",
            path: "/alaska-cruise-port-guides",
          }),
        ]}
      />
      <PageHero
        title="Alaska Cruise Port Guides"
        subtitle={`${portCount} authority port guides with excursion picks, logistics, and links to local specialists.`}
      />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Alaska Port Guides", path: "/alaska-cruise-port-guides" },
            ]}
          />

          <div className="mb-8 flex flex-wrap gap-3">
            <Link href="/ports" className="btn-primary text-sm">
              Browse all port guides
            </Link>
            <Link href="/alaska-cruise-excursion-planner" className="btn-secondary text-sm">
              Alaska Excursion Finder
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ports.slice(0, 9).map((port) => (
              <PortCard key={port.slug} port={port} />
            ))}
          </div>

          <Link href="/ports" className="mt-8 inline-flex text-sm font-medium text-caribbean-700 hover:underline">
            View all {portCount} Alaska port guides →
          </Link>
        </div>
      </section>
    </>
  );
}
