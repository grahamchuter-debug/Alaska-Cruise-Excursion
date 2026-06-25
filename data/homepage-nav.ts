import type { NavIconKey } from "@/components/NavCardIcon";
import { getPortGuideCount } from "@/data/content-inventory";

export interface HomepageNavAction {
  href: string;
  category: string;
  title: string;
  description: string;
  icon: NavIconKey;
  actionLabel: string;
}

export function getHomepageNavActions(): HomepageNavAction[] {
  const portCount = getPortGuideCount();

  return [
    {
      href: "/excursion-types",
      category: "Activities",
      title: "Find by Excursion Type",
      description: "Whales, bears, glaciers, railways, kayaking, and more — start with what you want to do.",
      icon: "finder",
      actionLabel: "Browse Activities",
    },
    {
      href: "/ports",
      category: "Port guides",
      title: "Find by Port",
      description: `${portCount} Alaska port authority guides with dock notes and specialist links.`,
      icon: "ports",
      actionLabel: "Browse Ports",
    },
    {
      href: "/ship-schedules",
      category: "Ship schedules",
      title: "Alaska Ship Schedules",
      description: "Browse port calls by port, month, and year as verified data is imported.",
      icon: "schedules",
      actionLabel: "View Schedules",
    },
  ];
}
