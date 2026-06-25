import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { bestGuides } from "@/data/best-guides";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, travelGuideSchema } from "@/lib/schema";
import { NavCardCta } from "@/components/NavCardCta";

export const metadata = buildMetadata({
  title: "Best Alaska Guides | Ranked Port & Excursion Planning",
  description:
    "Authority-ranked Alaska cruise guides: best ports, excursion types, and planning picks with links to port guides, comparisons, and ship schedules.",
  path: "/best-alaska-guides",
  keywords: [
    "best Alaska guides",
    "Alaska cruise ports",
    "Alaska shore excursions",
    "Alaska cruise planning",
  ],
});

export default function BestAlaskaGuidesPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Best Alaska Guides", path: "/best-alaska-guides" },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          travelGuideSchema({
            title: "Best Alaska Guides",
            description: "Ranked Alaska cruise port and excursion planning guides.",
            path: "/best-alaska-guides",
          }),
        ]}
      />
      <PageHero
        title="Best Alaska Guides"
        subtitle="Ranked port and excursion guides for Alaska cruise passengers — linked to authority port pages, comparisons, and ship schedules."
      />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} />

          <p className="max-w-3xl text-gray-700 leading-relaxed mb-10">
            These guides rank Alaska cruise ports and excursion types using authority port research: excursion quality,
            pier logistics, value on a typical port day, and links to trusted local operators.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bestGuides.map((guide) => (
              <Link key={guide.slug} href={`/${guide.slug}`} className="card-gradient group flex h-full flex-col">
                <h2 className="font-display text-xl font-bold text-gray-900 group-hover:text-caribbean-700">
                  {guide.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{guide.metaDescription}</p>
                <NavCardCta className="mt-auto pt-4">Read guide</NavCardCta>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
