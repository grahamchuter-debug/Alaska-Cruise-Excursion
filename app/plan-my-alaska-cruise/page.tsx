import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Plan My Alaska Cruise | Free Planning Help",
  description:
    "Get personalised Alaska cruise and shore excursion planning help. Tell us your itinerary, ship, and interests and we will point you to the best port guides and excursion picks.",
  path: "/plan-my-alaska-cruise",
  keywords: ["plan Alaska cruise", "Alaska excursion planning", "Alaska cruise help"],
});

const planningTopics = [
  {
    subject: "Alaska cruise itinerary planning",
    description: "Help choosing ports, excursion types, and day-by-day planning for your sailing.",
  },
  {
    subject: "Shore excursion recommendations",
    description: "Personalised excursion ideas based on your ship, ports, and traveller style.",
  },
  {
    subject: "Independent vs ship excursions",
    description: "Guidance on booking local operators and timing your port days safely.",
  },
];

export default function PlanMyAlaskaCruisePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Plan My Alaska Cruise", path: "/plan-my-alaska-cruise" },
        ])}
      />
      <PageHero
        title="Plan My Alaska Cruise"
        subtitle="Tell us about your sailing and we will help you plan smarter port days with the right guides and excursion picks."
        compact
      />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Plan My Alaska Cruise", path: "/plan-my-alaska-cruise" },
            ]}
          />

          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Start with the Excursion Finder</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For instant personalised recommendations, use the Alaska Excursion Finder first. It matches your ports,
                traveller style, and time ashore to excursion picks with return-to-ship confidence scores.
              </p>
              <Link href="/alaska-cruise-excursion-planner" className="btn-primary">
                Open Alaska Excursion Finder
              </Link>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Need Human Help?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Email our team with your ship, sailing dates, and ports. We aim to respond within two business days with
                planning pointers and links to the most relevant guides on the site.
              </p>
              <a href={`mailto:${SITE.email}?subject=${encodeURIComponent("Plan my Alaska cruise")}`} className="btn-secondary">
                Email {SITE.email}
              </a>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">What We Can Help With</h2>
              <div className="space-y-3">
                {planningTopics.map((topic) => (
                  <a
                    key={topic.subject}
                    href={`mailto:${SITE.email}?subject=${encodeURIComponent(topic.subject)}`}
                    className="card block hover:border-caribbean-200 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">{topic.subject}</h3>
                    <p className="mt-1 text-sm text-gray-600">{topic.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
