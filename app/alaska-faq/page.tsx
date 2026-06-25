import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { alaskaFaqs } from "@/data/alaska-faqs";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Alaska Cruise FAQ | Shore Excursion Planning",
  description:
    "Answers to common Alaska cruise and shore excursion planning questions: best ports, independent booking, season timing, and using the Excursion Finder.",
  path: "/alaska-faq",
  keywords: ["Alaska cruise FAQ", "Alaska shore excursions", "Alaska cruise planning"],
});

export default function AlaskaFaqPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Alaska FAQ", path: "/alaska-faq" },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(alaskaFaqs),
          travelGuideSchema({
            title: "Alaska Cruise FAQ",
            description: "Frequently asked questions about Alaska cruise shore excursion planning.",
            path: "/alaska-faq",
          }),
        ]}
      />
      <PageHero
        title="Alaska Cruise FAQ"
        subtitle="Common questions about Alaska cruise ports, shore excursions, and independent planning."
        compact
      />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <FAQSection faqs={alaskaFaqs} />
        </div>
      </section>
    </>
  );
}
