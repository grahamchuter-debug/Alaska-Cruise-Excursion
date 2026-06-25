import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms of use for Alaska Cruise Excursion.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />
      <PageHero title="Terms of Use" compact />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Terms", path: "/terms" },
            ]}
          />
          <p className="text-gray-700 leading-relaxed">
            Our terms of use are being finalized. For questions, please{" "}
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
