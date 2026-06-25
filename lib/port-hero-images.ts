import { getPortBySlug } from "@/data/ports";

export interface PortHeroImage {
  src: string;
  alt: string;
}

/** Local copies of hero imagery from specialist port sites (e.g. cozumelcruiseexcursion.com). */
const PORT_HERO_LOCAL: Record<string, string> = {
  "st-thomas": "/images/ports/st-thomas.jpg",
  cozumel: "/images/ports/cozumel.png",
  aruba: "/images/ports/aruba.png",
  curacao: "/images/ports/curacao.png",
  "grand-cayman": "/images/ports/grand-cayman.png",
  "st-maarten": "/images/ports/st-maarten.png",
  nassau: "/images/ports/nassau.png",
  roatan: "/images/ports/roatan.png",
  "costa-maya": "/images/ports/costa-maya.jpg",
  "puerto-limon": "/images/ports/puerto-limon.png",
  "puerto-plata": "/images/ports/puerto-plata.png",
  "ocho-rios": "/images/ports/ocho-rios.jpg",
  falmouth: "/images/ports/falmouth.jpg",
  bonaire: "/images/ports/bonaire.png",
  tortola: "/images/ports/tortola.jpg",
  progreso: "/images/ports/progreso.png",
  samana: "/images/ports/samana.png",
  "la-romana": "/images/ports/la-romana.png",
  "montego-bay": "/images/ports/montego-bay.jpg",
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
  beach: "aruba",
  snorkel: "cozumel",
  rainforest: "puerto-limon",
  fortress: "progreso",
  viewpoint: "st-maarten",
  town: "curacao",
  catamaran: "st-thomas",
  wildlife: "grand-cayman",
};

export function getExcursionThemeHeroImage(theme: string): PortHeroImage | null {
  const portSlug = EXCURSION_THEME_HERO_PORT[theme];
  return portSlug ? getPortHeroImage(portSlug) : null;
}
