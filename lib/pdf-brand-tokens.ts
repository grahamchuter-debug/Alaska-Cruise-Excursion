import type { MatchTier } from "@/lib/excursion-finder-engine";

/** PDF palette aligned with tailwind.config.ts and globals.css */
export const PDF_BRAND = {
  siteName: "Alaska Cruise Excursion",
  siteTagline: "Excursion Planning",
  siteShortLine: "Alaska Cruise",
  siteUrl: "https://alaskacruiseexcursion.com",
  disclaimer:
    "For planning only — always confirm times with your cruise line and tour operator.",
  colors: {
    caribbean50: [230, 247, 251] as Rgb,
    caribbean100: [179, 232, 244] as Rgb,
    caribbean600: [0, 150, 184] as Rgb,
    caribbean700: [0, 119, 182] as Rgb,
    caribbean800: [0, 95, 146] as Rgb,
    caribbean900: [0, 71, 112] as Rgb,
    tropicalSand: [244, 228, 193] as Rgb,
    turquoise: [64, 224, 208] as Rgb,
    gray900: [17, 24, 39] as Rgb,
    gray700: [55, 65, 81] as Rgb,
    gray600: [75, 85, 99] as Rgb,
    cardBorder: [230, 236, 241] as Rgb,
    white: [255, 255, 255] as Rgb,
  },
  fonts: {
    /** Playfair Display approximation */
    display: "times",
    /** Inter approximation */
    body: "helvetica",
  },
} as const;

export type Rgb = [number, number, number];

export const MATCH_BADGE_COLORS: Record<MatchTier, Rgb> = {
  "Excellent Match": [45, 134, 89],
  "Strong Match": PDF_BRAND.colors.caribbean700,
  "Good Match": [194, 130, 14],
  "Possible Match": [100, 116, 139],
};
