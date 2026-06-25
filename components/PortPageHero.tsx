import Image from "next/image";
import type { Port } from "@/data/types";
import { getPortHeroImage } from "@/lib/port-hero-images";
import { getThemeStyle } from "@/lib/port-themes";
import { PageHero } from "@/components/PageHero";

interface PortPageHeroProps {
  port: Port;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

/** Port guide hero — specialist-site photography when available. */
export function PortPageHero({ port, title, subtitle, children }: PortPageHeroProps) {
  const hero = getPortHeroImage(port.slug);
  const theme = getThemeStyle(port.imageTheme);

  if (!hero) {
    return (
      <PageHero title={title} subtitle={subtitle}>
        {children}
      </PageHero>
    );
  }

  return (
    <section className="relative overflow-hidden text-white py-20 sm:py-28">
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} aria-hidden />
      <Image
        src={hero.src}
        alt={hero.alt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/88 via-gray-900/55 to-gray-900/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent" />
      <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
        <p className="section-eyebrow mb-4 text-white/80">{port.region}</p>
        <h1 className="font-display text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-5xl max-w-3xl drop-shadow-md">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg drop-shadow-sm">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
