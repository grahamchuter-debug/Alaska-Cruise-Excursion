import Link from "next/link";
import type { PortRelatedLink } from "@/data/types";
import { NavCardCta } from "@/components/NavCardCta";

export function PortRelatedLinks({ links }: { links: PortRelatedLink[] }) {
  if (links.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="section-title text-2xl sm:text-3xl mb-6">Related Caribbean Ports &amp; Planning</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-gradient group flex h-full flex-col"
            >
              <span className="font-medium text-gray-900 group-hover:text-caribbean-700">{link.label}</span>
              <NavCardCta className="pt-3">Visit website</NavCardCta>
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className="card-gradient group flex h-full flex-col"
            >
              <span className="font-medium text-gray-900 group-hover:text-caribbean-700">{link.label}</span>
              <NavCardCta className="pt-3">View guide</NavCardCta>
            </Link>
          )
        )}
      </div>
    </section>
  );
}
