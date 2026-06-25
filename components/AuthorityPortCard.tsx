import type { Port } from "@/data/types";
import { DestinationHeroBand } from "@/components/DestinationHeroBand";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";
import { SpecialistPartnerCard } from "@/components/SpecialistPartnerCard";

interface AuthorityPortCardProps {
  port: Port;
  description: string;
  bestFor: string;
  /** Homepage uses premium specialist partner cards instead of compact CTA strip. */
  specialistVariant?: "ctas" | "partner-card";
}

export function AuthorityPortCard({
  port,
  description,
  bestFor,
  specialistVariant = "ctas",
}: AuthorityPortCardProps) {
  return (
    <article className="card-editorial flex h-full flex-col">
      <DestinationHeroBand
        imageTheme={port.imageTheme}
        imageAlt={port.imageAlt}
        title={port.name}
        subtitle={port.country}
        eyebrow={bestFor}
        heightClass="h-40 sm:h-44"
        portSlug={port.slug}
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium text-gray-500">Why we recommend it</p>
        <p className="mt-2 text-sm leading-relaxed text-gray-700 flex-1">{description}</p>
        {specialistVariant === "partner-card" ? (
          <div className="mt-5">
            <SpecialistPartnerCard portSlug={port.slug} variant="compact" hidePortGuideLink className="!p-4" />
          </div>
        ) : (
          <ExcursionCardCTAs portSlug={port.slug} sectionHint={port.bestFor} className="mt-6" />
        )}
      </div>
    </article>
  );
}
