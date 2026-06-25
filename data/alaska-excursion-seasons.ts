export type SeasonMonthRating = "peak" | "good" | "shoulder" | "limited";

export interface AlaskaSeasonMonth {
  month: string;
  rating: SeasonMonthRating;
}

export interface AlaskaSeasonActivity {
  id: string;
  label: string;
  excursionTypeSlug: string;
  summary: string;
  months: AlaskaSeasonMonth[];
  topPortSlugs: string[];
  guideSlug?: string;
}

export const ALASKA_CRUISE_SEASON_MONTHS = ["May", "June", "July", "August", "September"] as const;

export const alaskaSeasonActivities: AlaskaSeasonActivity[] = [
  {
    id: "whale-watching",
    label: "Whale watching",
    excursionTypeSlug: "whale-watching",
    summary:
      "Humpbacks feed in Inside Passage waters May through September, with peak surface activity in June and July.",
    months: [
      { month: "May", rating: "good" },
      { month: "June", rating: "peak" },
      { month: "July", rating: "peak" },
      { month: "August", rating: "peak" },
      { month: "September", rating: "good" },
    ],
    topPortSlugs: ["juneau", "icy-strait", "sitka", "seward"],
    guideSlug: "best-alaska-whale-watching-excursions",
  },
  {
    id: "bear-viewing",
    label: "Bear viewing",
    excursionTypeSlug: "bear-viewing",
    summary:
      "Wild stream viewing peaks with salmon runs July through early September. Sanctuaries operate all cruise season.",
    months: [
      { month: "May", rating: "limited" },
      { month: "June", rating: "good" },
      { month: "July", rating: "peak" },
      { month: "August", rating: "peak" },
      { month: "September", rating: "peak" },
    ],
    topPortSlugs: ["ketchikan", "haines", "sitka", "icy-strait"],
    guideSlug: "best-alaska-bear-viewing-excursions",
  },
  {
    id: "eagle-viewing",
    label: "Eagle viewing",
    excursionTypeSlug: "wildlife-cruises",
    summary:
      "Summer cruises see bald eagles on floats and estuaries — especially Haines and Sitka. Chilkat's famous winter congregations are outside the main cruise window.",
    months: [
      { month: "May", rating: "good" },
      { month: "June", rating: "peak" },
      { month: "July", rating: "peak" },
      { month: "August", rating: "good" },
      { month: "September", rating: "good" },
    ],
    topPortSlugs: ["haines", "sitka", "juneau"],
  },
  {
    id: "salmon-runs",
    label: "Salmon runs",
    excursionTypeSlug: "fishing",
    summary:
      "Pink and chum salmon peak mid-summer; sockeye and coho build through July and August — driving bear viewing and sport fishing.",
    months: [
      { month: "May", rating: "limited" },
      { month: "June", rating: "good" },
      { month: "July", rating: "peak" },
      { month: "August", rating: "peak" },
      { month: "September", rating: "good" },
    ],
    topPortSlugs: ["ketchikan", "sitka", "haines"],
  },
  {
    id: "glacier-cruises",
    label: "Glacier cruises",
    excursionTypeSlug: "glacier-tours",
    summary:
      "Fjord boats and Mendenhall access run all season. Calving activity and weather windows are best May through August.",
    months: [
      { month: "May", rating: "good" },
      { month: "June", rating: "peak" },
      { month: "July", rating: "peak" },
      { month: "August", rating: "peak" },
      { month: "September", rating: "good" },
    ],
    topPortSlugs: ["seward", "juneau", "whittier", "skagway"],
    guideSlug: "best-alaska-glacier-excursions",
  },
  {
    id: "dog-sledding",
    label: "Dog sledding",
    excursionTypeSlug: "dog-sledding",
    summary:
      "Summer glacier camps and helicopter combos operate May through September when cruise ships are in port.",
    months: [
      { month: "May", rating: "good" },
      { month: "June", rating: "peak" },
      { month: "July", rating: "peak" },
      { month: "August", rating: "peak" },
      { month: "September", rating: "good" },
    ],
    topPortSlugs: ["skagway", "juneau", "seward"],
  },
  {
    id: "fishing",
    label: "Fishing",
    excursionTypeSlug: "fishing",
    summary:
      "Salmon and halibut charters run all cruise season. King salmon timing varies by species and area — book early in Ketchikan and Seward.",
    months: [
      { month: "May", rating: "good" },
      { month: "June", rating: "peak" },
      { month: "July", rating: "peak" },
      { month: "August", rating: "peak" },
      { month: "September", rating: "good" },
    ],
    topPortSlugs: ["ketchikan", "seward", "whittier", "sitka"],
  },
  {
    id: "photography",
    label: "Photography",
    excursionTypeSlug: "photography",
    summary:
      "Long daylight hours in June and July help wildlife and landscape shoots. September brings autumn colour and softer light.",
    months: [
      { month: "May", rating: "shoulder" },
      { month: "June", rating: "peak" },
      { month: "July", rating: "peak" },
      { month: "August", rating: "good" },
      { month: "September", rating: "peak" },
    ],
    topPortSlugs: ["haines", "juneau", "seward", "denali"],
    guideSlug: "best-alaska-shore-excursions",
  },
];

export const seasonRatingStyles: Record<SeasonMonthRating, string> = {
  peak: "bg-caribbean-700 text-white",
  good: "bg-caribbean-100 text-caribbean-800",
  shoulder: "bg-amber-100 text-amber-900",
  limited: "bg-gray-100 text-gray-500",
};

export const seasonRatingLabels: Record<SeasonMonthRating, string> = {
  peak: "Peak",
  good: "Good",
  shoulder: "Shoulder",
  limited: "Limited",
};
