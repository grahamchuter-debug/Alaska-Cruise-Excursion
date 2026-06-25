#!/usr/bin/env node
/**
 * Download port hero images from specialist Alaska shore-excursion sites into public/images/ports/.
 * Run: node scripts/sync-port-hero-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "images", "ports");

/** slug → remote URL (from specialist site homepage hero) */
export const PORT_HERO_REMOTE = {
  juneau: "https://juneaushoreexcursion.com/images/hero-cruise-ship.png",
  skagway: "https://skagwayshoreexcursions.com/hero-white-pass-railway.png",
  ketchikan:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
  seward: "https://sewardshoreexcursion.com/images/hero-seward.png",
  haines: "https://hainesshoreexcursions.com/images/hero-haines.png",
  whittier: "https://whittiershoreexcursions.com/images/hero-whittier.png",
  denali: "https://denalishoreexcursions.com/images/hero-denali.png",
  sitka: "https://sitkashoreexcursion.com/images/hero-sitka-bears.jpg",
  "ward-cove": "https://wardcoveshoreexcursions.com/images/ward-cove-hero.png",
};

async function download(slug, url) {
  const parsed = new URL(url);
  let ext = path.extname(parsed.pathname);
  if (!ext || ext.length > 5) ext = ".jpg";
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
