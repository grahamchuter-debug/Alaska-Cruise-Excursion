import { HERO_IMAGE } from "@/lib/hero-image";

export interface PdfBrandAssets {
  heroImageDataUrl?: string;
  /** Per-port destination photography for magazine PDF layouts. */
  portHeroDataUrls?: Record<string, string>;
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/** Load hero image and other brand assets for browser PDF generation. */
export async function loadPdfBrandAssets(): Promise<PdfBrandAssets> {
  if (typeof window === "undefined") return {};

  try {
    const response = await fetch(HERO_IMAGE.src);
    if (!response.ok) return {};
    const blob = await response.blob();
    return { heroImageDataUrl: await blobToDataUrl(blob) };
  } catch {
    return {};
  }
}
