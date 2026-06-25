import { bestGuides } from "@/data/best-guides";
import { excursionTypes } from "@/data/excursion-types";
import { portExcursionAuthority } from "@/data/port-excursion-authority";
import { getPortBySlug } from "@/data/ports";
import type {
  ExcursionType,
  ExcursionTypeLink,
  ExcursionTypePortRecommendation,
  ExcursionTypeSpecialistSite,
  PortExcursionCategoryPick,
} from "@/data/types";
import { getSpecialistExcursionUrl } from "@/lib/specialist-links";

function groupPicksByPort(
  picks: PortExcursionCategoryPick[],
  maxPorts = 6,
): ExcursionTypePortRecommendation[] {
  const order: string[] = [];
  const byPort = new Map<string, string[]>();

  for (const pick of picks) {
    if (!byPort.has(pick.portSlug)) order.push(pick.portSlug);
    const list = byPort.get(pick.portSlug) ?? [];
    if (!list.includes(pick.excursionName)) list.push(pick.excursionName);
    byPort.set(pick.portSlug, list);
  }

  return order.slice(0, maxPorts).map((portSlug) => ({
    portSlug,
    portName: getPortBySlug(portSlug)?.name ?? portSlug,
    excursions: (byPort.get(portSlug) ?? []).slice(0, 2),
  }));
}

function specialistSitesForPorts(
  portSlugs: string[],
  excursionTypeSlug: string,
): ExcursionTypeSpecialistSite[] {
  return portSlugs
    .map((portSlug) => {
      const port = getPortBySlug(portSlug);
      if (!port) return null;
      const siteUrl = getSpecialistExcursionUrl(portSlug, { excursionTypeSlug });
      const hostname = port.specialistUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
      return {
        portSlug,
        portName: port.name,
        siteLabel: hostname,
        siteUrl,
      };
    })
    .filter((row): row is ExcursionTypeSpecialistSite => row !== null);
}

function guideLink(slug: string): ExcursionTypeLink | undefined {
  const guide = bestGuides.find((g) => g.slug === slug);
  if (!guide) return undefined;
  return {
    href: `/${slug}`,
    label: guide.title,
    description: guide.heroSubtitle,
  };
}

function portAuthorityLink(slug: string, label?: string): ExcursionTypeLink {
  const port = getPortBySlug(slug);
  return {
    href: `/ports/${slug}`,
    label: label ?? (port ? `${port.name} port guide` : slug),
    description: port?.bestFor,
  };
}

const CULTURE_PORT_PICKS: PortExcursionCategoryPick[] = [
  {
    portSlug: "costa-maya",
    excursionName: "Chacchoben Mayan Ruins",
    description: "Jungle pyramids with manageable coach time from the Costa Maya cruise village.",
  },
  {
    portSlug: "progreso",
    excursionName: "Mérida Colonial City Tour",
    description: "Plazas, cathedral, and Yucatecan cuisine from Progreso's mainland gateway.",
  },
  {
    portSlug: "curacao",
    excursionName: "Willemstad Walking & Hato Caves",
    description: "Pastel Dutch architecture paired with limestone cave geology.",
  },
  {
    portSlug: "puerto-plata",
    excursionName: "Teleférico & Victorian Highlights",
    description: "Cable car ascent and Amber Coast heritage in one port day.",
  },
  {
    portSlug: "falmouth",
    excursionName: "Martha Brae River Rafting",
    description: "Heritage bamboo rafting on Jamaica's scenic river corridor.",
  },
  {
    portSlug: "cozumel",
    excursionName: "Tulum Coastal Ruins",
    description: "Clifftop Mayan ruins with Caribbean views via mainland transfer.",
  },
];

const HERO_IMAGES: Record<string, { src: string; alt: string }> = {
  beaches: { src: "/images/ports/aruba.png", alt: "White sand Caribbean beach with turquoise water" },
  snorkeling: { src: "/images/ports/cozumel.png", alt: "Snorkeller above Caribbean reef" },
  "family-tours": { src: "/images/ports/nassau.png", alt: "Family-friendly Caribbean port day" },
  "private-tours": { src: "/images/ports/st-thomas.jpg", alt: "Private tour at Caribbean cruise port" },
  "catamaran-cruises": { src: "/images/ports/st-maarten.png", alt: "Catamaran sailing Caribbean waters" },
  "adventure-tours": { src: "/images/ports/ocho-rios.jpg", alt: "Caribbean waterfall adventure excursion" },
  wildlife: { src: "/images/ports/grand-cayman.png", alt: "Caribbean marine wildlife encounter" },
  culture: { src: "/images/ports/costa-maya.jpg", alt: "Mayan ruins and Caribbean culture tour" },
};

