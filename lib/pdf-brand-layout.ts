import type { jsPDF } from "jspdf";
import type { MatchTier } from "@/lib/excursion-finder-engine";
import type { CruiseConfidenceLevel } from "@/lib/cruise-confidence";
import { MATCH_BADGE_COLORS, PDF_BRAND, type Rgb } from "@/lib/pdf-brand-tokens";
import type { PdfBrandAssets } from "@/lib/pdf-brand-assets";
import { PDF_PORT_THEMES, type PdfThemeGradient } from "@/lib/pdf-port-themes";

export const PDF_PAGE = {
  width: 210,
  height: 297,
  margin: 16,
  footerY: 287,
} as const;

export const PDF_CONTENT_WIDTH = PDF_PAGE.width - PDF_PAGE.margin * 2;

export function drawThemeGradientBand(
  doc: jsPDF,
  theme: PdfThemeGradient,
  x: number,
  y: number,
  w: number,
  h: number,
  overlay = true,
): void {
  const steps = 12;
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const r = Math.round(theme.start[0] + (theme.end[0] - theme.start[0]) * t);
    const g = Math.round(theme.start[1] + (theme.end[1] - theme.start[1]) * t);
    const b = Math.round(theme.start[2] + (theme.end[2] - theme.start[2]) * t);
    doc.setFillColor(r, g, b);
    doc.rect(x + (w / steps) * i, y, w / steps + 0.5, h, "F");
  }

  if (overlay) {
    doc.setFillColor(0, 71, 112);
    for (let i = 0; i < 5; i++) {
      const alpha = 0.12 + i * 0.06;
      const mix = 1 - alpha;
      doc.setFillColor(
        Math.round(PDF_BRAND.colors.caribbean900[0] * alpha + 255 * mix * 0),
        Math.round(PDF_BRAND.colors.caribbean900[1] * alpha + 255 * mix * 0),
        Math.round(PDF_BRAND.colors.caribbean900[2] * alpha + 255 * mix * 0.2),
      );
      doc.rect(x, y + (h / 5) * i, w, h / 5 + 0.5, "F");
    }
  }
}

export function drawPillBadge(
  doc: jsPDF,
  label: string,
  x: number,
  y: number,
  fill: Rgb,
  textColor: Rgb = PDF_BRAND.colors.white,
): number {
  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(6.5);
  const width = doc.getTextWidth(label) + 8;
  doc.setFillColor(...fill);
  doc.roundedRect(x, y - 4.5, width, 7, 2, 2, "F");
  doc.setTextColor(...textColor);
  doc.text(label, x + 4, y);
  return width;
}

const CONFIDENCE_BADGE_COLORS: Record<CruiseConfidenceLevel, Rgb> = {
  high: [16, 120, 84],
  medium: [180, 120, 8],
  "plan-carefully": [72, 88, 120],
};

const CONFIDENCE_PANEL_PALETTE: Record<
  CruiseConfidenceLevel,
  { bg: Rgb; accent: Rgb }
> = {
  high: { bg: [240, 250, 246], accent: [16, 120, 84] },
  medium: { bg: [255, 250, 240], accent: [180, 120, 8] },
  "plan-carefully": { bg: [245, 247, 252], accent: [72, 88, 120] },
};

export function drawConfidenceBadge(
  doc: jsPDF,
  title: string,
  level: CruiseConfidenceLevel,
  x: number,
  y: number,
): number {
  const fill = CONFIDENCE_BADGE_COLORS[level];
  return drawPillBadge(doc, title.toUpperCase(), x, y, fill);
}

export function drawCoverStatTile(
  doc: jsPDF,
  label: string,
  value: string,
  x: number,
  y: number,
  w: number,
  h: number,
): void {
  drawCardSurface(doc, x, y, w, h, PDF_BRAND.colors.white);
  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(6);
  doc.setTextColor(...PDF_BRAND.colors.caribbean800);
  doc.text(label.toUpperCase(), x + 3, y + 5);
  doc.setFont(PDF_BRAND.fonts.display, "bold");
  doc.setFontSize(11);
  doc.setTextColor(...PDF_BRAND.colors.gray900);
  const valueLines = doc.splitTextToSize(value, w - 6);
  doc.text(valueLines.slice(0, 2), x + 3, y + 11);
}

