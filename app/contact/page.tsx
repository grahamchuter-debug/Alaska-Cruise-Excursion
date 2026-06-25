import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact Alaska Cruise Excursion for cruise planning questions, partnership inquiries, or feedback on our port guides and excursion resources.",
  path: "/contact",
  keywords: ["contact", "cruise planning help"],
});

const contactOptions = [
  {
    subject: "General cruise planning inquiry",
    description: "Questions about Alaska ports, excursions, or itinerary planning.",
  },
  {
    subject: "Port guide feedback",
    description: "Suggestions to improve a port guide or report outdated information.",
  },
  {
    subject: "Partnership inquiry",
    description: "Interested in joining our Alaska port specialist network.",
  },
  {
    subject: "Ship schedule information",
    description: "Corrections or updates to published ship schedule data.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        title="Contact Us"
        subtitle="Questions about Alaska cruise planning? We'd love to hear from you."
        compact
      />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]}
          />

          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-700 leading-relaxed">
                Whether you have a question about a specific port, want to suggest a new guide, or are interested in partnering with our port network, email our team directly. We aim to respond within two business days.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card">
                <h3 className="font-semibold text-gray-900">Email</h3>
                <a href={`mailto:${SITE.email}`} className="text-caribbean-700 hover:underline mt-1 block">
                  {SITE.email}
                </a>
              </div>
              <div className="card">
                <h3 className="font-semibold text-gray-900">Website</h3>
                <a href={SITE.url} className="text-caribbean-700 hover:underline mt-1 block">
                  {SITE.url}
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">How Can We Help?</h2>
              <div className="space-y-3">
                {contactOptions.map((option) => (
                  <a
                    key={option.subject}
                    href={`mailto:${SITE.email}?subject=${encodeURIComponent(option.subject)}`}
                    className="card block hover:border-caribbean-200 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">{option.subject}</h3>
                    <p className="mt-1 text-sm text-gray-600">{option.description}</p>
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
