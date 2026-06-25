import Link from "next/link";
import type { Port } from "@/data/types";
import { DestinationHeroBand } from "@/components/DestinationHeroBand";
import { NavCardCta } from "@/components/NavCardCta";

export function PortCard({ port }: { port: Port }) {
  return (
    <Link
      href={`/ports/${port.slug}`}
      className="card-editorial group flex h-full flex-col"
    >
      <DestinationHeroBand
        imageTheme={port.imageTheme}
        imageAlt={port.imageAlt}
        title={port.name}
        subtitle={port.country}
        portSlug={port.slug}
      >
        <span className="absolute right-3 top-3 z-10 rounded-full border border-white/25 bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {port.region}
        </span>
      </DestinationHeroBand>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">{port.tagline}</p>
        <p className="mt-3 text-xs font-medium text-gray-500">Why we recommend it</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {port.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="rounded-full border border-caribbean-100 bg-caribbean-50/60 px-2.5 py-0.5 text-xs text-caribbean-900"
            >
              {h}
            </span>
          ))}
        </div>
        <NavCardCta className="pt-5">View port guide</NavCardCta>
      </div>
    </Link>
  );
}
