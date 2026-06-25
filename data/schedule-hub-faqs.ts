import type { FAQ } from "./types";
import type { ScheduleYear } from "@/lib/schedule-utils";
import { getSchedulePageContent } from "./schedule-page-content";

/** @deprecated Use getSchedulePageContent("home").faqs */
export const SCHEDULE_HOME_FAQS: FAQ[] = getSchedulePageContent("home").faqs;

export function getScheduleYearHubFaqs(year: ScheduleYear): FAQ[] {
  return getSchedulePageContent(`year-${year}`).faqs;
}
