import type { ComponentProps } from "react";
import type {
  FinderBestPortHighlight,
  FinderExcursionTypeHighlight,
  FinderHiddenGemHighlight,
} from "@/lib/excursion-finder-engine";
import { PremiumEditorialCard } from "@/components/PremiumEditorialCard";
import { EXCURSION_THEME_HERO_PORT } from "@/lib/port-hero-images";
import { getExcursionTypeSlugByLabel } from "@/lib/excursion-type-lookup";

interface FinderResultHighlightsProps {
  bestPort: FinderBestPortHighlight | null;
  bestExcursionType: FinderExcursionTypeHighlight | null;
  hiddenGem: FinderHiddenGemHighlight | null;
}

export function FinderResultHighlights({
  bestPort,
  bestExcursionType,
  hiddenGem,
}: FinderResultHighlightsProps) {
  const cards = [
    bestPort
      ? {
          key: "best-port",
          featured: true,
          props: {
            eyebrow: "Best Port",
            title: bestPort.name,
            subtitle: bestPort.excursion,
            imageTheme: bestPort.imageTheme,
            imageLabel: `${bestPort.name} cruise port`,
            href: `/ports/${bestPort.slug}`,
            ctaLabel: "View port guide",
            portSlug: bestPort.slug,
            details: [
              { label: "Why we recommend it", value: bestPort.whyItStandsOut },
              { label: "Best excursion", value: bestPort.excursion },
              { label: "Cruise passenger fit", value: bestPort.cruisePassengerFit },
            ],
          },
        }
      : null,
    bestExcursionType
      ? {
          key: "excursion-type",
          featured: false,
          props: {
            eyebrow: "Top Excursion Type",
            title: bestExcursionType.type,
            imageTheme: bestExcursionType.imageTheme,
            imageLabel: `${bestExcursionType.type} excursions`,
            href: (() => {
              const slug = getExcursionTypeSlugByLabel(bestExcursionType.type);
              return slug ? `/excursion-types/${slug}` : undefined;
            })(),
            ctaLabel: "View excursion type",
            portSlug: EXCURSION_THEME_HERO_PORT[bestExcursionType.imageTheme],
            details: [
              { label: "Why passengers love it", value: bestExcursionType.whyPassengersLoveIt },
              { label: "Typical duration", value: bestExcursionType.typicalDuration },
              { label: "Best traveller type", value: bestExcursionType.bestTravellerType },
            ],
          },
        }
      : null,
    hiddenGem
      ? {
          key: "hidden-gem",
          featured: false,
          props: {
            eyebrow: "Hidden Gem",
            title: hiddenGem.name,
            subtitle: hiddenGem.excursion,
            imageTheme: hiddenGem.imageTheme,
            imageLabel: `${hiddenGem.name} hidden gem port`,
            href: `/ports/${hiddenGem.slug}`,
            ctaLabel: "View port guide",
            portSlug: hiddenGem.slug,
            details: [
              { label: "Why most cruisers miss it", value: hiddenGem.whyMostMissIt },
              { label: "What makes it special", value: hiddenGem.whatMakesSpecial },
            ],
          },
        }
      : null,
  ].filter(Boolean) as {
    key: string;
    featured: boolean;
    props: ComponentProps<typeof PremiumEditorialCard>;
  }[];

  if (cards.length === 0) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      {cards.map((card) => (
        <div
          key={card.key}
          className={card.featured ? "lg:col-span-6" : "lg:col-span-3"}
        >
          <PremiumEditorialCard {...card.props} featured={card.featured} className="h-full" />
        </div>
      ))}
    </div>
  );
}
