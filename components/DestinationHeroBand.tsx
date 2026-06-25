import Image from "next/image";
import type { PortImageTheme } from "@/data/types";
import { getPortHeroImage } from "@/lib/port-hero-images";
import { getThemeStyle } from "@/lib/port-themes";

interface DestinationHeroBandProps {
  imageTheme: PortImageTheme;
  imageAlt: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  heightClass?: string;
  /** Resolve hero from downloaded specialist-site imagery */
  portSlug?: string;
  /** Explicit image override (local path under /public) */
  imageSrc?: string;
  children?: React.ReactNode;
}

/** Image-first destination band — specialist port photo with gradient fallback. */
export function DestinationHeroBand({
  imageTheme,
  imageAlt,
  title,
  subtitle,
  eyebrow,
  heightClass = "h-36 sm:h-40",
  portSlug,
  imageSrc,
  children,
}: DestinationHeroBandProps) {
  const theme = getThemeStyle(imageTheme);
  const portHero = portSlug ? getPortHeroImage(portSlug) : null;
  const photoSrc = imageSrc ?? portHero?.src;
  const photoAlt = portHero?.alt ?? imageAlt;

  return (
    <div className={`relative overflow-hidden ${heightClass} bg-gradient-to-br ${theme.gradient}`}>
      {photoSrc ? (
        <Image
          src={photoSrc}
          alt={photoAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 600px"
        />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,255,255,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/50 to-gray-900/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/45 via-transparent to-transparent" />
      {eyebrow && (
        <div className="absolute left-4 top-4 z-10 sm:left-5 sm:top-5">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wide text-white/95 backdrop-blur-sm">
            {eyebrow}
          </span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5">
        <h3 className="font-display text-xl font-semibold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] sm:text-2xl">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1.5 text-sm font-normal leading-relaxed text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
