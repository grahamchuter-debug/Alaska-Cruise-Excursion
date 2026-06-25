import type { FAQ } from "./types";

export const SCHEDULE_HUB_PORT_SLUGS = [
  "juneau",
  "skagway",
  "ketchikan",
  "ward-cove",
  "icy-strait",
  "sitka",
  "haines",
  "seward",
  "whittier",
] as const;

export type ScheduleHubPortSlug = (typeof SCHEDULE_HUB_PORT_SLUGS)[number];

export type SchedulePageContentKey =
  | "home"
  | "year-2026"
  | "year-2027"
  | `${ScheduleHubPortSlug}-hub`;

export interface PlanningYourDayContent {
  summary: string;
  typicalActivities: string[];
  topAttractions: string[];
  recommendedExcursions: string[];
  timingConsiderations: string[];
  returnGuidance: string;
}

export interface SchedulePageInternalLink {
  label: string;
  href: string;
  description: string;
  external?: boolean;
}

export interface ScheduleHubPopularExcursion {
  name: string;
  description: string;
  duration: string;
}

export interface ScheduleHubDetails {
  popularExcursions: ScheduleHubPopularExcursion[];
  terminalInfo: string;
  tenderVsDock: string;
  typicalTimeInPort: string;
  bestExcursionTiming: string[];
}

export interface SchedulePageContent {
  intro: string;
  heroSubtitle?: string;
  whyPassengersUseTitle?: string;
  whyPassengersUse: string[];
  planningTitle?: string;
  planningYourDay: PlanningYourDayContent;
  faqs: FAQ[];
  internalLinks: SchedulePageInternalLink[];
  hubDetails?: ScheduleHubDetails;
}
