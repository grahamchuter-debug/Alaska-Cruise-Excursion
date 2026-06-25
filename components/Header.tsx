"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/alaska-cruise-excursion-planner", label: "Excursion Finder" },
  { href: "/excursion-types", label: "Activities" },
  { href: "/ports", label: "Ports" },
  { href: "/ship-schedules", label: "Schedules" },
  { href: "/alaska-cruise-lines", label: "Cruise Lines" },
  { href: "/alaska-cruise-ships", label: "Ships" },
  { href: "/best-alaska-guides", label: "Guides" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-caribbean-100 bg-white/95 backdrop-blur-sm">
      <div className="container-wide flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hero-gradient text-white font-bold text-sm shadow-md">
            AK
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-lg font-bold text-caribbean-800 group-hover:text-caribbean-600 transition-colors leading-tight">
              Alaska Cruise
            </div>
            <div className="text-xs text-gray-500 -mt-0.5">Excursion</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="lg:hidden rounded-lg p-2 text-gray-700 hover:bg-caribbean-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-caribbean-100 bg-white px-4 py-4" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-caribbean-50 hover:text-caribbean-700"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
