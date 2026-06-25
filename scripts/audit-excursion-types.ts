import {
  auditExcursionTypes,
  NON_EXISTENT_EXCURSION_TYPE_PAGES,
} from "@/lib/excursion-type-pathways";

function main(): void {
  const rows = auditExcursionTypes();
  console.log("Excursion Type Page Audit\n");

  for (const row of rows) {
    const status = row.issues.length === 0 ? "OK" : "NEEDS ATTENTION";
    console.log(`${row.name} (/excursion-types/${row.slug}) — ${status}`);
    console.log(
      `  Pathways: ${row.pathwayCount} · Specialist sites: ${row.specialistSiteCount} · Booking links: ${row.bookingLinkCount}`,
    );
    console.log(
      `  Images: hero=${row.hasHeroImage ? "yes" : "placeholder"} category=${row.hasCategoryImage ? "yes" : "placeholder"}`,
    );
    if (row.issues.length > 0) {
      for (const issue of row.issues) {
        console.log(`  - ${issue}`);
      }
    }
    console.log("");
  }

  const flagged = rows.filter((row) => row.issues.length > 0);
  console.log("Pages without dedicated excursion-type routes:\n");
  for (const item of NON_EXISTENT_EXCURSION_TYPE_PAGES) {
    console.log(`  ${item.label}: ${item.note}`);
  }

  if (flagged.length > 0) {
    console.log(`\n${flagged.length} excursion type page(s) flagged.`);
    process.exit(1);
  }

  console.log("All excursion type pages meet pathway requirements.");
}

main();
