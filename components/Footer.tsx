import Link from "next/link";
import { SITE } from "@/lib/site";
import { excursionTypes } from "@/data/excursion-types";
import { getAllPortSlugs } from "@/data/ports";

const planYourCruise = [
  { href: "/alaska-cruise-excursion-planner", label: "Alaska Excursion Finder" },
  { href: "/plan-my-alaska-cruise", label: "Plan my Alaska cruise" },
  { href: "/ship-schedules", label: "Ship schedules" },
  { href: "/alaska-faq", label: "Alaska FAQ" },
  { href: "/ports", label: "Port guides" },
];

const popularPorts = [
  { href: "/ports/juneau", label: "Juneau" },
  { href: "/ports/skagway", label: "Skagway" },
  { href: "/ports/ketchikan", label: "Ketchikan" },
  { href: "/ports/seward", label: "Seward" },
  { href: "/ports/icy-strait", label: "Icy Strait" },
  { href: "/ports/haines", label: "Haines" },
];

const excursionTypeLinks = excursionTypes.slice(0, 6).map((t) => ({
  href: `/excursion-types/${t.slug}`,
  label: t.name,
}));

const guides = [
  { href: "/best-alaska-shore-excursions", label: "Best shore excursions" },
  { href: "/best-alaska-whale-watching-excursions", label: "Whale watching" },
  { href: "/best-alaska-glacier-excursions", label: "Glacier excursions" },
  { href: "/seward-vs-whittier-cruise-port", label: "Seward vs Whittier" },
  { href: "/haines-vs-skagway", label: "Haines vs Skagway" },
  { href: "/alaska-cruise-with-denali", label: "Cruise with Denali" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

const footerLinkClass =
  "inline-block text-[13px] leading-snug text-caribbean-100/70 transition-[color,opacity,transform] duration-300 ease-out hover:text-white/95 hover:translate-x-0.5";

const columnHeadingClass = "mb-3 text-sm font-medium text-white/90";

function FooterColumn({
  title,
  links,
  viewAll,
}: {
  title: string;
  links: { href: string; label: string }[];
  viewAll?: { href: string; label: string };
}) {
  return (
    <div>
      <h3 className={columnHeadingClass}>{title}</h3>
      <ul className="space-y-1.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={footerLinkClass}>
              {link.label}
            </Link>
          </li>
        ))}
        {viewAll && (
          <li className="pt-2.5">
            <Link
              href={viewAll.href}
              className="group/pill inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-caribbean-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-turquoise/30 hover:from-white/[0.1] hover:to-white/[0.04] hover:text-white"
            >
              {viewAll.label}
              <span aria-hidden="true" className="text-[10px] opacity-60 group-hover/pill:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const portCount = getAllPortSlugs().length;

  return (
    <footer className="relative mt-auto bg-footer-depth text-white">
      <div className="relative" aria-hidden="true">
        <div className="absolute inset-x-0 -top-px h-8 bg-gradient-to-b from-turquoise/[0.06] to-transparent blur-sm" />
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-12 lg:px-8 lg:pb-12 lg:pt-14">
        <div className="container-wide">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-[minmax(0,1.35fr)_repeat(4,minmax(0,1fr))] lg:gap-x-10">
            <div className="max-w-xs sm:col-span-2 lg:col-span-1 lg:max-w-sm">
              <Link href="/" className="group inline-flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hero-gradient text-sm font-bold tracking-tight text-white shadow-lg ring-1 ring-white/15">
                  AK
                </div>
                <div className="min-w-0">
                  <div className="font-display text-[1.25rem] font-semibold leading-tight text-white">
                    Alaska Cruise Excursion
                  </div>
                  <div className="mt-0.5 text-xs font-medium tracking-wide text-caribbean-200/80">
                    Port &amp; excursion planning
                  </div>
                </div>
              </Link>
              <p className="mt-5 text-sm leading-relaxed text-caribbean-100/70">
                Independent Alaska cruise planning — ports, excursion types, ship schedules, and specialist operator
                links. Enquiry and planning only; not a booking engine.
              </p>
            </div>

            <FooterColumn title="Plan your cruise" links={planYourCruise} />
            <FooterColumn
              title="Alaska ports"
              links={popularPorts}
              viewAll={{ href: "/ports", label: `All ${portCount} ports` }}
            />
            <FooterColumn
              title="Excursion types"
              links={excursionTypeLinks}
              viewAll={{ href: "/excursion-types", label: "All activities" }}
            />
            <FooterColumn title="Authority guides" links={guides} viewAll={{ href: "/best-alaska-guides", label: "All guides" }} />
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-wide px-4 py-3.5 sm:px-6 lg:px-8">
          <p className="text-center text-xs leading-relaxed text-caribbean-200/75 sm:text-left">
            Confirm ship times before booking shore excursions. Victoria, BC may appear on some itineraries but is not
            an Alaska port.
          </p>
        </div>
      </div>

      <div className="border-t border-white/[0.06] bg-black/25">
        <div className="container-wide flex flex-col items-center gap-2.5 px-4 py-3.5 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-wide text-caribbean-400/90">
            &copy; {year} {SITE.name}
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1" aria-label="Footer legal">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-[11px] text-caribbean-300/75 hover:text-white/90">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
