import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getShipBySlug, getAllShipSlugs } from "@/data/ships";
import { getCruiseLineBySlug } from "@/data/cruise-lines";
import { PageHero } from "@/components/PageHero";
import { ShipPageView } from "@/components/ShipPageView";

export function generateStaticParams() {
  return getAllShipSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const ship = getShipBySlug(slug);
    if (!ship) return {};
    const line = getCruiseLineBySlug(ship.cruiseLineSlug);
    return buildMetadata({
      title: ship.seoTitle,
      description: ship.metaDescription,
      path: `/alaska-cruise-ships/${slug}`,
      keywords: [
        ship.name,
        `${ship.name} Alaska`,
        `${ship.name} shore excursions`,
        line?.name ?? "",
        "Alaska cruise ship",
      ].filter(Boolean),
    });
  });
}

export default async function AlaskaShipPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ship = getShipBySlug(slug);
  if (!ship) notFound();

  return (
    <>
      <PageHero title={ship.name} subtitle={ship.tagline} compact />
      <ShipPageView ship={ship} />
    </>
  );
}
