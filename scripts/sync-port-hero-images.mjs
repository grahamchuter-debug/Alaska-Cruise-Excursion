#!/usr/bin/env node
/**
 * Download port hero images from specialist shore-excursion sites into public/images/ports/.
 * Run: node scripts/sync-port-hero-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "images", "ports");

/** slug → remote URL (from specialist site hero / best available destination photo) */
export const PORT_HERO_REMOTE = {
  "st-thomas": "https://stthomasshoreexcursion.com/images/hero-st-thomas-magens-bay.jpg",
  cozumel: "https://cozumelcruiseexcursion.com/images/hero-cozumel.png",
  aruba: "https://arubashoreexcursion.com/images/hero-aruba.png",
  curacao: "https://curacaocruiseexcursions.com/images/hero-flamingos.png",
  "grand-cayman": "https://grandcaymanshoreexcursion.com/images/hero-grand-cayman.png",
  "st-maarten": "https://stmaartenshoreexcursion.com/images/hero-st-maarten.png",
  nassau: "https://nassaucruiseexcursions.com/images/hero-nassau.png",
  roatan: "https://roatanexcursionplanner.com/images/hero-roatan.png",
  "puerto-limon": "https://puertolimonshoreexcursion.com/images/hero-puerto-limon.png",
  "puerto-plata": "https://puertoplatacruiseexcursion.com/images/hero-puerto-plata.png",
  tortola: "https://tortolashoreexcursions.com/images/hero-tortola-home.jpg",
  progreso: "https://progresoshoreexcursion.com/images/hero-progreso.png",
  "costa-maya":
    "https://costamayashoreexcursions.com/wp-content/uploads/2020/06/chacchoben-mayan-city-seven-color-lagoon-605x605.jpg",
  falmouth:
    "https://www.falmouthshoreexcursions.com/wp-content/uploads/2025/08/Doublefalls-2-900x600.jpg",
  bonaire: "https://bonairetoursandvacations.com/images/home/hero-3.png",
  "ocho-rios": "https://ochoriosshoreexcursion.com/images/hero-home.jpg",
  "montego-bay": "https://montegobayshoreexcursion.com/images/hero-home.jpg",
  samana: "https://samanashoreexcursion.com/images/whale-watching-samana-bay.png",
  "la-romana": "https://laromanashoreexcursion.com/images/hero-la-romana.png",
};

async function download(slug, url) {
  const ext = path.extname(new URL(url).pathname) || ".jpg";
  const dest = path.join(outDir, `${slug}${ext}`);
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.byteLength < 5000) throw new Error(`too small (${buf.byteLength} bytes)`);
  fs.writeFileSync(dest, buf);
  return { dest, bytes: buf.byteLength, ext };
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const results = [];

  for (const [slug, url] of Object.entries(PORT_HERO_REMOTE)) {
    try {
      const { dest, bytes, ext } = await download(slug, url);
      results.push({ slug, ok: true, ext, bytes, path: path.relative(root, dest) });
      console.log(`✓ ${slug} (${bytes} bytes) → ${path.relative(root, dest)}`);
    } catch (err) {
      results.push({ slug, ok: false, error: String(err.message ?? err) });
      console.error(`✗ ${slug}: ${err.message ?? err}`);
    }
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length) process.exitCode = 1;
  console.log(`\n${results.filter((r) => r.ok).length}/${results.length} port heroes synced.`);
}

main();
