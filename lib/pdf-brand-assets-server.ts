import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { HERO_IMAGE } from "@/lib/hero-image";
import { getAllPortSlugs } from "@/data/ports";
import type { PdfBrandAssets } from "@/lib/pdf-brand-assets";

const PORT_HERO_FILES: Record<string, string> = {
  "st-thomas": "st-thomas.jpg",
  cozumel: "cozumel.png",
  aruba: "aruba.png",
  curacao: "curacao.png",
  "grand-cayman": "grand-cayman.png",
  "st-maarten": "st-maarten.png",
  nassau: "nassau.png",
  roatan: "roatan.png",
  "costa-maya": "costa-maya.jpg",
  "puerto-limon": "puerto-limon.png",
  "puerto-plata": "puerto-plata.png",
  "ocho-rios": "ocho-rios.jpg",
  falmouth: "falmouth.jpg",
  bonaire: "bonaire.png",
  tortola: "tortola.jpg",
  progreso: "progreso.png",
  samana: "samana.png",
  "la-romana": "la-romana.png",
  "montego-bay": "montego-bay.jpg",
};

function toDataUrl(buffer: Buffer, mime: string): string {
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

function mimeForFilename(filename: string): string {
  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "image/jpeg";
  if (filename.endsWith(".webp")) return "image/webp";
  return "image/png";
}

function loadPortHeroImages(projectRoot: string): Record<string, string> {
  const urls: Record<string, string> = {};
  const portsDir = join(projectRoot, "public", "images", "ports");

  for (const slug of getAllPortSlugs()) {
    const filename = PORT_HERO_FILES[slug];
    if (!filename) continue;
    const filePath = join(portsDir, filename);
    if (!existsSync(filePath)) continue;
    try {
      const buffer = readFileSync(filePath);
      urls[slug] = toDataUrl(buffer, mimeForFilename(filename));
    } catch {
      // skip missing port asset
    }
  }

  return urls;
}

/** Load brand assets from disk (Node smoke tests / sample generation). */
export function loadPdfBrandAssetsFromDisk(projectRoot: string): PdfBrandAssets {
  const assets: PdfBrandAssets = { portHeroDataUrls: loadPortHeroImages(projectRoot) };

  try {
    const heroPath = join(projectRoot, "public", HERO_IMAGE.src.replace(/^\//, ""));
    const buffer = readFileSync(heroPath);
    assets.heroImageDataUrl = toDataUrl(buffer, "image/png");
  } catch {
    // optional global hero
  }

  return assets;
}
