import { getPortBySlug } from "@/data/ports";

export interface PortHeroImage {
  src: string;
  alt: string;
}

/** Local copies of hero imagery from specialist Alaska port sites. */
const PORT_HERO_LOCAL: Record<string, string> = {
  juneau: "/images/ports/juneau.png",
  skagway: "/images/ports/skagway.png",
  ketchikan: "/images/ports/ketchikan.jpg",
  seward: "/images/ports/seward.png",
  haines: "/images/ports/haines.png",
  whittier: "/images/ports/whittier.png",
  denali: "/images/ports/denali.png",
  sitka: "/images/ports/sitka.jpg",
  "ward-cove": "/images/ports/ward-cove.png",
};

export function getPortHeroImage(portSlug: string): PortHeroImage | null {
  const port = getPortBySlug(portSlug);
  const src = PORT_HERO_LOCAL[portSlug];
  if (!src) return null;
  return {
    src,
    alt: port?.imageAlt ?? `${port?.name ?? portSlug} destination`,
  };
}

/** Representative port hero per excursion visual theme (specialist-site photography). */
export const EXCURSION_THEME_HERO_PORT: Partial<Record<string, string>> = {
  beach: "seward",
  snorkel: "ketchikan",
  rainforest: "ketchikan",
  fortress: "skagway",
  viewpoint: "juneau",
  town: "skagway",
  catamaran: "seward",
  wildlife: "sitka",
};

export function getExcursionThemeHeroImage(theme: string): PortHeroImage | null {
  const portSlug = EXCURSION_THEME_HERO_PORT[theme];
  return portSlug ? getPortHeroImage(portSlug) : null;
}
