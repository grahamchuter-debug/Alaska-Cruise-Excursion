import type { PortRelatedLink } from "./types";
import { getPortBySlug } from "./ports";
import { getBestScheduleUrl } from "@/lib/schedule-cta-url";

/** 2-4 related Caribbean port slugs for cross-linking on each authority page. */
const relatedPortSlugs: Record<string, string[]> = {
  "st-thomas": ["st-maarten", "tortola", "nassau", "puerto-plata"],
  cozumel: ["costa-maya", "progreso", "roatan", "puerto-limon"],
  aruba: ["curacao", "bonaire", "st-maarten", "cozumel"],
  curacao: ["aruba", "bonaire", "st-maarten", "cozumel"],
  bonaire: ["aruba", "curacao", "st-maarten", "cozumel"],
  "grand-cayman": ["cozumel", "nassau", "roatan", "costa-maya"],
  nassau: ["grand-cayman", "st-thomas", "cozumel", "st-maarten"],
  roatan: ["cozumel", "costa-maya", "puerto-limon", "grand-cayman"],
  "st-maarten": ["st-thomas", "tortola", "aruba", "puerto-plata"],
  tortola: ["st-thomas", "st-maarten", "nassau", "puerto-plata"],
  "costa-maya": ["cozumel", "progreso", "roatan", "puerto-limon"],
  progreso: ["cozumel", "costa-maya", "roatan", "puerto-limon"],
  "puerto-limon": ["roatan", "costa-maya", "cozumel", "ocho-rios"],
  "puerto-plata": ["samana", "la-romana", "st-maarten", "st-thomas"],
  samana: ["puerto-plata", "la-romana", "st-maarten", "st-thomas"],
  "la-romana": ["puerto-plata", "samana", "st-maarten", "st-thomas"],
  "ocho-rios": ["montego-bay", "falmouth", "costa-maya", "cozumel"],
  falmouth: ["montego-bay", "ocho-rios", "costa-maya", "grand-cayman"],
  "montego-bay": ["ocho-rios", "falmouth", "costa-maya", "cozumel"],
};

