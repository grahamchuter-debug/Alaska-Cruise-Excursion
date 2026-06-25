import type { PortImageTheme } from "@/data/types";
import type { Rgb } from "@/lib/pdf-brand-tokens";

export interface PdfThemeGradient {
  start: Rgb;
  mid: Rgb;
  end: Rgb;
  accent: Rgb;
}

export const PDF_PORT_THEMES: Record<PortImageTheme, PdfThemeGradient> = {
  beach: {
    start: [6, 182, 212],
    mid: [45, 212, 191],
    end: [110, 231, 183],
    accent: [8, 145, 178],
  },
  snorkel: {
    start: [37, 99, 235],
    mid: [6, 182, 212],
    end: [45, 212, 191],
    accent: [37, 99, 235],
  },
  rainforest: {
    start: [4, 120, 87],
    mid: [22, 163, 74],
    end: [132, 204, 22],
    accent: [4, 120, 87],
  },
  fortress: {
    start: [180, 83, 9],
    mid: [234, 88, 12],
    end: [234, 179, 8],
    accent: [180, 83, 9],
  },
  viewpoint: {
    start: [2, 132, 199],
    mid: [59, 130, 246],
    end: [129, 140, 248],
    accent: [2, 132, 199],
  },
  town: {
    start: [244, 63, 94],
    mid: [251, 146, 60],
    end: [252, 211, 77],
    accent: [244, 63, 94],
  },
  catamaran: {
    start: [0, 150, 184],
    mid: [6, 182, 212],
    end: [64, 224, 208],
    accent: [0, 150, 184],
  },
  wildlife: {
    start: [13, 148, 136],
    mid: [6, 182, 212],
    end: [96, 165, 250],
    accent: [13, 148, 136],
  },
};

export function excursionTypeToTheme(type: string): PortImageTheme {
  const lower = type.toLowerCase();
  if (/beach|sand|club/.test(lower)) return "beach";
  if (/snorkel|reef|dive/.test(lower)) return "snorkel";
  if (/rainforest|falls|hike|zip|adventure|nature/.test(lower)) return "rainforest";
  if (/fort|history|culture|ruin/.test(lower)) return "fortress";
  if (/view|scenic|overlook/.test(lower)) return "viewpoint";
  if (/town|shopping|downtown|city/.test(lower)) return "town";
  if (/wildlife|turtle|stingray|dolphin/.test(lower)) return "wildlife";
  if (/catamaran|sail|boat|cruise/.test(lower)) return "catamaran";
  return "beach";
}
