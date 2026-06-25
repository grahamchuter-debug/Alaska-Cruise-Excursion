import type { PortImageTheme } from "@/data/types";

export const themeStyles: Record<
  PortImageTheme,
  { gradient: string; accent: string }
> = {
  beach: {
    gradient: "from-cyan-500 via-teal-400 to-emerald-300",
    accent: "bg-cyan-600",
  },
  snorkel: {
    gradient: "from-blue-600 via-cyan-500 to-teal-400",
    accent: "bg-blue-600",
  },
  rainforest: {
    gradient: "from-emerald-700 via-green-600 to-lime-500",
    accent: "bg-emerald-700",
  },
  fortress: {
    gradient: "from-amber-700 via-orange-600 to-yellow-500",
    accent: "bg-amber-700",
  },
  viewpoint: {
    gradient: "from-sky-600 via-blue-500 to-indigo-400",
    accent: "bg-sky-600",
  },
  town: {
    gradient: "from-rose-500 via-orange-400 to-amber-300",
    accent: "bg-rose-500",
  },
  catamaran: {
    gradient: "from-caribbean-600 via-cyan-500 to-turquoise-light",
    accent: "bg-caribbean-600",
  },
  wildlife: {
    gradient: "from-teal-600 via-cyan-500 to-blue-400",
    accent: "bg-teal-600",
  },
};

export function getThemeStyle(theme: PortImageTheme) {
  return themeStyles[theme];
}

export function excursionTypeImageTheme(type: string): PortImageTheme {
  const lower = type.toLowerCase();
  if (/beach|sand|club/.test(lower)) return "beach";
  if (/snorkel|reef|dive/.test(lower)) return "snorkel";
  if (/rainforest|falls|hike|zip|adventure|nature/.test(lower)) return "rainforest";
  if (/fort|history|culture|ruin/.test(lower)) return "fortress";
  if (/wildlife|turtle|stingray|dolphin/.test(lower)) return "wildlife";
  if (/catamaran|sail|boat|cruise/.test(lower)) return "catamaran";
  if (/town|shopping|city/.test(lower)) return "town";
  return "beach";
}
