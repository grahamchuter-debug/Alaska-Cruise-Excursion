import type { PortRelatedLink } from "./types";
import { getPortBySlug } from "./ports";
import { getBestScheduleUrl } from "@/lib/schedule-cta-url";
import { getSpecialistPartnerCta } from "@/lib/specialist-links";

/** Related Alaska port slugs for cross-linking on each authority page. */
const relatedPortSlugs: Record<string, string[]> = {
  juneau: ["skagway", "ketchikan", "haines", "sitka"],
  skagway: ["haines", "juneau", "ketchikan"],
  ketchikan: ["ward-cove", "sitka", "juneau"],
  "ward-cove": ["ketchikan", "sitka"],
  "icy-strait": ["haines", "juneau", "sitka"],
  sitka: ["juneau", "ketchikan", "haines"],
  haines: ["skagway", "juneau", "icy-strait"],
  seward: ["whittier", "juneau"],
  whittier: ["seward", "juneau"],
  denali: ["seward", "whittier"],
};

const comparisonLinksByPort: Record<string, PortRelatedLink[]> = {
  seward: [{ label: "Compare Seward vs Whittier", href: "/seward-vs-whittier-cruise-port" }],
  whittier: [{ label: "Compare Seward vs Whittier", href: "/seward-vs-whittier-cruise-port" }],
  ketchikan: [
    { label: "Compare Ward Cove vs Ketchikan", href: "/ward-cove-vs-ketchikan-cruise-port" },
  ],
  "ward-cove": [
    { label: "Compare Ward Cove vs Ketchikan", href: "/ward-cove-vs-ketchikan-cruise-port" },
  ],
  haines: [{ label: "Compare Haines vs Skagway", href: "/haines-vs-skagway" }],
  skagway: [{ label: "Compare Haines vs Skagway", href: "/haines-vs-skagway" }],
};

const regionPageLinks: Record<string, PortRelatedLink> = {
  juneau: { label: "Inside Passage Cruise Ports", href: "/inside-passage-cruise-ports" },
  skagway: { label: "Inside Passage Cruise Ports", href: "/inside-passage-cruise-ports" },
  ketchikan: { label: "Inside Passage Cruise Ports", href: "/inside-passage-cruise-ports" },
  "ward-cove": { label: "Inside Passage Cruise Ports", href: "/inside-passage-cruise-ports" },
  "icy-strait": { label: "Inside Passage Cruise Ports", href: "/inside-passage-cruise-ports" },
  sitka: { label: "Inside Passage Cruise Ports", href: "/inside-passage-cruise-ports" },
  haines: { label: "Inside Passage Cruise Ports", href: "/inside-passage-cruise-ports" },
  seward: { label: "Gulf of Alaska Cruise Ports", href: "/gulf-of-alaska-cruise-ports" },
  whittier: { label: "Gulf of Alaska Cruise Ports", href: "/gulf-of-alaska-cruise-ports" },
  denali: { label: "Inside Passage Cruise Ports", href: "/inside-passage-cruise-ports" },
};

const plannerLinks: Record<string, PortRelatedLink> = {
  juneau: { label: "Alaska Excursion Finder", href: "/alaska-cruise-excursion-planner" },
  skagway: { label: "Alaska Excursion Finder", href: "/alaska-cruise-excursion-planner" },
  ketchikan: { label: "Alaska Excursion Finder", href: "/alaska-cruise-excursion-planner" },
  seward: { label: "Alaska Excursion Finder", href: "/alaska-cruise-excursion-planner" },
  whittier: { label: "Alaska Excursion Finder", href: "/alaska-cruise-excursion-planner" },
  haines: { label: "Alaska Excursion Finder", href: "/alaska-cruise-excursion-planner" },
  sitka: { label: "Alaska Excursion Finder", href: "/alaska-cruise-excursion-planner" },
  "icy-strait": { label: "Alaska Excursion Finder", href: "/alaska-cruise-excursion-planner" },
  "ward-cove": { label: "Alaska Excursion Finder", href: "/alaska-cruise-excursion-planner" },
  denali: { label: "Plan my Alaska cruise", href: "/plan-my-alaska-cruise" },
};

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

  const planner = plannerLinks[slug];
  if (planner) links.push(planner);

  for (const comparison of comparisonLinksByPort[slug] ?? []) {
    if (!links.some((link) => link.href === comparison.href)) {
      links.push(comparison);
    }
  }

  const region = regionPageLinks[slug];
  if (region) links.push(region);

  links.push({
    label: getSpecialistPartnerCta(slug),
    href: port.specialistUrl,
    external: true,
  });

  return links;
}
