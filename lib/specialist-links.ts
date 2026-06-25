import { getPortBySlug } from "@/data/ports";

const VALID_SPECIALIST_CATEGORY_SLUGS = new Set([
  "beaches",
  "snorkeling",
  "private-tours",
  "family-tours",
  "catamaran-cruises",
  "adventure-tours",
]);

/** Specialist sites that only expose a homepage (category paths return 404). */
const SPECIALIST_HOMEPAGE_ONLY_PORTS = new Set([
  "st-thomas",
  "curacao",
  "costa-maya",
  "bonaire",
  "tortola",
]);

const GUIDE_HREF_TO_EXCURSION_TYPE: Record<string, string> = {
  "/best-caribbean-beach-excursions": "beaches",
  "/best-caribbean-snorkeling-excursions": "snorkeling",
  "/best-caribbean-family-excursions": "family-tours",
  "/best-caribbean-private-tours": "private-tours",
  "/best-caribbean-wildlife-excursions": "adventure-tours",
  "/best-caribbean-catamaran-excursions": "catamaran-cruises",
};

const SECTION_HINT_TO_SLUG: Record<string, string> = {
  beaches: "beaches",
  beach: "beaches",
  snorkelling: "snorkeling",
  snorkeling: "snorkeling",
  snorkel: "snorkeling",
  family: "family-tours",
  private: "private-tours",
  wildlife: "adventure-tours",
  culture: "adventure-tours",
  adventure: "adventure-tours",
  catamaran: "catamaran-cruises",
};

/** Excursion type slugs that map to a specialist category path. */
const EXCURSION_TYPE_SPECIALIST_ALIASES: Record<string, string> = {
  wildlife: "adventure-tours",
  culture: "adventure-tours",
};

const TYPE_LABEL_PATTERNS: [RegExp, string][] = [
  [/snorkel/i, "snorkeling"],
  [/beach|sandbar|orient bay|seven mile|eagle beach|magens|west bay/i, "beaches"],
  [/catamaran|sail/i, "catamaran-cruises"],
  [/private|charter|custom/i, "private-tours"],
  [/family|park|aquaventure|dolphin|chankanaab|atlantis/i, "family-tours"],
  [/adventure|atv|zip|ruin|culture|sightseeing|wildlife|stingray|falls|raft/i, "adventure-tours"],
];

export interface SpecialistExcursionUrlInput {
  excursionTypeSlug?: string;
  excursionType?: string;
  sectionHint?: string;
  guideHref?: string;
  text?: string;
}

function normalizeSlug(value: string): string | undefined {
  const trimmed = value.trim().toLowerCase();
  if (VALID_SPECIALIST_CATEGORY_SLUGS.has(trimmed)) return trimmed;
  return SECTION_HINT_TO_SLUG[trimmed];
}

function inferFromText(text: string): string | undefined {
  for (const [pattern, slug] of TYPE_LABEL_PATTERNS) {
    if (pattern.test(text)) return slug;
  }
  return undefined;
}

export function resolveExcursionTypeSlug(input: SpecialistExcursionUrlInput = {}): string | undefined {
  if (input.excursionTypeSlug) {
    const alias = EXCURSION_TYPE_SPECIALIST_ALIASES[input.excursionTypeSlug];
    if (alias) return alias;
    const normalized = normalizeSlug(input.excursionTypeSlug);
    if (normalized) return normalized;
  }

  if (input.guideHref) {
    const fromGuide = GUIDE_HREF_TO_EXCURSION_TYPE[input.guideHref];
    if (fromGuide) return fromGuide;
  }

  if (input.sectionHint) {
    const fromHint = normalizeSlug(input.sectionHint);
    if (fromHint) return fromHint;

    const fromHintText = inferFromText(input.sectionHint);
    if (fromHintText) return fromHintText;
  }

  if (input.excursionType) {
    const fromLabel = normalizeSlug(input.excursionType);
    if (fromLabel) return fromLabel;

    const fromLabelText = inferFromText(input.excursionType);
    if (fromLabelText) return fromLabelText;
  }

  if (input.text) {
    return inferFromText(input.text);
  }

  return undefined;
}

export function getSpecialistExcursionUrl(
  portSlug: string,
  input: SpecialistExcursionUrlInput = {},
): string {
  const port = getPortBySlug(portSlug);
  if (!port) return "/ports";

  const typeSlug = resolveExcursionTypeSlug(input);
  if (!typeSlug || SPECIALIST_HOMEPAGE_ONLY_PORTS.has(portSlug)) {
    return port.specialistUrl;
  }

  const base = port.specialistUrl.replace(/\/$/, "");
  return `${base}/${typeSlug}`;
}

export function excursionTypeSlugFromGuideHref(guideHref: string): string | undefined {
  return GUIDE_HREF_TO_EXCURSION_TYPE[guideHref];
}

export function excursionTypeSlugFromSectionTitle(title: string): string | undefined {
  return resolveExcursionTypeSlug({ sectionHint: title });
}
