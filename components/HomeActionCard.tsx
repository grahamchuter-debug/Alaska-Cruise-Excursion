import Link from "next/link";
import { NavCardIcon, type NavIconKey } from "@/components/NavCardIcon";
import { NavCardCta } from "@/components/NavCardCta";

export interface HomeActionCardProps {
  href: string;
  category: string;
  title: string;
  description: string;
  icon: NavIconKey;
  actionLabel: string;
  variant?: "default" | "hero";
}

export function HomeActionCard({
  href,
  category,
  title,
  description,
  icon,
  actionLabel,
  variant = "default",
}: HomeActionCardProps) {
  if (variant === "hero") {
    return (
      <Link href={href} className="hero-discovery-card group flex h-full flex-col">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-caribbean-700">
          {category}
        </p>
        <div className="mt-3 flex items-start gap-3.5">
          <NavCardIcon icon={icon} variant="hero" className="mt-0.5" />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-semibold leading-snug text-gray-900 sm:text-xl">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-snug text-gray-600">
              {description}
            </p>
          </div>
        </div>
        <NavCardCta className="pt-4">{actionLabel}</NavCardCta>
      </Link>
    );
  }

  return (
    <Link href={href} className="nav-card group flex h-full flex-col">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-caribbean-700/90">
        {category}
      </p>
      <div className="mt-3 flex items-start gap-4">
        <NavCardIcon icon={icon} className="mt-0.5" />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-caribbean-800">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
        </div>
      </div>
      <NavCardCta className="pt-5">{actionLabel}</NavCardCta>
    </Link>
  );
}