const comparisonLinksByPort: Record<string, PortRelatedLink[]> = {
  "st-thomas": [
    { label: "Compare St. Thomas vs St. Maarten", href: "/compare/st-thomas-vs-st-maarten" },
    { label: "Compare St. Thomas vs Tortola", href: "/compare/st-thomas-vs-tortola" },
  ],
  "st-maarten": [
    { label: "Compare St. Thomas vs St. Maarten", href: "/compare/st-thomas-vs-st-maarten" },
    { label: "Compare St. Maarten vs Tortola", href: "/compare/st-maarten-vs-tortola" },
  ],
  tortola: [
    { label: "Compare St. Thomas vs Tortola", href: "/compare/st-thomas-vs-tortola" },
    { label: "Compare St. Maarten vs Tortola", href: "/compare/st-maarten-vs-tortola" },
  ],
  aruba: [
    { label: "Compare Aruba vs Curaçao", href: "/compare/aruba-vs-curacao" },
    { label: "Compare Aruba vs Bonaire", href: "/compare/aruba-vs-bonaire" },
  ],
  curacao: [
    { label: "Compare Aruba vs Curaçao", href: "/compare/aruba-vs-curacao" },
    { label: "Compare Bonaire vs Curaçao", href: "/compare/bonaire-vs-curacao" },
  ],
  bonaire: [
    { label: "Compare Aruba vs Bonaire", href: "/compare/aruba-vs-bonaire" },
    { label: "Compare Bonaire vs Curaçao", href: "/compare/bonaire-vs-curacao" },
  ],
  cozumel: [
    { label: "Compare Cozumel vs Roatán", href: "/compare/roatan-vs-cozumel" },
    { label: "Compare Cozumel vs Costa Maya", href: "/compare/cozumel-vs-costa-maya" },
    { label: "Compare Cozumel vs Progreso", href: "/compare/cozumel-vs-progreso" },
  ],
  roatan: [{ label: "Compare Cozumel vs Roatán", href: "/compare/roatan-vs-cozumel" }],
  "costa-maya": [
    { label: "Compare Cozumel vs Costa Maya", href: "/compare/cozumel-vs-costa-maya" },
    { label: "Compare Costa Maya vs Progreso", href: "/compare/costa-maya-vs-progreso" },
  ],
  progreso: [
    { label: "Compare Cozumel vs Progreso", href: "/compare/cozumel-vs-progreso" },
    { label: "Compare Costa Maya vs Progreso", href: "/compare/costa-maya-vs-progreso" },
  ],
  "grand-cayman": [
    { label: "Compare Grand Cayman vs Nassau", href: "/compare/grand-cayman-vs-nassau" },
  ],
  nassau: [{ label: "Compare Grand Cayman vs Nassau", href: "/compare/grand-cayman-vs-nassau" }],
  "puerto-plata": [
    { label: "Compare Amber Cove vs Puerto Plata", href: "/compare/amber-cove-vs-puerto-plata" },
    { label: "Compare Puerto Plata vs Samaná", href: "/compare/puerto-plata-vs-samana" },
    { label: "Compare La Romana vs Puerto Plata", href: "/compare/la-romana-vs-puerto-plata" },
  ],
  samana: [
    { label: "Compare Puerto Plata vs Samaná", href: "/compare/puerto-plata-vs-samana" },
    { label: "Compare La Romana vs Puerto Plata", href: "/compare/la-romana-vs-puerto-plata" },
  ],
  "la-romana": [
    { label: "Compare La Romana vs Puerto Plata", href: "/compare/la-romana-vs-puerto-plata" },
    { label: "Compare Puerto Plata vs Samaná", href: "/compare/puerto-plata-vs-samana" },
  ],
  "ocho-rios": [
    { label: "Compare Ocho Rios vs Falmouth", href: "/compare/ocho-rios-vs-falmouth" },
    { label: "Compare Ocho Rios vs Montego Bay", href: "/compare/ocho-rios-vs-montego-bay" },
  ],
  falmouth: [
    { label: "Compare Ocho Rios vs Falmouth", href: "/compare/ocho-rios-vs-falmouth" },
    { label: "Compare Falmouth vs Montego Bay", href: "/compare/falmouth-vs-montego-bay" },
  ],
  "montego-bay": [
    { label: "Compare Ocho Rios vs Montego Bay", href: "/compare/ocho-rios-vs-montego-bay" },
    { label: "Compare Falmouth vs Montego Bay", href: "/compare/falmouth-vs-montego-bay" },
  ],
};

const clusterPlannerLinks: Record<string, PortRelatedLink> = {
  "st-thomas": { label: "Virgin Islands Cruise Planner", href: "/virgin-islands-cruise-planner" },
  "st-maarten": { label: "Virgin Islands Cruise Planner", href: "/virgin-islands-cruise-planner" },
  tortola: { label: "Virgin Islands Cruise Planner", href: "/virgin-islands-cruise-planner" },
  aruba: { label: "ABC Islands Cruise Planner", href: "/abc-islands-cruise-planner" },
  curacao: { label: "ABC Islands Cruise Planner", href: "/abc-islands-cruise-planner" },
  bonaire: { label: "ABC Islands Cruise Planner", href: "/abc-islands-cruise-planner" },
  nassau: { label: "Bahamas Cruise Planner", href: "/bahamas-cruise-planner" },
  "grand-cayman": { label: "Bahamas Cruise Planner", href: "/bahamas-cruise-planner" },
  cozumel: { label: "Mexican Caribbean Cruise Planner", href: "/mexican-caribbean-cruise-planner" },
  "costa-maya": { label: "Central America Cruise Planner", href: "/central-america-cruise-planner" },
  progreso: { label: "Mexican Caribbean Cruise Planner", href: "/mexican-caribbean-cruise-planner" },
  roatan: { label: "Central America Cruise Planner", href: "/central-america-cruise-planner" },
  "puerto-limon": { label: "Central America Cruise Planner", href: "/central-america-cruise-planner" },
  "puerto-plata": { label: "Dominican Republic Cruise Planner", href: "/dominican-republic-cruise-planner" },
  samana: { label: "Dominican Republic Cruise Planner", href: "/dominican-republic-cruise-planner" },
  "la-romana": { label: "Dominican Republic Cruise Planner", href: "/dominican-republic-cruise-planner" },
  "ocho-rios": { label: "Jamaica Cruise Planner", href: "/jamaica-cruise-planner" },
  falmouth: { label: "Jamaica Cruise Planner", href: "/jamaica-cruise-planner" },
  "montego-bay": { label: "Jamaica Cruise Planner", href: "/jamaica-cruise-planner" },
};