export function drawRoutePortChip(
  doc: jsPDF,
  index: number,
  portName: string,
  region: string,
  x: number,
  y: number,
  w: number,
): number {
  const h = 18;
  drawCardSurface(doc, x, y, w, h, PDF_BRAND.colors.white);
  doc.setFillColor(...PDF_BRAND.colors.caribbean700);
  doc.circle(x + 5, y + 5, 3, "F");
  doc.setTextColor(...PDF_BRAND.colors.white);
  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(7);
  doc.text(String(index), x + 5, y + 5.5, { align: "center" });

  doc.setTextColor(...PDF_BRAND.colors.gray900);
  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(8.5);
  const name = doc.splitTextToSize(portName, w - 12)[0] ?? portName;
  doc.text(name, x + 10, y + 6);

  doc.setFont(PDF_BRAND.fonts.body, "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...PDF_BRAND.colors.gray600);
  const regionLine = doc.splitTextToSize(region, w - 12)[0] ?? region;
  doc.text(regionLine, x + 10, y + 11);

  return h;
}

export function drawPremiumSectionHeader(
  doc: jsPDF,
  title: string,
  x: number,
  y: number,
  subtitle?: string,
): number {
  doc.setFillColor(...PDF_BRAND.colors.caribbean700);
  doc.roundedRect(x, y, PDF_CONTENT_WIDTH, subtitle ? 14 : 10, 2, 2, "F");
  doc.setTextColor(...PDF_BRAND.colors.white);
  doc.setFont(PDF_BRAND.fonts.display, "bold");
  doc.setFontSize(11);
  doc.text(title, x + 4, y + 7);
  if (subtitle) {
    doc.setFont(PDF_BRAND.fonts.body, "normal");
    doc.setFontSize(7);
    doc.setTextColor(230, 247, 251);
    doc.text(subtitle, x + 4, y + 12);
    return y + 18;
  }
  return y + 14;
}

export function drawPremiumCtaBox(
  doc: jsPDF,
  label: string,
  url: string,
  x: number,
  y: number,
  w: number,
): number {
  const h = 16;
  doc.setFillColor(...PDF_BRAND.colors.caribbean800);
  doc.roundedRect(x, y, w, h, 3, 3, "F");
  doc.setFillColor(...PDF_BRAND.colors.caribbean700);
  doc.roundedRect(x + 1.5, y + 1.5, w - 3, h - 3, 2.5, 2.5, "F");
  doc.setTextColor(...PDF_BRAND.colors.white);
  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(10);
  doc.textWithLink(label, x + w / 2, y + 6.5, { align: "center", url });
  doc.setFont(PDF_BRAND.fonts.body, "normal");
  doc.setFontSize(6);
  doc.setTextColor(230, 247, 251);
  doc.text("Book with vetted local specialists", x + w / 2, y + 11.5, { align: "center" });
  return y + h + 4;
}

export interface PdfActionLink {
  label: string;
  url: string;
}

export function drawPortActionCtaBox(
  doc: jsPDF,
  links: PdfActionLink[],
  options: {
    heading?: string;
    qrDataUrl?: string;
    qrCaption?: string;
  },
  x: number,
  y: number,
  w: number,
): number {
  const heading = options.heading ?? "Ready to plan this port day?";
  const hasQr = Boolean(options.qrDataUrl);
  const boxH = hasQr ? 52 : 40;

  drawCardSurface(doc, x, y, w, boxH, PDF_BRAND.colors.caribbean50);
  doc.setFillColor(...PDF_BRAND.colors.caribbean700);
  doc.roundedRect(x, y, w, 10, 3, 3, "F");
  doc.setTextColor(...PDF_BRAND.colors.white);
  doc.setFont(PDF_BRAND.fonts.display, "bold");
  doc.setFontSize(10);
  doc.text(heading, x + 4, y + 6.5);

  const linkAreaW = hasQr ? w - 34 : w - 8;
  let linkY = y + 15;
  for (const link of links) {
    const buttonH = 8;
    doc.setFillColor(...PDF_BRAND.colors.white);
    doc.setDrawColor(...PDF_BRAND.colors.cardBorder);
    doc.roundedRect(x + 4, linkY, linkAreaW, buttonH, 2, 2, "FD");
    doc.setTextColor(...PDF_BRAND.colors.caribbean800);
    doc.setFont(PDF_BRAND.fonts.body, "bold");
    doc.setFontSize(8.5);
    doc.textWithLink(`${link.label} →`, x + 7, linkY + 5.2, { url: link.url });
    linkY += buttonH + 2.5;
  }

  if (hasQr && options.qrDataUrl) {
    const qrSize = 24;
    const qrX = x + w - qrSize - 5;
    const qrY = y + 13;
    try {
      doc.addImage(options.qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize, undefined, "FAST");
    } catch {
      // QR optional — links remain primary
    }
    doc.setFont(PDF_BRAND.fonts.body, "normal");
    doc.setFontSize(5.5);
    doc.setTextColor(...PDF_BRAND.colors.gray600);
    const caption = options.qrCaption ?? "Scan to book";
    doc.text(caption, qrX + qrSize / 2, qrY + qrSize + 3, { align: "center" });
  }

  return y + boxH + 4;
}

export function drawExcursionImageBand(
  doc: jsPDF,
  themeKey: keyof typeof PDF_PORT_THEMES,
  x: number,
  y: number,
  w: number,
  h: number,
  caption: string,
): void {
  drawThemeGradientBand(doc, PDF_PORT_THEMES[themeKey], x, y, w, h);
  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(7);
  doc.setTextColor(...PDF_BRAND.colors.white);
  doc.text(caption.toUpperCase(), x + 4, y + h - 4);
}

export function drawHeroGradient(doc: jsPDF, x: number, y: number, w: number, h: number): void {
  const steps = 10;
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const r = Math.round(0 + (64 - 0) * t);
    const g = Math.round(119 + (180 - 119) * t);
    const b = Math.round(182 + (216 - 182) * t);
    doc.setFillColor(r, g, b);
    doc.rect(x + (w / steps) * i, y, w / steps + 0.5, h, "F");
  }
}

