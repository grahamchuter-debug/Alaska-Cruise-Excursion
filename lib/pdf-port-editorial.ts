import { getPortBySlug } from "@/data/ports";
import { getPortAuthority } from "@/data/port-authority";

export interface PdfPortEditorial {
  whySpecial: string;
  expertTip: string;
  photoMoment: string;
}

export function getPdfPortEditorial(portSlug: string): PdfPortEditorial {
  const port = getPortBySlug(portSlug);
  const authority = getPortAuthority(portSlug);

  const whySpecial =
    authority?.whyVisit[0] ??
    port?.highlights[0] ??
    port?.tagline ??
    "A signature Alaska cruise port day.";

  const expertTip =
    port?.passengerTips[0] ??
    "Book signature experiences early on multi-ship days when popular tours sell out fastest.";

  const topAttraction = port?.topAttractions[0];
  const photoMoment = topAttraction
    ? `${topAttraction.name} — ${topAttraction.description}`
    : `${port?.name ?? "This port"} offers iconic Alaska scenery from pier to shore.`;

  return { whySpecial, expertTip, photoMoment };
}

/** Short excursion pitch — avoids repeating editorial copy on the same page. */
export function buildExcursionPitch(plan: {
  recommendedExcursions: {
    primary: { name: string; description: string; type: string };
    matchReasons: string[];
  };
}): string[] {
  const bullets: string[] = [];
  const desc = plan.recommendedExcursions.primary.description
    .split(/[.;]/)
    .map((part) => part.trim())
    .find((part) => part.length > 20);
  if (desc) bullets.push(desc);

  for (const reason of plan.recommendedExcursions.matchReasons) {
    if (bullets.length >= 2) break;
    if (!bullets.includes(reason)) bullets.push(reason);
  }

  if (bullets.length === 0) {
    bullets.push(
      `${plan.recommendedExcursions.primary.name} — a ${plan.recommendedExcursions.primary.type.toLowerCase()} highlight for this port day.`,
    );
  }

  return bullets.slice(0, 2);
}
