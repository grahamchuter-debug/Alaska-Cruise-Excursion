import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero title="Page Not Found" subtitle="The page you are looking for does not exist or has been moved." compact />
      <section className="section-padding text-center">
        <div className="container-wide max-w-lg mx-auto">
          <p className="font-display text-6xl font-bold text-caribbean-700">404</p>
          <Link href="/" className="btn-primary mt-8 inline-flex">
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
