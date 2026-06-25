# Alaska Cruise Excursion

Authority hub website for [alaskacruiseexcursion.com](https://alaskacruiseexcursion.com) — helping cruise passengers plan Alaska itineraries, compare ports, and choose shore excursions.

## Tech Stack

- **Next.js 15** (App Router, static export)
- **TypeScript**
- **Tailwind CSS**

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) during local development.

## Production Build

```bash
npm run build
```

Static files are exported to the `out/` directory.

## Cloudflare Pages Deployment

This is a **Next.js static export**. Cloudflare must run the build — the repository does not contain pre-built HTML.

### Git-connected deployment (recommended)

In **Cloudflare Dashboard → Workers & Pages → your project → Settings → Builds → Edit configuration**:

| Setting | Value |
|---------|-------|
| Framework preset | **Next.js (Static HTML Export)** |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | `20` |

Then click **Save** and **Retry deployment**.

Alternative build command: `bash build.sh`

### Direct Upload (alternative)

1. Run `npm run build` locally.
2. Upload the **contents** of the `out/` folder via Direct Upload.
3. Set custom domain to `alaskacruiseexcursion.com`.

## Site Structure

| Route | Description |
|-------|-------------|
| `/` | Activity-led homepage |
| `/ports` | Alaska port listing |
| `/ports/[slug]` | Individual port guides |
| `/alaska-cruise-excursion-planner` | Excursion finder and day planner |
| `/ship-schedules` | Ship schedule hub |
| `/ship-schedules/[slug]` | Port-specific schedules |
| `/alaska-cruise-lines` | Cruise line listing |
| `/alaska-cruise-ships` | Featured ship guides |
| `/excursion-types` | Excursion category listing |
| `/best-alaska-guides` | Authority guide hub |
| `/[slug]` | Best guides and port comparisons |
| `/about` | About page |
| `/contact` | Contact page |

## SEO

- Unique metadata per page
- Open Graph and Twitter cards
- JSON-LD: BreadcrumbList, FAQPage, TravelGuide, Organization, WebSite
- Auto-generated `sitemap.xml` and `robots.txt`

## Data Layer

Content lives in `data/` as TypeScript modules. Ship schedules use a framework in `data/schedules.ts` with JSON imports in `data/imported-schedules/` — no placeholder sailings are invented.

## Deployment

Configure your host to serve the `out/` directory. Set the production domain to `alaskacruiseexcursion.com`.