export function drawHeroImageBand(
  doc: jsPDF,
  assets: PdfBrandAssets,
  x: number,
  y: number,
  w: number,
  h: number,
  imageDataUrl?: string,
): void {
  const heroUrl = imageDataUrl ?? assets.heroImageDataUrl;
  if (heroUrl) {
    try {
      const format = imageFormatFromDataUrl(heroUrl);
      doc.addImage(heroUrl, format, x, y, w, h, undefined, "FAST");
    } catch {
      drawHeroGradient(doc, x, y, w, h);
    }
  } else {
    drawHeroGradient(doc, x, y, w, h);
  }

  const overlaySteps = 6;
  for (let i = 0; i < overlaySteps; i++) {
    const t = i / (overlaySteps - 1);
    const alphaMix = 0.55 + t * 0.35;
    const base = PDF_BRAND.colors.caribbean900;
    const blend = PDF_BRAND.colors.caribbean700;
    const r = Math.round(base[0] * alphaMix + blend[0] * (1 - alphaMix));
    const g = Math.round(base[1] * alphaMix + blend[1] * (1 - alphaMix));
    const b = Math.round(base[2] * alphaMix + blend[2] * (1 - alphaMix));
    doc.setFillColor(r, g, b);
    doc.rect(x + (w / overlaySteps) * i, y, w / overlaySteps + 0.5, h, "F");
  }
}

export function drawSiteLogoMark(doc: jsPDF, x: number, y: number, size = 10): void {
  drawHeroGradient(doc, x, y - size + 2, size, size);
  doc.setFillColor(...PDF_BRAND.colors.white);
  doc.circle(x + size / 2, y - size / 2 + 2, size / 2, "F");
  drawHeroGradient(doc, x + 0.8, y - size + 2.8, size - 1.6, size - 1.6);
  doc.setTextColor(...PDF_BRAND.colors.white);
  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(size * 0.38);
  doc.text("CS", x + size / 2, y - size / 2 + 2.8, { align: "center" });
}

export function drawSiteWordmark(doc: jsPDF, x: number, y: number): number {
  drawSiteLogoMark(doc, x, y, 10);
  doc.setTextColor(...PDF_BRAND.colors.white);
  doc.setFont(PDF_BRAND.fonts.display, "bold");
  doc.setFontSize(11);
  doc.text(PDF_BRAND.siteShortLine, x + 13, y - 1.5);
  doc.setFont(PDF_BRAND.fonts.body, "normal");
  doc.setFontSize(7);
  doc.setTextColor(230, 247, 251);
  doc.text(PDF_BRAND.siteTagline, x + 13, y + 2.5);
  return y + 6;
}

export function drawEyebrowLabel(doc: jsPDF, text: string, x: number, y: number): void {
  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(7);
  doc.setTextColor(...PDF_BRAND.colors.caribbean800);
  doc.text(text.toUpperCase(), x, y);
}

export function drawDisplayTitle(doc: jsPDF, text: string, x: number, y: number, size = 22): void {
  doc.setFont(PDF_BRAND.fonts.display, "bold");
  doc.setFontSize(size);
  doc.setTextColor(...PDF_BRAND.colors.white);
  doc.text(text, x, y);
}

