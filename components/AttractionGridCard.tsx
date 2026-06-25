import Link from "next/link";
import { NavCardCta } from "@/components/NavCardCta";
import type { Attraction } from "@/data/types";
import type { AttractionDestination } from "@/lib/attraction-links";

interface AttractionGridCardProps {
  attraction: Attraction;
  destination: AttractionDestination;
  compact?: boolean;
}

export function AttractionGridCard({ attraction, destination, compact = false }: AttractionGridCardProps) {
  const cardClass = compact
    ? "rounded-lg border border-gray-100 bg-white p-4 group flex h-full flex-col hover:border-caribbean-200"
    : "card group flex h-full flex-col hover:border-caribbean-200";

  const titleClass = compact ? "font-semibold text-gray-900 text-sm" : "font-semibold text-gray-900";
  const descriptionClass = compact
    ? "mt-1 text-sm text-gray-600 line-clamp-2"
    : "mt-2 text-sm text-gray-600 leading-relaxed";
  const ctaClass = compact ? "mt-3" : "mt-4";

  const body = (
    <>
      <h3 className={titleClass}>{attraction.name}</h3>
      <p className={descriptionClass}>{attraction.description}</p>
      <p className="mt-2 text-xs font-medium text-caribbean-700">{attraction.distance}</p>
      <NavCardCta className={ctaClass}>{destination.label}</NavCardCta>
    </>
  );

  if (destination.external) {
    return (
      <a
        href={destination.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={destination.href} className={cardClass}>
      {body}
    </Link>
  );
}
