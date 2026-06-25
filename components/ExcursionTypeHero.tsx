import Image from "next/image";
import Link from "next/link";
import type { ExcursionType } from "@/data/types";
import { getThemeStyle, excursionTypeImageTheme } from "@/lib/port-themes";
import { ExcursionCardCTAs } from "@/components/ExcursionCardCTAs";

interface ExcursionTypeHeroProps {
  type: ExcursionType;
}

export function ExcursionTypeHero({ type }: ExcursionTypeHeroProps) {
  const hero = type.heroImage ?? type.categoryImage;
  const theme = getThemeStyle(excursionTypeImageTheme(type.name));
  const leadPort = type.bestPorts[0];

  return (
    <section className="relative overflow-hidden text-white">
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} aria-hidden />
      {hero?.src && (
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/70 to-gray-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
      <div className="container-wide relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <p className="section-eyebrow mb-4 text-white/80">Caribbean excursion type</p>
        <h1 className="font-display text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-5xl max-w-3xl drop-shadow-md">
          {type.name}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg drop-shadow-sm">
          {type.tagline}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
          {type.overview.split(". ").slice(0, 2).join(". ")}.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/caribbean-excursion-finder"
            className="btn-primary bg-white text-caribbean-800 hover:bg-caribbean-50 text-sm"
          >
            Match excursions to my cruise
          </Link>
          {leadPort && (
            <ExcursionCardCTAs
              portSlug={leadPort.slug}
              excursionTypeSlug={type.slug}
              variant="on-dark"
              className="mt-0"
            />
          )}
        </div>
      </div>
    </section>
  );
}
