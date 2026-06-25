/**
 * QR code helpers for PDF generation.
 * Uses a public QR image API; swap implementation here when a local generator is added.
 */

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

const QR_IMAGE_API = "https://api.qrserver.com/v1/create-qr-code/";

export async function fetchQrCodeDataUrl(
  targetUrl: string,
  sizePx = 120,
): Promise<string | undefined> {
  try {
    const qrUrl = `${QR_IMAGE_API}?size=${sizePx}x${sizePx}&data=${encodeURIComponent(targetUrl)}`;
    const response = await fetch(qrUrl);
    if (!response.ok) return undefined;
    const blob = await response.blob();
    return await blobToDataUrl(blob);
  } catch {
    return undefined;
  }
}

/** Preload QR images for a set of action URLs (deduped). */
export async function preparePdfQrCodes(urls: string[]): Promise<Record<string, string>> {
  const unique = [...new Set(urls.filter(Boolean))];
  const entries = await Promise.all(
    unique.map(async (url) => {
      const dataUrl = await fetchQrCodeDataUrl(url);
      return dataUrl ? ([url, dataUrl] as const) : null;
    }),
  );

  return Object.fromEntries(entries.filter((entry): entry is [string, string] => entry !== null));
}
