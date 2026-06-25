# Booking Journey Audit — Caribbean Shore Excursion Planner

**Date:** June 2025  
**Scope:** Homepage, Cruise Planner, Excursion Finder, Cruise Day Plan, Port pages, Excursion type pages, Comparison pages, Ship pages, Cruise line pages

## Standard CTA pattern

All port-level booking actions now use `ExcursionCardCTAs`:

| Priority | Label | Destination |
| --- | --- | --- |
| Primary | View Recommended Excursions | Specialist site category URL when available (e.g. `/beaches`, `/snorkeling`, `/family-tours`, `/private-tours`) or specialist homepage |
| Secondary | View Port Guide | `/ports/{slug}` |
| Third | Check Ship Schedule | `/ship-schedules/{slug}` when schedule data exists |

Category routing is handled by `lib/specialist-links.ts` via `getSpecialistExcursionUrl()`.

Hub-level pages without a single port use `BookingJourneyPanel` (Excursion Finder, Port Guides, Ship Schedules, Excursion Types).

---

## Pages updated

| Page type | File(s) | Changes |
| --- | --- | --- |
| **Shared CTA component** | `components/ExcursionCardCTAs.tsx` | Primary label → "View Recommended Excursions"; added `on-dark` variant for port heroes |
| **Booking panel** | `components/BookingJourneyPanel.tsx` | New reusable hub/port booking next-step panel |
| **Homepage** | `components/AuthorityPortCard.tsx` | Featured port cards now use full 3-CTA strip with specialist category links |
| **Cruise Planner** | `app/cruise-planner/page.tsx` | Step 1 port list includes booking CTAs per port; closing `BookingJourneyPanel` |
| **Excursion Finder** | `app/caribbean-excursion-finder/page.tsx` | Comparison table + mobile cards + port-day mistakes include CTAs; closing panel |
| **Cruise Day Plan** | `components/CruiseDayPlanView.tsx` | Port Information section uses CTAs; closing `BookingJourneyPanel` before PDF download |
| **Port pages** | `app/ports/[slug]/page.tsx`, `components/PortPlanningToolkit.tsx` | Hero CTAs (on-dark), toolkit strip, attractions footer, closing panel |
| **Excursion type pages** | `components/ExcursionTypePageView.tsx` | Best Ports cards include category-aware specialist links |
| **Comparison pages** | `components/ComparisonPageView.tsx` | Port booking cards use standard 3-CTA strip |
| **Ship pages** | `components/ShipPageView.tsx` | Common ports use standard CTAs; closing finder/line/schedule panel |
| **Cruise line hub** | `app/cruise-lines/[slug]/page.tsx`, `components/CruiseLinePlanningSections.tsx` | Popular port cards standardized; hub booking panel + guide/finder links |
| **Cruise line guide** | `components/CruiseLineGuidePageView.tsx` | Already had `ExcursionCardCTAs` on recommendations (label updated via shared component) |
| **PDF** | `lib/cruise-day-plan-pdf.ts` | Specialist link label aligned to "View Recommended Excursions" |

---

## CTAs added (summary)

- **19 port pages** — hero, planning toolkit, attractions, and footer booking panels
- **Cruise Planner** — 19 port cards in Step 1 + hub closing panel
- **Excursion Finder** — comparison rows (desktop + mobile) + mistake cards + closing panel
- **Homepage** — 8 featured port cards upgraded to 3-CTA pattern
- **Comparison pages** — 2 port cards per comparison (all comparison slugs)
- **Ship pages** — common port grid per ship + ship-level booking panel
- **Excursion type pages** — Best Ports section per type page
- **Cruise line hubs** — popular port grid + booking panel per line

---

## Specialist URLs used

Specialist excursion links resolve through `getSpecialistExcursionUrl()`:

- **Category paths** (when supported): `{specialistUrl}/beaches`, `/snorkeling`, `/family-tours`, `/private-tours`, `/catamaran-cruises`, `/adventure-tours`
- **Homepage-only specialists** (no category paths): St. Thomas, Curaçao, Costa Maya, Bonaire, Tortola → specialist homepage
- **Context inference**: excursion type slug, section hints, guide hrefs, and excursion name text

All 19 Caribbean ports in `data/ports.ts` have `specialistUrl` and `specialistName` configured.

---

## Dead ends addressed

| Previous dead end | Fix |
| --- | --- |
| Cruise Planner Step 1 port list (guide link only) | Added specialist + schedule CTAs per port |
| Excursion Finder comparison table (port name link only) | Added Next steps column / mobile CTAs |
| Port day mistake cards (single guide link) | Full 3-CTA strip |
| Comparison port cards (guide primary, specialist secondary) | Standardized order: excursions → guide → schedule |
| Ship common port cards (guide primary) | Standardized via `ExcursionCardCTAs` |
| Excursion type Best Ports (information only) | Added category-aware booking CTAs |
| Cruise Day Plan port information (guide text link only) | Full CTA strip + closing panel |
| Cruise line hub (planning only, weak booking exit) | Booking panel + shore excursions guide link |

---

## Verification

```bash
npm run build
npm run check-links
```