const ADVENTURE_PORT_PICKS: PortExcursionCategoryPick[] = [
  {
    portSlug: "ocho-rios",
    excursionName: "Dunn's River Falls Climb",
    description: "Jamaica's iconic waterfall climb with guided human-chain ascent.",
  },
  {
    portSlug: "puerto-plata",
    excursionName: "27 Charcos Waterfalls",
    description: "Amber Coast adventure through jungle waterfall pools.",
  },
  {
    portSlug: "aruba",
    excursionName: "Arikok National Park 4x4",
    description: "Off-road desert and coastline exploration to Natural Pool.",
  },
  {
    portSlug: "roatan",
    excursionName: "Gumbalimba Park Adventure",
    description: "Zip-lines, wildlife, and rainforest canopy routes.",
  },
  {
    portSlug: "costa-maya",
    excursionName: "Chacchoben Mayan Ruins",
    description: "Jungle pyramids with manageable transfers from the cruise village.",
  },
  {
    portSlug: "curacao",
    excursionName: "Hato Caves & City Highlights",
    description: "Culture and geology combo in Willemstad's historic districts.",
  },
];

const CATAMARAN_PICKS: PortExcursionCategoryPick[] = [
  {
    portSlug: "st-thomas",
    excursionName: "St. John Snorkel Sail",
    description: "Open-bar catamaran to outer cays with reef stops.",
  },
  {
    portSlug: "cozumel",
    excursionName: "El Cielo Sandbar Catamaran",
    description: "Starfish shallows and reef snorkel with open bar.",
  },
  {
    portSlug: "st-maarten",
    excursionName: "Tintamarre Islet Sail",
    description: "Uninhabited snorkel and beach stop off the Dutch coast.",
  },
  {
    portSlug: "aruba",
    excursionName: "Sunset Catamaran Cruise",
    description: "Trade-wind evening sail along the leeward coast.",
  },
  {
    portSlug: "nassau",
    excursionName: "Rose Island Reef Sail",
    description: "Half-day catamaran with reef snorkel near Nassau harbor.",
  },
  {
    portSlug: "tortola",
    excursionName: "BVI Catamaran Snorkel Sail",
    description: "Norman Island caves and secluded cove sailing.",
  },
  {
    portSlug: "la-romana",
    excursionName: "Saona Island Catamaran",
    description: "National park beaches with natural pool and lunch included.",
  },
];

const FAMILY_PORT_OVERRIDES: ExcursionTypePortRecommendation[] = [
  {
    portSlug: "st-thomas",
    portName: "St. Thomas",
    excursions: ["Magens Bay Family Beach Day", "Coral World Turtle & Reef Encounter"],
  },
  {
    portSlug: "cozumel",
    portName: "Cozumel",
    excursions: ["Chankanaab Family Day", "Dolphin Lagoon Program"],
  },
  {
    portSlug: "grand-cayman",
    portName: "Grand Cayman",
    excursions: ["Stingray City Family Tour", "Turtle Centre & Beach Combo"],
  },
  {
    portSlug: "nassau",
    portName: "Nassau",
    excursions: ["Atlantis Aquaventure", "Blue Lagoon Island Day"],
  },
  {
    portSlug: "aruba",
    portName: "Aruba",
    excursions: ["De Palm Island All-Inclusive", "Baby Beach Shallow Lagoon"],
  },
];

type PathwayConfig = {
  picks: PortExcursionCategoryPick[];
  recommendedByPort?: ExcursionTypePortRecommendation[];
  authoritySectionTitle: string;
  authorityGuideSlug: string;
  specialistSectionTitle: string;
  extraAuthorityLinks?: ExcursionTypeLink[];
  extraBookingLinks?: ExcursionTypeLink[];
  categoryImageAlt: string;
  heroImage?: { src: string; alt: string };
};

