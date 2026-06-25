import { getPortBySlug } from "@/data/ports";

/** Alaska cruise ports — specialist outbound links use homepage only unless listed in CONFIRMED_SPECIALIST_DEEP_LINKS. */
export const ALASKA_PORT_SLUGS = [
  "juneau",
  "skagway",
  "ketchikan",
  "ward-cove",
  "icy-strait",
  "sitka",
  "haines",
  "seward",
  "whittier",
  "denali",
] as const;

export type AlaskaPortSlug = (typeof ALASKA_PORT_SLUGS)[number];

/**
 * Confirmed specialist deep links only — do not add paths unless verified on the live site.
 * Format: portSlug → excursionTypeSlug → absolute or root-relative URL.
 */
const CONFIRMED_SPECIALIST_DEEP_LINKS: Record<string, Record<string, string>> = {};

const SPECIALIST_HOMEPAGE_ONLY_PORTS = new Set<string>([
  ...ALASKA_PORT_SLUGS,
  "st-thomas",
  "curacao",
  "costa-maya",
  "bonaire",
  "tortola",
]);

/** Premium outbound CTA copy per Alaska port. */
const SPECIALIST_PARTNER_CTA: Record<string, string> = {
  juneau: "Plan Juneau excursions",
  skagway: "Explore Skagway tours",
  ketchikan: "Visit the Ketchikan guide",
  "ward-cove": "Explore Ward Cove tours",
  "icy-strait": "Plan Icy Strait excursions",
  sitka: "Explore Sitka tours",
  haines: "Plan Haines excursions",
  seward: "Explore Seward tours",
  whittier: "Plan Whittier excursions",
  denali: "Visit the Denali guide",
};

export interface SpecialistPartner {
  portSlug: string;
  portName: string;
  siteName: string;
  homepageUrl: string;
  domain: string;
  ctaLabel: string;
  bestFor: string;
}

export interface SpecialistExcursionUrlInput {
  excursionTypeSlug?: string;
  excursionType?: string;
  sectionHint?: string;
  guideHref?: string;
  text?: string;
}

export function isAlaskaPortSlug(slug: string): slug is AlaskaPortSlug {
  return (ALASKA_PORT_SLUGS as readonly string[]).includes(slug);
}

export function formatSpecialistDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

function normalizeHomepageUrl(url: string): string {
  return url.replace(/\/$/, "");
}

export function getSpecialistPartner(portSlug: string): SpecialistPartner | null {
  const port = getPortBySlug(portSlug);
  if (!port) return null;

  return {
    portSlug,
    portName: port.name,
    siteName: port.specialistName,
    homepageUrl: normalizeHomepageUrl(port.specialistUrl),
    domain: formatSpecialistDomain(port.specialistUrl),
    ctaLabel: getSpecialistPartnerCta(portSlug),
    bestFor: port.bestFor,
  };
}

export function getSpecialistPartnerCta(portSlug: string): string {
  return SPECIALIST_PARTNER_CTA[portSlug] ?? "Book with the local specialist";
}

export function getSpecialistHomeUrl(portSlug: string): string {
  const port = getPortBySlug(portSlug);
  if (!port) return "/ports";
  return normalizeHomepageUrl(port.specialistUrl);
}

function resolveExcursionTypeSlug(_input: SpecialistExcursionUrlInput = {}): string | undefined {
  // Alaska outbound uses homepage-only policy; legacy Caribbean resolution removed from live paths.
  return undefined;
}

export function getSpecialistExcursionUrl(
  portSlug: string,
  input: SpecialistExcursionUrlInput = {},
): string {
  const port = getPortBySlug(portSlug);
  if (!port) return "/ports";

  const typeSlug = input.excursionTypeSlug ?? resolveExcursionTypeSlug(input);
  const confirmed =
    typeSlug && CONFIRMED_SPECIALIST_DEEP_LINKS[portSlug]?.[typeSlug];

  if (confirmed) {
    if (confirmed.startsWith("http")) return confirmed;
    const base = normalizeHomepageUrl(port.specialistUrl);
    return `${base}${confirmed.startsWith("/") ? confirmed : `/${confirmed}`}`;
  }

  if (!typeSlug || SPECIALIST_HOMEPAGE_ONLY_PORTS.has(portSlug)) {
    return normalizeHomepageUrl(port.specialistUrl);
  }

  const base = normalizeHomepageUrl(port.specialistUrl);
  return `${base}/${typeSlug}`;
}

export function excursionTypeSlugFromGuideHref(_guideHref: string): string | undefined {
  return undefined;
}

export function excursionTypeSlugFromSectionTitle(_title: string): string | undefined {
  return undefined;
}