const secondaryClusterLinks: Record<string, PortRelatedLink[]> = {
  "costa-maya": [
    { label: "Mexican Caribbean Cruise Planner", href: "/mexican-caribbean-cruise-planner" },
  ],
  cozumel: [
    { label: "Central America Cruise Planner", href: "/central-america-cruise-planner" },
  ],
  progreso: [
    { label: "Central America Cruise Planner", href: "/central-america-cruise-planner" },
  ],
  "grand-cayman": [
    { label: "Western Caribbean Cruise Planner", href: "/western-caribbean-cruise-planner" },
  ],
  roatan: [
    { label: "Mexican Caribbean Cruise Planner", href: "/mexican-caribbean-cruise-planner" },
  ],
  "puerto-limon": [
    { label: "Western Caribbean Cruise Planner", href: "/western-caribbean-cruise-planner" },
    { label: "Mexican Caribbean Cruise Planner", href: "/mexican-caribbean-cruise-planner" },
  ],
};

const itineraryPlannerLinks: Record<string, PortRelatedLink> = {
  "st-thomas": { label: "Eastern Caribbean Cruise Planner", href: "/eastern-caribbean-cruise-planner" },
  "st-maarten": { label: "Eastern Caribbean Cruise Planner", href: "/eastern-caribbean-cruise-planner" },
  tortola: { label: "Eastern Caribbean Cruise Planner", href: "/eastern-caribbean-cruise-planner" },
  "puerto-plata": { label: "Eastern Caribbean Cruise Planner", href: "/eastern-caribbean-cruise-planner" },
  samana: { label: "Eastern Caribbean Cruise Planner", href: "/eastern-caribbean-cruise-planner" },
  "la-romana": { label: "Eastern Caribbean Cruise Planner", href: "/eastern-caribbean-cruise-planner" },
  nassau: { label: "Eastern Caribbean Cruise Planner", href: "/eastern-caribbean-cruise-planner" },
  cozumel: { label: "Western Caribbean Cruise Planner", href: "/western-caribbean-cruise-planner" },
  progreso: { label: "Western Caribbean Cruise Planner", href: "/western-caribbean-cruise-planner" },
  roatan: { label: "Western Caribbean Cruise Planner", href: "/western-caribbean-cruise-planner" },
  "grand-cayman": { label: "Western Caribbean Cruise Planner", href: "/western-caribbean-cruise-planner" },
  "costa-maya": { label: "Western Caribbean Cruise Planner", href: "/western-caribbean-cruise-planner" },
  "puerto-limon": { label: "Western Caribbean Cruise Planner", href: "/western-caribbean-cruise-planner" },
  "ocho-rios": { label: "Western Caribbean Cruise Planner", href: "/western-caribbean-cruise-planner" },
  falmouth: { label: "Western Caribbean Cruise Planner", href: "/western-caribbean-cruise-planner" },
  "montego-bay": { label: "Western Caribbean Cruise Planner", href: "/western-caribbean-cruise-planner" },
  aruba: { label: "Southern Caribbean Cruise Planner", href: "/southern-caribbean-cruise-planner" },
  curacao: { label: "Southern Caribbean Cruise Planner", href: "/southern-caribbean-cruise-planner" },
  bonaire: { label: "Southern Caribbean Cruise Planner", href: "/southern-caribbean-cruise-planner" },
};