const PATHWAY_CONFIG: Record<string, PathwayConfig> = {
  beaches: {
    picks: portExcursionAuthority.bestBeachExcursions,
    authoritySectionTitle: "Best Caribbean Ports For Beach Days",
    authorityGuideSlug: "best-caribbean-beach-excursions",
    specialistSectionTitle: "Beach Shore Excursion Sites",
    categoryImageAlt: "Turquoise Caribbean beach with cruise passengers on shore",
    extraAuthorityLinks: [
      { href: "/western-caribbean-cruise-planner", label: "Western Caribbean cruise planner" },
      { href: "/eastern-caribbean-cruise-planner", label: "Eastern Caribbean cruise planner" },
    ],
  },
  snorkeling: {
    picks: portExcursionAuthority.bestSnorkellingExcursions,
    authoritySectionTitle: "Best Caribbean Ports For Snorkelling",
    authorityGuideSlug: "best-caribbean-snorkeling-excursions",
    specialistSectionTitle: "Snorkelling Shore Excursion Sites",
    categoryImageAlt: "Snorkeller above Caribbean reef coral",
    extraAuthorityLinks: [
      { href: "/western-caribbean-cruise-planner", label: "Western Caribbean cruise planner" },
      { href: "/best-shore-excursion-every-caribbean-port", label: "Best excursion at every port" },
    ],
  },
  "family-tours": {
    picks: portExcursionAuthority.bestFamilyExcursions,
    recommendedByPort: FAMILY_PORT_OVERRIDES,
    authoritySectionTitle: "Best Caribbean Ports For Families",
    authorityGuideSlug: "best-caribbean-family-excursions",
    specialistSectionTitle: "Family-Friendly Shore Excursion Sites",
    categoryImageAlt: "Family enjoying calm Caribbean beach on cruise port day",
    extraAuthorityLinks: [
      { href: "/bahamas-cruise-planner", label: "Bahamas cruise planner" },
      { href: "/caribbean-excursion-finder", label: "Caribbean Excursion Finder" },
    ],
  },
  "private-tours": {
    picks: portExcursionAuthority.bestPrivateExcursions,
    authoritySectionTitle: "Best Caribbean Ports For Private Tours",
    authorityGuideSlug: "best-caribbean-private-tours",
    specialistSectionTitle: "Private Tour Specialist Sites",
    categoryImageAlt: "Private tour vehicle at Caribbean cruise port",
    extraAuthorityLinks: [
      { href: "/southern-caribbean-cruise-planner", label: "Southern Caribbean cruise planner" },
      { href: "/virgin-islands-cruise-planner", label: "Virgin Islands cruise planner" },
    ],
  },
  "catamaran-cruises": {
    picks: CATAMARAN_PICKS,
    authoritySectionTitle: "Best Caribbean Ports For Catamaran Cruises",
    authorityGuideSlug: "best-caribbean-catamaran-cruises",
    specialistSectionTitle: "Catamaran & Sailing Specialist Sites",
    categoryImageAlt: "Catamaran sailing Caribbean turquoise waters",
    extraAuthorityLinks: [
      { href: "/eastern-caribbean-cruise-planner", label: "Eastern Caribbean cruise planner" },
      { href: "/abc-islands-cruise-planner", label: "ABC Islands cruise planner" },
    ],
  },
  "adventure-tours": {
    picks: ADVENTURE_PORT_PICKS,
    authoritySectionTitle: "Best Caribbean Ports For Adventure Tours",
    authorityGuideSlug: "best-caribbean-wildlife-excursions",
    specialistSectionTitle: "Adventure Excursion Specialist Sites",
    categoryImageAlt: "Caribbean rainforest waterfall adventure excursion",
    extraAuthorityLinks: [
      { href: "/jamaica-cruise-planner", label: "Jamaica cruise planner" },
      { href: "/dominican-republic-cruise-planner", label: "Dominican Republic cruise planner" },
    ],
    extraBookingLinks: [
      {
        href: "/best-caribbean-shore-excursions",
        label: "Best Caribbean shore excursions hub",
        description: "Compare signature picks across every port",
      },
    ],
  },
  wildlife: {
    picks: portExcursionAuthority.bestWildlifeExcursions,
    authoritySectionTitle: "Best Caribbean Ports For Wildlife Excursions",
    authorityGuideSlug: "best-caribbean-wildlife-excursions",
    specialistSectionTitle: "Wildlife Excursion Specialist Sites",
    categoryImageAlt: "Stingray and reef wildlife in Caribbean waters",
    extraAuthorityLinks: [
      { href: "/western-caribbean-cruise-planner", label: "Western Caribbean cruise planner" },
      { href: "/jamaica-cruise-planner", label: "Jamaica cruise planner" },
    ],
  },
  culture: {
    picks: CULTURE_PORT_PICKS,
    authoritySectionTitle: "Best Caribbean Ports For Culture & Sightseeing",
    authorityGuideSlug: "best-shore-excursion-every-caribbean-port",
    specialistSectionTitle: "Culture & Sightseeing Specialist Sites",
    categoryImageAlt: "Colonial architecture and Mayan heritage in the Caribbean",
    extraAuthorityLinks: [
      { href: "/mexican-caribbean-cruise-planner", label: "Mexican Caribbean cruise planner" },
      { href: "/southern-caribbean-cruise-planner", label: "Southern Caribbean cruise planner" },
      { href: "/jamaica-cruise-planner", label: "Jamaica cruise planner" },
    ],
    extraBookingLinks: [
      {
        href: "/best-caribbean-shore-excursions",
        label: "Best excursion at every port",
        description: "Culture and heritage highlights across all nineteen ports",
      },
    ],
  },
};