export function drawMatchBadge(
  doc: jsPDF,
  label: MatchTier,
  score: number,
  x: number,
  y: number,
): number {
  const rgb = MATCH_BADGE_COLORS[label] ?? MATCH_BADGE_COLORS["Good Match"];
  const text = `${label} · ${score}/100`;
  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(7);
  const width = doc.getTextWidth(text) + 8;
  doc.setFillColor(...rgb);
  doc.roundedRect(x, y - 4.5, width, 7, 2, 2, "F");
  doc.setTextColor(...PDF_BRAND.colors.white);
  doc.text(text, x + 4, y);
  return width;
}

export function drawCardSurface(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: Rgb = PDF_BRAND.colors.caribbean50,
): void {
  doc.setDrawColor(...PDF_BRAND.colors.cardBorder);
  doc.setFillColor(...fill);
  doc.roundedRect(x, y, w, h, 3, 3, "FD");
}

export function drawGradientCardSurface(doc: jsPDF, x: number, y: number, w: number, h: number): void {
  doc.setDrawColor(...PDF_BRAND.colors.caribbean100);
  doc.setFillColor(...PDF_BRAND.colors.caribbean50);
  doc.roundedRect(x, y, w, h, 3, 3, "FD");
  doc.setFillColor(248, 252, 255);
  doc.triangle(x, y, x + w, y, x, y + h * 0.45, "F");
}

