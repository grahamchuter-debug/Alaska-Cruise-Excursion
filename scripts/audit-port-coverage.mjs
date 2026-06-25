#!/usr/bin/env node
import { getAllPortSlugs } from "../data/ports.ts";
import { featuredFinderPortSlugs, popularCaribbeanRoutes, portDayMistakes } from "../data/excursion-finder.ts";
import { itineraryPlanners } from "../data/itinerary-planners.ts";
import { regionalCruisePlanners } from "../data/regional-cruise-planners.ts";
import { topicClusters } from "../data/topic-clusters.ts";
import { regions } from "../data/regions.ts";
import { getSimilarPortSlugs } from "../data/port-related.ts";
import { portExcursionAuthority } from "../data/port-excursion-authority.ts";
import { getPortPlanningSnapshot } from "../data/port-planning.ts";
import { featuredPortCards, FEATURED_PORT_SLUGS } from "../data/homepage.ts";

const allPorts = getAllPortSlugs();

function inAny(arrays, slug) {
  return arrays.some((a) => a.includes(slug));
}

function collectTopPortSlugs(planners) {
  return planners.flatMap((p) => p.topPortSlugs ?? []);
}

const systems = {
  homepageFeaturedSlugs: (slug) => FEATURED_PORT_SLUGS.includes(slug),
  homepagePortCards: (slug) => featuredPortCards.some((c) => c.slug === slug),
  regions: (slug) => regions.some((r) => r.portSlugs.includes(slug)),
  excursionFinderFeatured: (slug) => featuredFinderPortSlugs.includes(slug),
  excursionFinderRoutes: (slug) => popularCaribbeanRoutes.some((r) => r.portSlugs.includes(slug)),
  excursionFinderMistakes: (slug) => portDayMistakes.some((m) => m.portSlug === slug),
  itineraryPlanners: (slug) => collectTopPortSlugs(itineraryPlanners).includes(slug),
  regionalPlanners: (slug) => collectTopPortSlugs(regionalCruisePlanners).includes(slug),
  topicClusters: (slug) => topicClusters.some((c) => c.portSlugs.includes(slug)),
  topicClusterPicks: (slug) =>
    topicClusters.some((c) => c.travellerPicks?.some((p) => p.portSlug === slug)),
  portRelated: (slug) => getSimilarPortSlugs(slug).length > 0,
  portAuthorityTable: (slug) => portExcursionAuthority.portTable.some((r) => r.portSlug === slug),
  portPlanning: (slug) => getPortPlanningSnapshot(slug) !== null,
};

const label = process.argv[2] === "after" ? "AFTER" : "BEFORE";
console.log(`\n=== ${label} COVERAGE MATRIX ===\n`);
console.log(["port", ...Object.keys(systems)].join("\t"));

const missing = {};
for (const slug of allPorts) {
  const row = [slug];
  for (const [name, check] of Object.entries(systems)) {
    const ok = check(slug);
    row.push(ok ? "✓" : "✗");
    if (!ok) {
      missing[slug] = missing[slug] ?? [];
      missing[slug].push(name);
    }
  }
  console.log(row.join("\t"));
}

console.log("\n--- Gaps by port ---");
for (const [slug, gaps] of Object.entries(missing)) {
  console.log(`${slug}: ${gaps.join(", ")}`);
}

console.log("\n--- System totals ---");
for (const name of Object.keys(systems)) {
  const count = allPorts.filter((s) => systems[name](s)).length;
  console.log(`${name}: ${count}/${allPorts.length}`);
}

const eligible = allPorts.filter((slug) =>
  Object.values(systems).some((check) => check(slug)),
);
console.log(`\nFully covered in ALL systems: ${allPorts.filter((s) => !missing[s]).join(", ") || "none"}`);
console.log(`Eligible in at least one system: ${eligible.length}/${allPorts.length}`);
