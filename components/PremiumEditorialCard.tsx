import Link from "next/link";
import type { PortImageTheme } from "@/data/types";
import { DestinationHeroBand } from "@/components/DestinationHeroBand";
import { NavCardCta } from "@/components/NavCardCta";

export interface EditorialDetail {
  label: string;
  value: string;
}

interface PremiumEditorialCardProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  imageTheme: PortImageTheme;
  imageLabel?: string;
  details: EditorialDetail[];
  href?: string;
  ctaLabel?: string;
  featured?: boolean;
  className?: string;
  /** Port slug for specialist-site hero photography */
  portSlug?: string;
}

export function PremiumEditorialCard({
  eyebrow,
  title,
  subtitle,
  imageTheme,
  imageLabel,
  details,
  href,
  ctaLabel = "Explore this destination",
  featured = false,
  className = "",
  portSlug,
}: PremiumEditorialCardProps) {
  const heightClass = featured ? "h-44 sm:h-52" : "h-36 sm:h-40";
  const cardClass = href
    ? `card-editorial group flex h-full flex-col ${className}`
    : `card-editorial-static flex h-full flex-col ${className}`;

  const content = (
    <>
      <DestinationHeroBand
        imageTheme={imageTheme}
        imageAlt={imageLabel ?? title}
        title={title}
        subtitle={subtitle}
        eyebrow={eyebrow}
        heightClass={heightClass}
        portSlug={portSlug}
      />

      <div className={`flex flex-1 flex-col ${featured ? "gap-4 p-5 sm:p-6" : "gap-3 p-4 sm:p-5"}`}>
        <dl className="space-y-4">
          {details.map((detail) => (
            <div key={detail.label} className="border-b border-gray-100/90 pb-4 last:border-0 last:pb-0">
              <dt className="text-xs font-medium text-gray-500">{detail.label}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-gray-800">{detail.value}</dd>
            </div>
          ))}
        </dl>
        {href ? <NavCardCta className="pt-2">{ctaLabel}</NavCardCta> : null}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        <article className={cardClass}>{content}</article>
      </Link>
    );
  }

  return <article className={cardClass}>{content}</article>;
}
