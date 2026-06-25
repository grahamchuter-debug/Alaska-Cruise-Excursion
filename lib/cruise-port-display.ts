import { getCruisePortNaming } from "@/data/cruise-port-naming";
import type { CruisePortNaming } from "@/data/types";
import { formatMonthLabel } from "@/lib/schedule-utils";

function normalizePortName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\./g, "")
    .trim();
}

function getTitleParenthetical(
  destinationName: string,
  naming: CruisePortNaming,
): string | null {
  if (naming.titleParenthetical) {
    const qualifier = naming.titleParenthetical;
    if (normalizePortName(qualifier) !== normalizePortName(destinationName)) {
      return qualifier;
    }
  }

  if (normalizePortName(destinationName) === normalizePortName(naming.dockTown)) {
    return null;
  }

  return naming.dockTown;
}

export function formatDestinationWithDock(destinationName: string, slug: string): string {
  const naming = getCruisePortNaming(slug);
  if (!naming) return destinationName;

  const parenthetical = getTitleParenthetical(destinationName, naming);
  if (!parenthetical) return destinationName;

  return `${destinationName} (${parenthetical})`;
}

export function getPortGuideHeroTitle(slug: string, destinationName: string): string {
  return `${formatDestinationWithDock(destinationName, slug)} Shore Excursions & Cruise Port Guide`;
}

export function getScheduleHubHeroTitle(slug: string, destinationName: string): string {
  return `${formatDestinationWithDock(destinationName, slug)} Cruise Ship Schedule`;
}

export function getScheduleYearHeroTitle(
  slug: string,
  destinationName: string,
  year: number,
): string {
  return `${formatDestinationWithDock(destinationName, slug)} Cruise Ship Schedule ${year}`;
}

export function getScheduleMonthHeroTitle(
  slug: string,
  destinationName: string,
  monthKey: string,
): string {
  return `${formatDestinationWithDock(destinationName, slug)} Cruise Ship Schedule, ${formatMonthLabel(monthKey)}`;
}

export function getPortGuideIntro(slug: string): string | undefined {
  return getCruisePortNaming(slug)?.portGuideIntro;
}

export function getScheduleIntro(slug: string): string | undefined {
  return getCruisePortNaming(slug)?.scheduleIntro;
}

export function augmentMetadataTitle(
  baseTitle: string,
  destinationName: string,
  slug: string,
): string {
  const naming = getCruisePortNaming(slug);
  if (!naming) return baseTitle;

  const parenthetical = getTitleParenthetical(destinationName, naming);
  if (!parenthetical) return baseTitle;

  const withParenthetical = `${destinationName} (${parenthetical})`;
  if (baseTitle.includes(`(${parenthetical})`)) return baseTitle;
  if (baseTitle.startsWith(destinationName)) {
    return baseTitle.replace(destinationName, withParenthetical);
  }
  return `${withParenthetical}, ${baseTitle}`;
}

export function augmentMetadataDescription(
  baseDescription: string,
  slug: string,
  context: "port" | "schedule",
): string {
  const naming = getCruisePortNaming(slug);
  if (!naming) return baseDescription;

  const lead = context === "port" ? naming.portGuideIntro : naming.scheduleIntro;
  const firstSentence = lead.split(/(?<=[.!?])\s+/)[0]?.trim();
  if (!firstSentence || baseDescription.includes(firstSentence.slice(0, 50))) {
    return baseDescription;
  }
  return `${firstSentence} ${baseDescription}`;
}

const SCHEDULE_METADATA_KEYWORDS: Record<string, string[]> = {
  "st-maarten": [
    "st maarten cruise ship schedule",
    "sint maarten cruise ship schedule",
    "sxm cruise ship schedule",
    "cruise ship schedule sxm",
    "philipsburg cruise schedule",
  ],
};

export function getScheduleMetadataKeywords(
  slug: string,
  portName: string,
  year?: number,
): string[] {
  const portSpecific = SCHEDULE_METADATA_KEYWORDS[slug];
  if (portSpecific) {
    const yearKeywords = year
      ? [`sxm cruise ship schedule ${year}`, `${portName} cruise schedule ${year}`]
      : [`${portName} cruise schedule 2026`, `${portName} cruise schedule 2027`];
    return [...portSpecific, ...yearKeywords, "ships in port", "cruise arrival times"];
  }

  if (!year) {
    return [
      `${portName} ship schedule`,
      `${portName} cruise schedule 2026`,
      `${portName} cruise schedule 2027`,
      "ships in port",
    ];
  }

  return [
    `${portName} ship schedule ${year}`,
    `${portName} cruise schedule ${year}`,
    "ships in port",
    "cruise arrival times",
  ];
}
