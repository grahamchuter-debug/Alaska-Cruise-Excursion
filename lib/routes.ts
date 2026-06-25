import { getSchedulePortBySlug } from "@/data/schedules";

export function hasShipSchedule(slug: string): boolean {
  return getSchedulePortBySlug(slug) !== undefined;
}