const regionPageLinks: Record<string, PortRelatedLink> = {
  "st-thomas": {
    label: "Eastern Caribbean Cruise Ports",
    href: "/eastern-caribbean-cruise-ports",
  },
  "st-maarten": {
    label: "Eastern Caribbean Cruise Ports",
    href: "/eastern-caribbean-cruise-ports",
  },
  tortola: {
    label: "Eastern Caribbean Cruise Ports",
    href: "/eastern-caribbean-cruise-ports",
  },
  "puerto-plata": {
    label: "Dominican Republic Cruise Ports",
    href: "/dominican-republic-cruise-ports",
  },
  samana: {
    label: "Dominican Republic Cruise Ports",
    href: "/dominican-republic-cruise-ports",
  },
  "la-romana": {
    label: "Dominican Republic Cruise Ports",
    href: "/dominican-republic-cruise-ports",
  },
  nassau: { label: "Eastern Caribbean Cruise Ports", href: "/eastern-caribbean-cruise-ports" },
  cozumel: {
    label: "Western Caribbean Cruise Ports",
    href: "/western-caribbean-cruise-ports",
  },
  progreso: {
    label: "Western Caribbean Cruise Ports",
    href: "/western-caribbean-cruise-ports",
  },
  roatan: {
    label: "Western Caribbean Cruise Ports",
    href: "/western-caribbean-cruise-ports",
  },
  "grand-cayman": {
    label: "Western Caribbean Cruise Ports",
    href: "/western-caribbean-cruise-ports",
  },
  "costa-maya": {
    label: "Western Caribbean Cruise Ports",
    href: "/western-caribbean-cruise-ports",
  },
  "puerto-limon": {
    label: "Western Caribbean Cruise Ports",
    href: "/western-caribbean-cruise-ports",
  },
  "ocho-rios": { label: "Jamaica Cruise Ports", href: "/jamaica-cruise-ports" },
  falmouth: { label: "Jamaica Cruise Ports", href: "/jamaica-cruise-ports" },
  "montego-bay": { label: "Jamaica Cruise Ports", href: "/jamaica-cruise-ports" },
  aruba: {
    label: "Southern Caribbean Cruise Ports",
    href: "/southern-caribbean-cruise-ports",
  },
  curacao: {
    label: "Southern Caribbean Cruise Ports",
    href: "/southern-caribbean-cruise-ports",
  },
  bonaire: {
    label: "Southern Caribbean Cruise Ports",
    href: "/southern-caribbean-cruise-ports",
  },
};

const stThomasAttractionLinks: PortRelatedLink[] = [
  { label: "Magens Bay cruise guide", href: "/magens-bay-st-thomas" },
  { label: "Sapphire Beach cruise guide", href: "/sapphire-beach-st-thomas" },
  { label: "Coki Beach cruise guide", href: "/coki-beach-st-thomas" },
  { label: "Charlotte Amalie port town guide", href: "/charlotte-amalie-st-thomas" },
];

export function getSimilarPortSlugs(slug: string): string[] {
  return relatedPortSlugs[slug] ?? [];
}

export function getPortRelatedLinks(slug: string): PortRelatedLink[] {
  const port = getPortBySlug(slug);
  if (!port) return [];

  const links: PortRelatedLink[] = [];

  for (const relSlug of relatedPortSlugs[slug] ?? []) {
    const related = getPortBySlug(relSlug);
    if (related) {
      links.push({
        label: `${related.name} port guide`,
        href: `/ports/${relSlug}`,
      });
      const scheduleCta = getBestScheduleUrl({ portSlug: relSlug });
      if (scheduleCta) {
        links.push({
          label: `${related.name} ship schedule`,
          href: scheduleCta.href,
        });
      }
    }
  }

  const cluster = clusterPlannerLinks[slug];
  if (cluster) links.push(cluster);

  for (const secondary of secondaryClusterLinks[slug] ?? []) {
    if (!links.some((link) => link.href === secondary.href)) {
      links.push(secondary);
    }
  }

  const itinerary = itineraryPlannerLinks[slug];
  if (itinerary && itinerary.href !== cluster?.href) links.push(itinerary);

  for (const comparison of comparisonLinksByPort[slug] ?? []) {
    if (!links.some((link) => link.href === comparison.href)) {
      links.push(comparison);
    }
  }

  const region = regionPageLinks[slug];
  if (region) links.push(region);

  if (slug === "st-thomas") {
    for (const attractionLink of stThomasAttractionLinks) {
      if (!links.some((link) => link.href === attractionLink.href)) {
        links.push(attractionLink);
      }
    }
  }

  links.push({
    label: port.specialistName,
    href: port.specialistUrl,
    external: true,
  });

  return links;
}
