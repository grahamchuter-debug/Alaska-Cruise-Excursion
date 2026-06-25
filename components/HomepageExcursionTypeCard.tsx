import Link from "next/link";
import type { ExcursionType } from "@/data/types";
import { DestinationHeroBand } from "@/components/DestinationHeroBand";
import { NavCardCta } from "@/components/NavCardCta";
import { alaskaExcursionTypeTheme } from "@/lib/port-themes";

interface HomepageExcursionTypeCardProps {
  type: ExcursionType;
  label: string;
  heroPortSlug?: string;
}

export function HomepageExcursionTypeCard({ type, label, heroPortSlug }: HomepageExcursionTypeCardProps) {
  const leadPort = type.bestPorts[0];
  const photoPort = heroPortSlug ?? leadPort?.slug;

  return (
    <Link
      href={`/excursion-types/${type.slug}`}
      className="card-editorial group flex h-full flex-col overflow-hidden hover:shadow-premium-hover transition-shadow"
    >
      <DestinationHeroBand
        imageTheme={alaskaExcursionTypeTheme(type.slug)}
        imageAlt={`${label} on an Alaska cruise port day`}
        title={label}
        subtitle={leadPort ? `Best from ${leadPort.name}` : undefined}
        eyebrow="Alaska activity"
        heightClass="h-36 sm:h-40"
        portSlug={photoPort}
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-gray-600 line-clamp-2 flex-1">{type.tagline}</p>
        <NavCardCta className="mt-4">Explore {label}</NavCardCta>
      </div>
    </Link>
  );
}
