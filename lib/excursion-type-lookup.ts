import { excursionTypes } from "@/data/excursion-types";

/** Resolve finder/display excursion type labels to excursion type page slugs. */
export function getExcursionTypeSlugByLabel(label: string): string | undefined {
  const normalized = label.trim().toLowerCase();
  if (!normalized) return undefined;

  const exact = excursionTypes.find((type) => type.name.toLowerCase() === normalized);
  if (exact) return exact.slug;

  const partial = excursionTypes.find((type) => {
    const name = type.name.toLowerCase();
    return name.includes(normalized) || normalized.includes(name) || normalized.includes(type.slug);
  });
  return partial?.slug;
}
