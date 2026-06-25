import { getSignatureExcursionLogistics } from "@/data/excursion-logistics";
import { portExcursionAuthority } from "@/data/port-excursion-authority";
import type { SignatureExcursionLogistics, TaxiNeeded, WalkingRealistic } from "@/data/types";

function normalizeExcursionName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function significantWords(name: string): string[] {
  return normalizeExcursionName(name)
    .split(" ")
    .filter((word) => word.length > 3);
}

/** Loose match between a displayed excursion name and the port signature excursion. */
export function matchesSignatureExcursion(portSlug: string, excursionName: string): boolean {
  const logistics = getSignatureExcursionLogistics(portSlug);
  if (!logistics) return false;

  const a = normalizeExcursionName(excursionName);
  const b = normalizeExcursionName(logistics.excursionName);
  if (a === b || a.includes(b) || b.includes(a)) return true;

  const sigWords = significantWords(logistics.excursionName);
  const excWords = significantWords(excursionName);
  const shared = sigWords.filter((word) => excWords.includes(word));
  return shared.length >= 2;
}

export function getAuthoritySignatureName(portSlug: string): string | undefined {
  return portExcursionAuthority.portTable.find((row) => row.portSlug === portSlug)?.bestExcursion;
}

export function resolveExcursionLogistics(
  portSlug: string,
  excursionName?: string,
): SignatureExcursionLogistics | undefined {
  const logistics = getSignatureExcursionLogistics(portSlug);
  if (!logistics) return undefined;
  if (!excursionName || matchesSignatureExcursion(portSlug, excursionName)) return logistics;
  return undefined;
}

export function formatTaxiNeeded(value: TaxiNeeded): string {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "Optional";
}

export function formatWalkingRealistic(value: WalkingRealistic): string {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "Depends";
}
