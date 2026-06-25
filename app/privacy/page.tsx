import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Alaska Cruise Excursion.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <PageHero title="Privacy Policy" compact />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Privacy Policy", path: "/privacy" },
            ]}
          />
          <p className="text-gray-700 leading-relaxed">
            Our privacy policy is being finalized. For questions, please{" "}
            <Link href="/contact" className="text-caribbean-700 underline underline-offset-2">
              contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