function buildBookingPathways(
  slug: string,
  config: PathwayConfig,
  portSlugs: string[],
): ExcursionTypeLink[] {
  const guide = guideLink(config.authorityGuideSlug);
  const links: ExcursionTypeLink[] = [
    {
      href: "/caribbean-excursion-finder",
      label: "Caribbean Excursion Finder",
      description: "Match excursions to your ports and traveller style",
    },
    ...(guide ? [guide] : []),
    {
      href: "/best-shore-excursion-every-caribbean-port",
      label: "Best excursion at every Caribbean port",
      description: "Signature pick for all nineteen ports we cover",
    },
    ...portSlugs.slice(0, 3).map((portSlug) => portAuthorityLink(portSlug)),
    {
      href: `/ship-schedules/${portSlugs[0] ?? "cozumel"}`,
      label: "Check ship schedules",
      description: "See how many ships share your port day before booking",
    },
    ...(config.extraAuthorityLinks ?? []),
    ...(config.extraBookingLinks ?? []),
    { href: "/excursion-types", label: "All excursion types" },
  ];

  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function enrichExcursionType(base: ExcursionType): ExcursionType {
  const config = PATHWAY_CONFIG[base.slug];
  if (!config) return base;

  const recommendedByPort =
    config.recommendedByPort ?? groupPicksByPort(config.picks);
  const portSlugs = recommendedByPort.map((row) => row.portSlug);
  const guide = guideLink(config.authorityGuideSlug);

  const authorityLinks: ExcursionTypeLink[] = [
    ...(guide ? [guide] : []),
    ...base.bestPorts.map((port) => ({
      href: `/ports/${port.slug}`,
      label: port.name,
      description: port.reason,
    })),
    ...(config.extraAuthorityLinks ?? []),
  ];

  const specialistSites = specialistSitesForPorts(portSlugs.slice(0, 6), base.slug);

  const bookingPathways = buildBookingPathways(base.slug, config, portSlugs);

  return {
    ...base,
    recommendedByPort,
    authoritySectionTitle: config.authoritySectionTitle,
    authorityLinks,
    specialistSectionTitle: config.specialistSectionTitle,
    specialistSites,
    bookingPathways,
    heroImage: base.heroImage ?? config.heroImage ?? HERO_IMAGES[base.slug] ?? {
      src: "/images/caribbean-cruise-hero.png",
      alt: `${base.name} in the Caribbean`,
    },
    categoryImage: base.categoryImage ?? config.heroImage ?? HERO_IMAGES[base.slug] ?? {
      src: "/images/caribbean-cruise-hero.png",
      alt: config.categoryImageAlt,
    },
  };
}

export function getEnrichedExcursionType(slug: string): ExcursionType | undefined {
  const base = excursionTypes.find((type) => type.slug === slug);
  if (!base) return undefined;
  return enrichExcursionType(base);
}

export interface ExcursionTypeAuditRow {
  slug: string;
  name: string;
  pathwayCount: number;
  specialistSiteCount: number;
  bookingLinkCount: number;
  hasHeroImage: boolean;
  hasCategoryImage: boolean;
  issues: string[];
}

export function auditExcursionTypes(): ExcursionTypeAuditRow[] {
  return excursionTypes.map((base) => {
    const type = enrichExcursionType(base);
    const issues: string[] = [];
    const pathwayCount = type.recommendedByPort?.length ?? 0;
    const specialistSiteCount = type.specialistSites?.length ?? 0;
    const bookingLinkCount = type.bookingPathways?.length ?? 0;

    if (pathwayCount < 5) issues.push(`Only ${pathwayCount} port excursion pathways (need 5+)`);
    if (specialistSiteCount < 3) issues.push(`Only ${specialistSiteCount} specialist sites linked`);
    if (bookingLinkCount < 5) issues.push(`Only ${bookingLinkCount} booking journey links`);

    const portsWithoutSpecialist = (type.recommendedByPort ?? []).filter(
      (row) => !getPortBySlug(row.portSlug)?.specialistUrl,
    );
    if (portsWithoutSpecialist.length > 0) {
      issues.push(
        `Ports without specialist URL: ${portsWithoutSpecialist.map((p) => p.portName).join(", ")}`,
      );
    }

    return {
      slug: type.slug,
      name: type.name,
      pathwayCount,
      specialistSiteCount,
      bookingLinkCount,
      hasHeroImage: Boolean(type.heroImage?.src),
      hasCategoryImage: Boolean(type.categoryImage?.src),
      issues,
    };
  });
}

/** Legacy note: wildlife and culture now have dedicated excursion-type routes. */
export const NON_EXISTENT_EXCURSION_TYPE_PAGES: { label: string; note: string }[] = [];
