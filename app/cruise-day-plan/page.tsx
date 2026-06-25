import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CruiseDayPlanPageClient } from "@/components/CruiseDayPlanPageClient";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, travelGuideSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Alaska Cruise Day Plan",
  description:
    "Build a personalised Alaska cruise port day plan with ship schedules, excursion picks, return-to-ship advice, and links to local specialist operators.",
  path: "/cruise-day-plan",
  keywords: ["Alaska cruise day plan", "port day planner", "shore excursion planning"],
});

export default function CruiseDayPlanPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Alaska Cruise Day Plan", path: "/cruise-day-plan" },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          travelGuideSchema({
            title: "Alaska Cruise Day Plan",
            description: "Personalised Alaska cruise port day planning with schedules and excursion recommendations.",
            path: "/cruise-day-plan",
          }),
        ]}
      />
      <PageHero
        title="Alaska Cruise Day Plan"
        subtitle="Enter your port, sailing date, and interests to generate a personalised port-day plan with ship schedules and excursion ideas."
        compact
      />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <CruiseDayPlanPageClient />
        </div>
      </section>
    </>
  );
}
