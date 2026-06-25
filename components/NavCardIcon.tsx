import type { ReactNode } from "react";

export type NavIconKey =
  | "ports"
  | "schedules"
  | "finder"
  | "compare"
  | "excursion-type"
  | "cruise-line"
  | "guide"
  | "planner"
  | "route"
  | "beaches"
  | "snorkeling"
  | "private-tours"
  | "family-tours"
  | "catamaran-cruises"
  | "adventure-tours"
  | "wildlife"
  | "culture";

const iconPaths: Record<NavIconKey, ReactNode> = {
  ports: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z"
    />
  ),
  schedules: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M8 7V3m8 4V3M4 11h16M6 5h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z"
    />
  ),
  finder: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
    />
  ),
  compare: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M8 7h8M8 12h5M8 17h8M5 5v14"
    />
  ),
  "excursion-type": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M4 16l4-8 4 4 4-10 4 14"
    />
  ),
  "cruise-line": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M3 17h18l-2-9H5L3 17zm4-9l1-4h8l1 4"
    />
  ),
  guide: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  ),
  planner: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  ),
  route: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M4 6h16M4 12h10M4 18h14"
    />
  ),
  beaches: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M12 3v2m0 14v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M3 12h2m14 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
    />
  ),
  snorkeling: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z"
    />
  ),
  "private-tours": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M8 17h8M6 11h12l1-5H5l1 5zM7 17a2 2 0 104 0M13 17a2 2 0 104 0"
    />
  ),
  "family-tours": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M16 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  ),
  "catamaran-cruises": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M4 14l4-8h8l4 8H4zm2 4h12"
    />
  ),
  "adventure-tours": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  ),
  wildlife: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11zM5 20c0-3.866 3.134-7 7-7s7 3.134 7 7"
    />
  ),
  culture: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M8 21h8M12 17v4M7 4h10l1 13H6L7 4z"
    />
  ),
};

export function NavCardIcon({
  icon,
  className = "",
  variant = "default",
}: {
  icon: NavIconKey;
  className?: string;
  variant?: "default" | "hero";
}) {
  const styles =
    variant === "hero"
      ? "h-12 w-12 rounded-2xl border border-caribbean-200/60 bg-gradient-to-br from-caribbean-50/90 via-white to-tropical-sand/40 text-caribbean-800 shadow-[0_8px_24px_-12px_rgba(0,71,112,0.25)]"
      : "h-11 w-11 rounded-xl border border-caribbean-100 bg-gradient-to-br from-caribbean-50 to-white text-caribbean-700 shadow-sm";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${styles} ${className}`}
      aria-hidden="true"
    >
      <svg className={variant === "hero" ? "h-5 w-5" : "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {iconPaths[icon]}
      </svg>
    </span>
  );
}

export function excursionTypeNavIcon(slug: string): NavIconKey {
  const map: Record<string, NavIconKey> = {
    beaches: "beaches",
    snorkeling: "snorkeling",
    "private-tours": "private-tours",
    "family-tours": "family-tours",
    "catamaran-cruises": "catamaran-cruises",
    "adventure-tours": "adventure-tours",
    wildlife: "wildlife",
    culture: "culture",
  };
  return map[slug] ?? "excursion-type";
}