export function drawBrandedFooter(doc: jsPDF, pageNumber: number): void {
  const y = PDF_PAGE.footerY;
  doc.setDrawColor(...PDF_BRAND.colors.caribbean100);
  doc.setLineWidth(0.3);
  doc.line(PDF_PAGE.margin, y - 6, PDF_PAGE.width - PDF_PAGE.margin, y - 6);

  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(...PDF_BRAND.colors.caribbean800);
  doc.text(PDF_BRAND.siteName, PDF_PAGE.margin, y - 1.5);

  doc.setFont(PDF_BRAND.fonts.body, "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...PDF_BRAND.colors.gray600);
  doc.text(PDF_BRAND.siteUrl.replace("https://", ""), PDF_PAGE.width / 2, y - 1.5, {
    align: "center",
  });
  doc.text(`Page ${pageNumber}`, PDF_PAGE.width - PDF_PAGE.margin, y - 1.5, { align: "right" });

  doc.setFontSize(6);
  doc.text(PDF_BRAND.disclaimer, PDF_PAGE.margin, y + 3.5);
}

export function drawPrimaryCta(doc: jsPDF, label: string, url: string, x: number, y: number, w: number): number {
  const h = 12;
  doc.setFillColor(...PDF_BRAND.colors.caribbean700);
  doc.roundedRect(x, y, w, h, 3, 3, "F");
  doc.setTextColor(...PDF_BRAND.colors.white);
  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(9.5);
  doc.textWithLink(label, x + w / 2, y + 5, { align: "center", url });
  doc.setFont(PDF_BRAND.fonts.body, "normal");
  doc.setFontSize(6.5);
  doc.text(url.replace("https://", ""), x + w / 2, y + 9, { align: "center" });
  return y + h + 4;
}

function drawImageVignette(doc: jsPDF, x: number, y: number, w: number, h: number): void {
  const steps = 5;
  for (let i = 0; i < steps; i++) {
    const alpha = 0.08 + i * 0.05;
    const mix = 1 - alpha;
    doc.setFillColor(
      Math.round(0 * alpha + 255 * mix),
      Math.round(30 * alpha + 255 * mix),
      Math.round(50 * alpha + 255 * mix),
    );
    const inset = (w / steps) * i * 0.35;
    doc.rect(x + inset, y + inset * 0.4, w - inset * 2, h - inset * 0.8, "F");
  }
}

function imageFormatFromDataUrl(dataUrl: string): "PNG" | "JPEG" | "WEBP" {
  if (dataUrl.includes("image/jpeg")) return "JPEG";
  if (dataUrl.includes("image/webp")) return "WEBP";
  return "PNG";
}

/** Rich destination band — themed gradient with optional hero crop and magazine vignette. */
export function drawLuxuryImageBand(
  doc: jsPDF,
  assets: PdfBrandAssets,
  theme: PdfThemeGradient,
  x: number,
  y: number,
  w: number,
  h: number,
  cropOffset = 0,
  imageDataUrl?: string,
): void {
  drawThemeGradientBand(doc, theme, x, y, w, h, false);

  const heroUrl = imageDataUrl ?? assets.heroImageDataUrl;
  if (heroUrl) {
    try {
      const imageW = w * 1.35;
      const format = imageFormatFromDataUrl(heroUrl);
      doc.addImage(heroUrl, format, x - cropOffset, y, imageW, h, undefined, "FAST");
    } catch {
      // Gradient fallback only
    }
  }

  const overlaySteps = 8;
  for (let i = 0; i < overlaySteps; i++) {
    const t = i / (overlaySteps - 1);
    const alpha = 0.35 + t * 0.45;
    const base = theme.end;
    const dark: Rgb = [12, 28, 42];
    doc.setFillColor(
      Math.round(dark[0] * alpha + base[0] * (1 - alpha)),
      Math.round(dark[1] * alpha + base[1] * (1 - alpha)),
      Math.round(dark[2] * alpha + base[2] * (1 - alpha)),
    );
    doc.rect(x + (w / overlaySteps) * i, y, w / overlaySteps + 0.5, h, "F");
  }

  const fadeSteps = 5;
  for (let i = 0; i < fadeSteps; i++) {
    const alpha = 0.15 + i * 0.12;
    const mix = 1 - alpha;
    doc.setFillColor(
      Math.round(0 * alpha + 255 * mix * 0),
      Math.round(20 * alpha + 255 * mix * 0.1),
      Math.round(40 * alpha + 255 * mix * 0.15),
    );
    doc.rect(x, y + h - (h / fadeSteps) * (i + 1), w, h / fadeSteps + 0.5, "F");
  }

  drawImageVignette(doc, x, y, w, h);
}

/** Editorial section title — magazine rule, no solid header bar. */
export function drawEditorialSectionTitle(
  doc: jsPDF,
  title: string,
  x: number,
  y: number,
  w: number,
  subtitle?: string,
): number {
  doc.setDrawColor(...PDF_BRAND.colors.caribbean600);
  doc.setLineWidth(0.4);
  doc.line(x, y, x + 18, y);

  doc.setFont(PDF_BRAND.fonts.display, "bold");
  doc.setFontSize(13);
  doc.setTextColor(...PDF_BRAND.colors.gray900);
  doc.text(title, x, y + 6);

  let bottom = y + 10;
  if (subtitle) {
    doc.setFont(PDF_BRAND.fonts.body, "normal");
    doc.setFontSize(8);
    doc.setTextColor(...PDF_BRAND.colors.gray600);
    doc.text(subtitle, x, y + 11);
    bottom = y + 15;
  }

  return bottom + 4;
}

export interface ExperienceCardOptions {
  portName: string;
  excursionName: string;
  whyLoveIt: string[];
  duration: string;
  excursionType: string;
  matchLabel?: MatchTier;
  matchScore?: number;
  imageTheme: keyof typeof PDF_PORT_THEMES;
  assets?: PdfBrandAssets;
  cropOffset?: number;
  portHeroDataUrl?: string;
  sectionLabel?: string;
}

/** Magazine-style experience card with imagery and editorial bullets. */
export function drawExperienceCard(
  doc: jsPDF,
  options: ExperienceCardOptions,
  x: number,
  y: number,
  w: number,
): number {
  const imageH = 34;
  const theme = PDF_PORT_THEMES[options.imageTheme];
  drawLuxuryImageBand(
    doc,
    options.assets ?? {},
    theme,
    x,
    y,
    w,
    imageH,
    options.cropOffset ?? 0,
    options.portHeroDataUrl,
  );

  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(230, 247, 251);
  doc.text(options.portName.toUpperCase(), x + 4, y + imageH - 14);

  doc.setFont(PDF_BRAND.fonts.display, "bold");
  doc.setFontSize(14);
  doc.setTextColor(...PDF_BRAND.colors.white);
  const titleLines = doc.splitTextToSize(options.excursionName, w - 8);
  doc.text(titleLines.slice(0, 2), x + 4, y + imageH - 8);

  let cardY = y + imageH + 4;
  const cardH = 8 + options.whyLoveIt.length * 5.5 + 14;
  drawCardSurface(doc, x, cardY, w, cardH, PDF_BRAND.colors.white);

  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(7);
  doc.setTextColor(...PDF_BRAND.colors.caribbean800);
  doc.text((options.sectionLabel ?? "OUR PICK FOR THIS PORT").toUpperCase(), x + 4, cardY + 6);

  let bulletY = cardY + 11;
  doc.setFont(PDF_BRAND.fonts.body, "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_BRAND.colors.gray700);
  for (const bullet of options.whyLoveIt.slice(0, 4)) {
    doc.setFillColor(...PDF_BRAND.colors.caribbean600);
    doc.circle(x + 5.5, bulletY - 1, 0.7, "F");
    const lines = doc.splitTextToSize(bullet, w - 12);
    doc.text(lines[0] ?? bullet, x + 8, bulletY);
    bulletY += 5.5;
  }

  let badgeX = x + 4;
  const badgeY = cardY + cardH - 6;
  badgeX += drawPillBadge(doc, options.duration, badgeX, badgeY, PDF_BRAND.colors.caribbean50, PDF_BRAND.colors.caribbean800) + 2;
  badgeX += drawPillBadge(doc, options.excursionType, badgeX, badgeY, PDF_BRAND.colors.white, PDF_BRAND.colors.gray700) + 2;
  if (options.matchLabel && options.matchScore !== undefined) {
    const matchRgb = MATCH_BADGE_COLORS[options.matchLabel] ?? MATCH_BADGE_COLORS["Good Match"];
    drawPillBadge(doc, options.matchLabel, badgeX, badgeY, matchRgb);
  }

  return cardY + cardH + 5;
}

/** Minimal cover experience preview tile with optional destination photography. */
export function drawCoverExperienceTile(
  doc: jsPDF,
  portName: string,
  excursionName: string,
  theme: PdfThemeGradient,
  x: number,
  y: number,
  w: number,
  h: number,
  portImageDataUrl?: string,
): void {
  const imageH = 18;
  drawThemeGradientBand(doc, theme, x, y, w, imageH, false);
  if (portImageDataUrl) {
    try {
      const format = imageFormatFromDataUrl(portImageDataUrl);
      doc.addImage(portImageDataUrl, format, x, y, w, imageH, undefined, "FAST");
      for (let i = 0; i < 4; i++) {
        const alpha = 0.2 + i * 0.12;
        const mix = 1 - alpha;
        doc.setFillColor(
          Math.round(0 * alpha + theme.end[0] * mix),
          Math.round(30 * alpha + theme.end[1] * mix),
          Math.round(50 * alpha + theme.end[2] * mix),
        );
        doc.rect(x + (w / 4) * i, y, w / 4 + 0.5, imageH, "F");
      }
    } catch {
      // gradient band only
    }
  }

  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(6);
  doc.setTextColor(...PDF_BRAND.colors.white);
  doc.text(portName.toUpperCase(), x + 3, y + 5);

  drawCardSurface(doc, x, y + imageH, w, h - imageH, PDF_BRAND.colors.white);
  doc.setFont(PDF_BRAND.fonts.display, "bold");
  doc.setFontSize(9);
  doc.setTextColor(...PDF_BRAND.colors.gray900);
  const lines = doc.splitTextToSize(excursionName, w - 6);
  doc.text(lines.slice(0, 2), x + 3, y + imageH + 6);
}

/** Visual TOC row with destination colour strip. */
export function drawMagazineTocEntry(
  doc: jsPDF,
  index: number,
  portName: string,
  region: string,
  excursion: string,
  page: number,
  theme: PdfThemeGradient,
  x: number,
  y: number,
  w: number,
): number {
  const h = 16;
  drawCardSurface(doc, x, y, w, h, PDF_BRAND.colors.white);
  drawThemeGradientBand(doc, theme, x, y, 6, h, false);

  doc.setTextColor(...PDF_BRAND.colors.white);
  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(8);
  doc.text(String(index), x + 3, y + 9);

  doc.setTextColor(...PDF_BRAND.colors.gray900);
  doc.setFont(PDF_BRAND.fonts.display, "bold");
  doc.setFontSize(10);
  doc.text(portName, x + 9, y + 6);

  doc.setFont(PDF_BRAND.fonts.body, "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...PDF_BRAND.colors.gray600);
  doc.text(region, x + 9, y + 10);

  doc.setFontSize(7.5);
  doc.setTextColor(...PDF_BRAND.colors.gray700);
  const excursionLine = doc.splitTextToSize(excursion, w - 52)[0] ?? excursion;
  doc.text(excursionLine, x + 9, y + 14);

  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(8);
  doc.setTextColor(...PDF_BRAND.colors.caribbean800);
  doc.text(String(page), x + w - 4, y + 9, { align: "right" });

  return h + 3;
}

function drawEditorialCallout(
  doc: jsPDF,
  eyebrow: string,
  text: string,
  x: number,
  y: number,
  w: number,
): number {
  const lines = doc.splitTextToSize(text, w - 8);
  const lineCount = Math.min(lines.length, 3);
  const h = 10 + lineCount * 4.2;
  drawCardSurface(doc, x, y, w, h, PDF_BRAND.colors.white);
  drawEyebrowLabel(doc, eyebrow, x + 4, y + 6);
  doc.setFont(PDF_BRAND.fonts.body, "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_BRAND.colors.gray700);
  doc.text(lines.slice(0, lineCount), x + 4, y + 11);
  return h;
}

/** Destination editorial moments — why visit, expert tip, photo spot. */
export function drawPortEditorialMoments(
  doc: jsPDF,
  editorial: { whySpecial: string; expertTip: string; photoMoment: string },
  x: number,
  y: number,
  w: number,
): number {
  const colW = (w - 4) / 2;
  let cy = y;

  const whyH = drawEditorialCallout(doc, "Why this port is special", editorial.whySpecial, x, cy, w);
  cy += whyH + 3;

  const tipH = drawEditorialCallout(doc, "Local expert tip", editorial.expertTip, x, cy, colW);
  const photoH = drawEditorialCallout(doc, "Best photo moment", editorial.photoMoment, x + colW + 4, cy, colW);
  cy += Math.max(tipH, photoH) + 3;

  return cy;
}

/** Prominent but calm Cruise Confidence panel for magazine port pages. */
export function drawLuxuryConfidencePanel(
  doc: jsPDF,
  title: string,
  level: CruiseConfidenceLevel,
  guidance: string,
  supportingLabels: string[],
  timeBuffer: string,
  x: number,
  y: number,
  w: number,
): number {
  const palette = CONFIDENCE_PANEL_PALETTE[level];
  const guidanceLines = doc.splitTextToSize(guidance, w - 16);
  const lineCount = Math.min(guidanceLines.length, 3);
  const h = 30 + lineCount * 4;

  doc.setDrawColor(...palette.accent);
  doc.setLineWidth(0.4);
  doc.setFillColor(...palette.bg);
  doc.roundedRect(x, y, w, h, 3, 3, "FD");
  doc.setFillColor(...palette.accent);
  doc.roundedRect(x, y, 3, h, 1.5, 1.5, "F");

  drawEyebrowLabel(doc, "Cruise Confidence", x + 8, y + 7);
  let badgeX = x + 8;
  badgeX += drawConfidenceBadge(doc, title, level, badgeX, y + 13) + 3;

  doc.setFont(PDF_BRAND.fonts.body, "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...PDF_BRAND.colors.gray700);
  doc.text(guidanceLines.slice(0, lineCount), x + 8, y + 20);

  let pillX = x + 8;
  const pillY = y + h - 7;
  pillX += drawPillBadge(doc, `Buffer · ${timeBuffer}`, pillX, pillY, PDF_BRAND.colors.white, PDF_BRAND.colors.gray700) + 2;
  for (const label of supportingLabels.slice(0, 2)) {
    pillX += drawPillBadge(doc, label, pillX, pillY, PDF_BRAND.colors.white, PDF_BRAND.colors.gray700) + 2;
    if (pillX > x + w - 20) break;
  }

  return y + h + 4;
}

/** QR-ready placeholder when live QR generation is unavailable. */
export function drawQrPlaceholder(
  doc: jsPDF,
  x: number,
  y: number,
  size: number,
  caption = "Scan to book",
): void {
  doc.setDrawColor(...PDF_BRAND.colors.cardBorder);
  doc.setFillColor(...PDF_BRAND.colors.white);
  doc.roundedRect(x, y, size, size, 2, 2, "FD");

  const cell = (size - 4) / 7;
  doc.setFillColor(...PDF_BRAND.colors.caribbean100);
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 7; col++) {
      const corner =
        (row < 3 && col < 3) || (row < 3 && col > 3) || (row > 3 && col < 3);
      const checker = (row + col) % 2 === 0;
      if (corner || checker) {
        doc.rect(x + 2 + col * cell, y + 2 + row * cell, cell - 0.15, cell - 0.15, "F");
      }
    }
  }

  doc.setFont(PDF_BRAND.fonts.body, "bold");
  doc.setFontSize(5);
  doc.setTextColor(...PDF_BRAND.colors.gray600);
  doc.text(caption, x + size / 2, y + size + 3.5, { align: "center" });
}

/** Soft invitation CTA — luxury travel brochure tone. */
export function drawLuxuryInvitationCta(
  doc: jsPDF,
  links: PdfActionLink[],
  options: {
    heading?: string;
    subline?: string;
    qrDataUrl?: string;
  },
  x: number,
  y: number,
  w: number,
): number {
  const heading = options.heading ?? "Begin planning this port day";
  const primaryLink = links[0];
  const boxH = 58;
  const qrSize = 22;

  doc.setDrawColor(...PDF_BRAND.colors.caribbean100);
  doc.setFillColor(252, 250, 246);
  doc.roundedRect(x, y, w, boxH, 4, 4, "FD");

  doc.setFont(PDF_BRAND.fonts.display, "bold");
  doc.setFontSize(11);
  doc.setTextColor(...PDF_BRAND.colors.gray900);
  doc.text(heading, x + 5, y + 8);

  if (options.subline) {
    doc.setFont(PDF_BRAND.fonts.body, "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...PDF_BRAND.colors.gray600);
    const sublineLines = doc.splitTextToSize(options.subline, w - qrSize - 14);
    doc.text(sublineLines.slice(0, 2), x + 5, y + 13);
  }

  if (primaryLink) {
    const btnY = y + 20;
    const btnW = w - qrSize - 14;
    doc.setFillColor(...PDF_BRAND.colors.caribbean800);
    doc.roundedRect(x + 5, btnY, btnW, 12, 2.5, 2.5, "F");
    doc.setFillColor(...PDF_BRAND.colors.caribbean700);
    doc.roundedRect(x + 6.5, btnY + 1.5, btnW - 3, 9, 2, 2, "F");
    doc.setTextColor(...PDF_BRAND.colors.white);
    doc.setFont(PDF_BRAND.fonts.body, "bold");
    doc.setFontSize(9.5);
    doc.textWithLink(primaryLink.label, x + 5 + btnW / 2, btnY + 6.5, { align: "center", url: primaryLink.url });
  }

  let linkY = y + 36;
  for (const link of links.slice(1)) {
    doc.setFont(PDF_BRAND.fonts.body, "bold");
    doc.setFontSize(8);
    doc.setTextColor(...PDF_BRAND.colors.caribbean800);
    doc.textWithLink(`${link.label} →`, x + 5, linkY, { url: link.url });
    linkY += 5;
  }

  const qrX = x + w - qrSize - 5;
  const qrY = y + 14;
  if (options.qrDataUrl) {
    try {
      doc.addImage(options.qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize, undefined, "FAST");
      doc.setFont(PDF_BRAND.fonts.body, "bold");
      doc.setFontSize(5);
      doc.setTextColor(...PDF_BRAND.colors.gray600);
      doc.text("Scan to book", qrX + qrSize / 2, qrY + qrSize + 3.5, { align: "center" });
    } catch {
      drawQrPlaceholder(doc, qrX, qrY, qrSize);
    }
  } else {
    drawQrPlaceholder(doc, qrX, qrY, qrSize);
  }

  return y + boxH + 4;
}

/** Inline passenger-fit pills for magazine layouts. */
export function drawPassengerFitPills(
  doc: jsPDF,
  items: { label: string; value: string }[],
  x: number,
  y: number,
  w: number,
): number {
  let cx = x;
  let cy = y;
  const gap = 2;
  const rowH = 7;

  for (const item of items) {
    doc.setFont(PDF_BRAND.fonts.body, "bold");
    doc.setFontSize(5.5);
    const labelW = doc.getTextWidth(item.label.toUpperCase()) + 4;
    doc.setFont(PDF_BRAND.fonts.body, "normal");
    doc.setFontSize(6.5);
    const valueW = doc.getTextWidth(item.value) + 6;
    const pillW = labelW + valueW + 4;

    if (cx + pillW > x + w) {
      cx = x;
      cy += rowH + gap;
    }

    doc.setFillColor(...PDF_BRAND.colors.white);
    doc.setDrawColor(...PDF_BRAND.colors.cardBorder);
    doc.roundedRect(cx, cy - 4.5, pillW, rowH, 2, 2, "FD");

    doc.setFont(PDF_BRAND.fonts.body, "bold");
    doc.setFontSize(5.5);
    doc.setTextColor(...PDF_BRAND.colors.caribbean700);
    doc.text(item.label.toUpperCase(), cx + 2, cy);

    doc.setFont(PDF_BRAND.fonts.body, "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...PDF_BRAND.colors.gray900);
    doc.text(item.value, cx + 2 + labelW, cy);

    cx += pillW + gap;
  }

  return cy + rowH + 3;
}
