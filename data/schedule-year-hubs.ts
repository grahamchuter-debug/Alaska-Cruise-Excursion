import type { ScheduleYear } from "../lib/schedule-utils";
import { getSchedulePortCount } from "./content-inventory";

export interface ScheduleYearHubContent {
  year: ScheduleYear;
  title: string;
  metaDescription: string;
  heroSubtitle: string;
  intro: string;
  topPortsIntro: string;
}

export const scheduleYearHubContent: Record<ScheduleYear, ScheduleYearHubContent> = {
  2026: {
    year: 2026,
    title: "2026 Alaska Cruise Ship Schedules",
    metaDescription:
      "2026 Alaska cruise ship schedule hub for Juneau, Skagway, Ketchikan, Seward, Whittier, Sitka, Haines, Icy Strait, and Ward Cove. Browse port calls by month as verified data is imported.",
    heroSubtitle:
      "Master 2026 Alaska schedule hub — compare port call patterns and plan shore excursions around arrival and departure windows.",
    intro:
      "This is the master 2026 Alaska cruise ship schedule hub. Juneau and Skagway have live imported ship calls today — other hub ports show framework pages until verified monthly data is published. We never show placeholder sailings.",
    topPortsIntro:
      "Alaska ports ranked by verified 2026 ship calls once import data is available. Use this table to spot busy pier days before booking whale tours, White Pass Railway seats, or bear-viewing trips.",
  },
  2027: {
    year: 2027,
    title: "2027 Alaska Cruise Ship Schedules",
    metaDescription:
      "2027 Alaska cruise ship schedule hub for Juneau, Skagway, Ketchikan, Seward, Whittier, Sitka, Haines, Icy Strait, and Ward Cove. Browse port calls by month as verified data is imported.",
    heroSubtitle:
      "Master 2027 Alaska schedule hub — compare port call patterns and plan shore excursions around arrival and departure windows.",
    intro:
      "This is the master 2027 Alaska cruise ship schedule hub. Juneau and Skagway have live imported ship calls today — Ketchikan, Seward, and other hubs will populate month by month as verified imports complete.",
    topPortsIntro:
      "Alaska ports ranked by verified 2027 ship calls once import data is available. Juneau, Skagway, and Ketchikan typically lead Inside Passage volume — use this hub to compare busy pier days before booking excursions.",
  },
};

export function getScheduleYearHubContent(year: ScheduleYear): ScheduleYearHubContent {
  const content = scheduleYearHubContent[year];
  const schedulePortCount = getSchedulePortCount();

  return {
    ...content,
    intro: content.intro.replace(
      "Alaska cruise ship schedule hub",
      `Alaska cruise ship schedule hub for ${schedulePortCount} ports`,
    ),
  };
}
