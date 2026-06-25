import { jsPDF } from "jspdf";
import type { CombinedCruisePlannerInput, CruiseDayPlan } from "@/lib/cruise-day-plan";
import { cruiseDayPlanActivityLevels, cruiseDayPlanInterests } from "@/lib/cruise-day-plan";
import { CRUISE_CONFIDENCE_DISCLAIMER, CRUISE_CONFIDENCE_LABELS, formatConfidenceTitle } from "@/lib/cruise-confidence";
import { getPortBySlug } from "@/data/ports";
import { getSpecialistExcursionUrl } from "@/lib/specialist-links";
import { loadPdfBrandAssets, type PdfBrandAssets } from "@/lib/pdf-brand-assets";
import { buildExcursionPitch, getPdfPortEditorial } from "@/lib/pdf-port-editorial";
import { excursionTypeToTheme } from "@/lib/pdf-port-themes";
import { preparePdfQrCodes } from "@/lib/pdf-qr";
import { hasShipSchedule } from "@/lib/routes";
import {
  drawBrandedFooter,
  drawCardSurface,
  drawConfidenceBadge,
  drawCoverExperienceTile,
  drawCoverStatTile,
  drawDisplayTitle,
  drawEditorialSectionTitle,
  drawEyebrowLabel,
  drawExperienceCard,
  drawGradientCardSurface,
  drawHeroImageBand,
  drawLuxuryConfidencePanel,
  drawLuxuryImageBand,
  drawLuxuryInvitationCta,
  drawMagazineTocEntry,
  drawMatchBadge,
  drawPassengerFitPills,
  drawPillBadge,
  drawPortActionCtaBox,
  drawPortEditorialMoments,
  drawPremiumCtaBox,
  drawPremiumSectionHeader,
  drawPrimaryCta,
  drawRoutePortChip,
  drawSiteWordmark,
  drawThemeGradientBand,
  PDF_CONTENT_WIDTH,
  PDF_PAGE,
} from "@/lib/pdf-brand-layout";
import { PDF_PORT_THEMES } from "@/lib/pdf-port-themes";
import { PDF_BRAND } from "@/lib/pdf-brand-tokens";

/**
 * Client-side PDF generation for static export (Cloudflare Pages).
 * Print route remains available as fallback via printCruiseDayPlan().
 */
export interface CruiseDayPlanPdfOptions {
  plan: CruiseDayPlan;
  /** When true, opens the dedicated print route in a new tab before printing. */
  usePrintRoute?: boolean;
}

export interface CruiseDayPlanPdfGenerator {
  generate(plan: CruiseDayPlan): Promise<Blob | null>;
  print(options: CruiseDayPlanPdfOptions): void;
}

const { margin: MARGIN, width: PAGE_WIDTH, height: PAGE_HEIGHT, footerY: FOOTER_Y } = PDF_PAGE;
const CONTENT_WIDTH = PDF_CONTENT_WIDTH;
const C = PDF_BRAND.colors;
const F = PDF_BRAND.fonts;

function interestLabels(ids: CruiseDayPlan["interests"]): string {
  return ids
    .map((id) => cruiseDayPlanInterests.find((option) => option.id === id)?.label ?? id)
    .join(", ");
}

function activityLevelLabel(level: CruiseDayPlan["activityLevel"]): string {
  return cruiseDayPlanActivityLevels.find((option) => option.id === level)?.label ?? level;
}

function buildPrintQueryString(plan: CruiseDayPlan): string {
  const params = new URLSearchParams({
    port: plan.portSlug,
    date: plan.date,
    interests: plan.interests.join(","),
    activity: plan.activityLevel,
  });
  return params.toString();
}

export function getCruiseDayPlanPrintUrl(plan: CruiseDayPlan): string {
  return `/cruise-day-plan/print?${buildPrintQueryString(plan)}`;
}

function buildPdfFilename(plan: CruiseDayPlan): string {
  return `cruise-day-plan-${plan.portSlug}-${plan.date}.pdf`;
}

function buildCombinedPdfFilename(input: CombinedCruisePlannerInput): string {
  const month = input.sailingMonth?.toLowerCase().slice(0, 3) ?? "cruise";
  const year = input.sailingYear ?? new Date().getFullYear();
  const ship = input.shipName
    ? input.shipName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : "planner";
  return `caribbean-cruise-planner-${ship}-${month}${year}.pdf`;
}

function getExcursionCtaUrl(plan: CruiseDayPlan): string {
  const related = plan.relatedExcursions[0];
  const path = getSpecialistExcursionUrl(plan.portSlug, {
    excursionType: plan.recommendedExcursions.primary.type,
    text: `${plan.recommendedExcursions.primary.name} ${plan.recommendedExcursions.primary.description}`,
    guideHref: related?.guideHref,
  });
  return path.startsWith("http") ? path : `${PDF_BRAND.siteUrl}${path}`;
}

function getPortGuideUrl(plan: CruiseDayPlan): string {
  return `${PDF_BRAND.siteUrl}${plan.portInformation.portGuideHref}`;
}

function getScheduleHubUrl(plan: CruiseDayPlan): string | null {
  if (plan.scheduleInfo.scheduleHref) {
    return `${PDF_BRAND.siteUrl}${plan.scheduleInfo.scheduleHref}`;
  }
  if (hasShipSchedule(plan.portSlug)) {
    return `${PDF_BRAND.siteUrl}/ship-schedules/${plan.portSlug}`;
  }
  return null;
}

function collectPortActionUrls(plan: CruiseDayPlan): string[] {
  const urls = [getExcursionCtaUrl(plan), getPortGuideUrl(plan)];
  const scheduleUrl = getScheduleHubUrl(plan);
  if (scheduleUrl) urls.push(scheduleUrl);
  return urls;
}

function collectCombinedActionUrls(input: CombinedCruisePlannerInput): string[] {
  return input.portPlans.flatMap((plan) => collectPortActionUrls(plan));
}

function buildWhyCruisersLoveIt(plan: CruiseDayPlan): string[] {
  const bullets: string[] = [];
  const { recommendedExcursions: rec } = plan;
  const port = getPortBySlug(plan.portSlug);

  for (const reason of rec.matchReasons) {
    if (bullets.length >= 4) break;
    bullets.push(reason);
  }

  for (const id of plan.returnToShipAdvice.cruiseConfidence.supportingLabels) {
    if (bullets.length >= 4) break;
    const label = CRUISE_CONFIDENCE_LABELS[id].label;
    if (!bullets.includes(label)) bullets.push(label);
  }

  if (port) {
    for (const highlight of port.highlights) {
      if (bullets.length >= 4) break;
      if (!bullets.some((b) => b.toLowerCase().includes(highlight.toLowerCase().slice(0, 12)))) {
        bullets.push(highlight);
      }
    }
  }

  if (bullets.length < 3) {
    const sentences = rec.primary.description
      .split(/[.;]/)
      .map((part) => part.trim())
      .filter((part) => part.length > 12);
    for (const sentence of sentences) {
      if (bullets.length >= 4) break;
      bullets.push(sentence);
    }
  }

  return bullets.slice(0, 4);
}

function portCropOffset(portSlug: string): number {
  let hash = 0;
  for (let i = 0; i < portSlug.length; i++) {
    hash = (hash + portSlug.charCodeAt(i) * (i + 1)) % 48;
  }
  return hash;
}

function getPortHeroDataUrl(assets: PdfBrandAssets, portSlug: string): string | undefined {
  return assets.portHeroDataUrls?.[portSlug];
}

const LIVE_SCHEDULE_HUB_MESSAGE =
  "View the live schedule hub for the latest arrivals and departures.";

function formatPdfPassengers(count: number): string {
  if (count >= 1_000_000) return `~${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `~${Math.round(count / 1_000)}K`;
  return `~${count.toLocaleString()}`;
}

class PdfCanvas {
  y: number = MARGIN;
  pageNumber = 1;

  constructor(
    readonly doc: jsPDF,
    readonly assets: PdfBrandAssets,
    readonly qrCodes: Record<string, string> = {},
  ) {}

  ensureSpace(needed: number): void {
    if (this.y + needed <= FOOTER_Y - 10) return;
    this.drawFooter();
    this.doc.addPage();
    this.pageNumber += 1;
    this.y = MARGIN;
  }

  drawFooter(): void {
    drawBrandedFooter(this.doc, this.pageNumber);
  }

  addSpacer(mm = 4): void {
    this.y += mm;
  }

  addSectionTitle(title: string): void {
    this.ensureSpace(14);
    const { doc } = this;
    doc.setTextColor(...C.caribbean800);
    doc.setFont(F.display, "bold");
    doc.setFontSize(12);
    doc.text(title, MARGIN, this.y);
    this.y += 7;
  }

  addParagraph(text: string, fontSize = 9, maxLines?: number): void {
    const { doc } = this;
    doc.setTextColor(...C.gray700);
    doc.setFont(F.body, "normal");
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
    const visible = maxLines ? lines.slice(0, maxLines) : lines;
    const blockHeight = visible.length * (fontSize * 0.42) + 2;
    this.ensureSpace(blockHeight);
    doc.text(visible, MARGIN, this.y);
    this.y += blockHeight + 3;
  }

  addMetaChips(chips: { label: string; value: string }[]): void {
    const chipHeight = 10;
    const gap = 3;
    let x = MARGIN;
    let row = 0;
    const { doc } = this;

    this.ensureSpace(chipHeight + 4);

    for (const chip of chips) {
      doc.setFont(F.body, "bold");
      doc.setFontSize(6.5);
      const labelWidth = doc.getTextWidth(chip.label.toUpperCase()) + 3;
      doc.setFont(F.body, "normal");
      doc.setFontSize(7.5);
      const valueWidth = doc.getTextWidth(chip.value) + 6;
      const chipWidth = labelWidth + valueWidth + 6;

      if (x + chipWidth > PAGE_WIDTH - MARGIN) {
        row += 1;
        x = MARGIN;
        this.y += chipHeight + gap;
        this.ensureSpace(chipHeight);
      }

      const chipY = this.y + row * (chipHeight + gap);
      doc.setDrawColor(...C.cardBorder);
      doc.setFillColor(...C.white);
      doc.roundedRect(x, chipY - 5, chipWidth, chipHeight, 2, 2, "FD");

      doc.setTextColor(...C.gray600);
      doc.setFont(F.body, "bold");
      doc.setFontSize(6.5);
      doc.text(chip.label.toUpperCase(), x + 3, chipY);

      doc.setTextColor(...C.gray900);
      doc.setFont(F.body, "normal");
      doc.setFontSize(7.5);
      doc.text(chip.value, x + 3 + labelWidth, chipY);

      x += chipWidth + gap;
    }

    this.y += (row + 1) * (chipHeight + gap) + 2;
  }

  addSnapshotGrid(items: { label: string; value: string }[]): void {
    const colWidth = CONTENT_WIDTH / 2 - 2;
    const rowHeight = 16;
    const rows = Math.ceil(items.length / 2);

    this.ensureSpace(rows * rowHeight + 6);

    for (let i = 0; i < items.length; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = MARGIN + col * (colWidth + 4);
      const y = this.y + row * rowHeight;

      this.doc.setDrawColor(...C.cardBorder);
      this.doc.setFillColor(...C.white);
      this.doc.roundedRect(x, y - 5, colWidth, rowHeight - 2, 2, 2, "FD");

      this.doc.setTextColor(...C.gray600);
      this.doc.setFont(F.body, "bold");
      this.doc.setFontSize(6.5);
      this.doc.text(items[i].label.toUpperCase(), x + 3, y);

      this.doc.setTextColor(...C.gray900);
      this.doc.setFont(F.body, "normal");
      this.doc.setFontSize(8);
      const valueLines = this.doc.splitTextToSize(items[i].value, colWidth - 6);
      this.doc.text(valueLines.slice(0, 2), x + 3, y + 4.5);
    }

    this.y += rows * rowHeight + 6;
  }

  addBulletList(items: string[], indent = 4): void {
    for (const item of items) {
      const lines = this.doc.splitTextToSize(item, CONTENT_WIDTH - indent - 2);
      const blockHeight = lines.length * 4 + 2;
      this.ensureSpace(blockHeight);
      this.doc.setTextColor(...C.gray700);
      this.doc.setFont(F.body, "normal");
      this.doc.setFontSize(8.5);
      this.doc.setFillColor(...C.caribbean600);
      this.doc.circle(MARGIN + 1.5, this.y - 1, 0.8, "F");
      this.doc.text(lines, MARGIN + indent, this.y);
      this.y += blockHeight + 1;
    }
    this.y += 3;
  }

  addTimeline(steps: { time: string; activity: string }[]): void {
    for (const step of steps) {
      const activityLines = this.doc.splitTextToSize(step.activity, CONTENT_WIDTH - 28);
      const blockHeight = Math.max(10, activityLines.length * 4 + 4);
      this.ensureSpace(blockHeight + 2);

      this.doc.setFillColor(...C.caribbean700);
      this.doc.roundedRect(MARGIN, this.y - 4, 22, 7, 1.5, 1.5, "F");
      this.doc.setTextColor(...C.white);
      this.doc.setFont(F.body, "bold");
      this.doc.setFontSize(7);
      this.doc.text(step.time, MARGIN + 11, this.y, { align: "center" });

      this.doc.setTextColor(...C.gray900);
      this.doc.setFont(F.body, "normal");
      this.doc.setFontSize(8.5);
      this.doc.text(activityLines, MARGIN + 26, this.y);

      this.y += blockHeight;
    }
    this.y += 2;
  }

  getCurrentPage(): number {
    return this.doc.getNumberOfPages();
  }

  resetY(offset: number = MARGIN): void {
    this.y = offset;
  }
}

class PortPlanPdfSections {
  constructor(
    private canvas: PdfCanvas,
    private premium = false,
  ) {}

  addPassengerSnapshot(plan: CruiseDayPlan): void {
    const { passengerSnapshot } = plan;
    if (this.premium) {
      this.canvas.ensureSpace(18);
      this.canvas.y = drawPassengerFitPills(
        this.canvas.doc,
        [
          { label: "Time in port", value: passengerSnapshot.timeInPort },
          { label: "Best for", value: passengerSnapshot.bestFor },
          { label: "Walking", value: passengerSnapshot.walkingRequired },
          { label: "Families", value: passengerSnapshot.familyFriendly },
        ],
        MARGIN,
        this.canvas.y,
        CONTENT_WIDTH,
      );
      return;
    }
    this.canvas.addSectionTitle("Cruise Passenger Snapshot");
    this.canvas.addParagraph("Six quick signals to shape your day ashore.", 8.5);
    this.canvas.addSnapshotGrid([
      { label: "Time in Port", value: passengerSnapshot.timeInPort },
      { label: "Best For", value: passengerSnapshot.bestFor },
      { label: "Walking Required", value: passengerSnapshot.walkingRequired },
      { label: "Family Friendly", value: passengerSnapshot.familyFriendly },
      { label: "Private Tour Friendly", value: passengerSnapshot.privateTourFriendly },
      { label: "Cruise Confidence", value: formatConfidenceTitle(plan.returnToShipAdvice.cruiseConfidence.level) },
    ]);
  }

  addRecommendedExcursion(plan: CruiseDayPlan, portIndex?: number): void {
    const { recommendedExcursions: rec } = plan;
    const { doc } = this.canvas;

    if (this.premium) {
      const port = getPortBySlug(plan.portSlug);
      const imageTheme = port?.imageTheme ?? excursionTypeToTheme(rec.primary.type);
      this.canvas.ensureSpace(96);
      this.canvas.y = drawExperienceCard(
        doc,
        {
          portName: plan.portName,
          excursionName: rec.primary.name,
          whyLoveIt: buildExcursionPitch(plan),
          duration: rec.primary.duration,
          excursionType: rec.primary.type,
          matchLabel: rec.matchLabel,
          matchScore: rec.matchScore,
          imageTheme,
          assets: this.canvas.assets,
          cropOffset: portCropOffset(plan.portSlug),
          portHeroDataUrl: getPortHeroDataUrl(this.canvas.assets, plan.portSlug),
          sectionLabel: "Recommended excursion",
        },
        MARGIN,
        this.canvas.y,
        CONTENT_WIDTH,
      );
      this.canvas.y = drawPremiumCtaBox(
        doc,
        "View Excursion Options →",
        getExcursionCtaUrl(plan),
        MARGIN,
        this.canvas.y,
        CONTENT_WIDTH,
      );
      return;
    }

    this.canvas.addSectionTitle("Recommended Excursion");

    this.canvas.ensureSpace(42);

    const cardTop = this.canvas.y;
    drawGradientCardSurface(doc, MARGIN, cardTop - 2, CONTENT_WIDTH, this.premium ? 44 : 38);

    doc.setTextColor(...C.caribbean800);
    doc.setFont(F.body, "bold");
    doc.setFontSize(7);
    doc.text("TOP PICK FOR YOU", MARGIN + 4, cardTop + 3);

    drawMatchBadge(doc, rec.matchLabel, rec.matchScore, PAGE_WIDTH - MARGIN - 52, cardTop + 3);

    doc.setTextColor(...C.gray900);
    doc.setFont(F.display, "bold");
    doc.setFontSize(this.premium ? 14 : 13);
    const titleLines = doc.splitTextToSize(rec.primary.name, CONTENT_WIDTH - 10);
    doc.text(titleLines.slice(0, 2), MARGIN + 4, cardTop + 11);

    doc.setFont(F.body, "normal");
    doc.setFontSize(8.5);
    const descLines = doc.splitTextToSize(rec.primary.description, CONTENT_WIDTH - 8);
    doc.text(descLines.slice(0, this.premium ? 3 : 2), MARGIN + 4, cardTop + 18);

    doc.setFontSize(7.5);
    doc.setTextColor(...C.gray600);
    doc.text(rec.primary.type, MARGIN + 4, cardTop + (this.premium ? 32 : 28));

    this.canvas.y = cardTop + (this.premium ? 48 : 42);
    this.canvas.addSpacer(2);

    if (this.premium) {
      let badgeX = MARGIN;
      const badgeY = this.canvas.y;
      badgeX += drawPillBadge(doc, `Duration · ${rec.primary.duration}`, badgeX, badgeY, C.caribbean700) + 3;
      badgeX +=
        drawPillBadge(doc, `Activity · ${activityLevelLabel(plan.activityLevel)}`, badgeX, badgeY, C.caribbean600) +
        3;
      drawConfidenceBadge(
        doc,
        plan.returnToShipAdvice.cruiseConfidence.title,
        plan.returnToShipAdvice.cruiseConfidence.level,
        badgeX,
        badgeY,
      );
      this.canvas.y = badgeY + 8;
    } else {
      this.canvas.addMetaChips([
        { label: "Duration", value: rec.primary.duration },
        { label: "Activity", value: activityLevelLabel(plan.activityLevel) },
        { label: "Cruise Confidence", value: plan.returnToShipAdvice.returnLabel },
      ]);
    }
  }

  addMatchReasonsPanel(plan: CruiseDayPlan): void {
    if (this.premium) return;
    const { recommendedExcursions: rec } = plan;
    if (rec.matchReasons.length === 0) return;

    const { doc } = this.canvas;
    const panelHeight = 14 + rec.matchReasons.length * 6;
    this.canvas.ensureSpace(panelHeight + (this.premium ? 4 : 0));

    if (this.premium) {
      this.canvas.y = drawPremiumSectionHeader(
        doc,
        "Why This Matches",
        MARGIN,
        this.canvas.y,
        `${rec.matchLabel} · ${rec.matchScore}/100`,
      );
    }

    const panelTop = this.canvas.y;
    drawCardSurface(doc, MARGIN, panelTop, CONTENT_WIDTH, panelHeight, C.caribbean50);

    if (!this.premium) {
      drawEyebrowLabel(doc, "Why this matches", MARGIN + 4, panelTop + 6);
      doc.setFont(F.body, "bold");
      doc.setFontSize(9);
      doc.setTextColor(...C.gray900);
      doc.text(`${rec.matchLabel} because:`, MARGIN + 4, panelTop + 11);
    }

    let reasonY = panelTop + (this.premium ? 8 : 16);
    for (const reason of rec.matchReasons) {
      doc.setFillColor(...C.caribbean600);
      doc.circle(MARGIN + 5, reasonY - 1, 0.8, "F");
      doc.setFont(F.body, "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...C.gray700);
      const lines = doc.splitTextToSize(reason, CONTENT_WIDTH - 12);
      doc.text(lines.slice(0, 2), MARGIN + 8, reasonY);
      reasonY += lines.length > 1 ? 8 : 5;
    }

    this.canvas.y = panelTop + panelHeight + 4;
  }

  addPortDayOutline(plan: CruiseDayPlan): void {
    if (this.premium) {
      this.canvas.y = drawEditorialSectionTitle(
        this.canvas.doc,
        "Your day ashore",
        MARGIN,
        this.canvas.y,
        CONTENT_WIDTH,
        "A relaxed outline — adjust to your ship's schedule",
      );
    } else {
      this.canvas.addSectionTitle("Port Day Outline");
    }
    const steps = plan.itinerary;
    if (steps.length === 0) {
      this.canvas.addParagraph(
        "Disembark promptly, enjoy your recommended excursion, allow time for lunch near port, and return with a generous all-aboard buffer.",
        8.5,
      );
      return;
    }
    this.canvas.addTimeline(steps);
  }

  addScheduleSummary(plan: CruiseDayPlan): void {
    const { scheduleInfo } = plan;
    const hasSchedule = scheduleInfo.hasDateMatch && scheduleInfo.entries.length > 0;
    if (!hasSchedule && !scheduleInfo.scheduleHref) return;

    this.canvas.addSectionTitle("Schedule Summary");
    this.canvas.addParagraph(scheduleInfo.message, 8.5, 3);

    if (hasSchedule) {
      this.renderScheduleTable(scheduleInfo.entries);
    }

    if (scheduleInfo.scheduleHref) {
      this.canvas.addParagraph(`Full schedule: ${PDF_BRAND.siteUrl}${scheduleInfo.scheduleHref}`, 7.5);
    }
    if (scheduleInfo.scheduleFallbackNote) {
      this.canvas.addParagraph(scheduleInfo.scheduleFallbackNote, 7.5, 2);
    }
  }

  addPortEditorialMoments(plan: CruiseDayPlan): void {
    const editorial = getPdfPortEditorial(plan.portSlug);
    this.canvas.ensureSpace(52);
    this.canvas.y = drawPortEditorialMoments(
      this.canvas.doc,
      editorial,
      MARGIN,
      this.canvas.y,
      CONTENT_WIDTH,
    );
  }

  addPremiumScheduleSection(plan: CruiseDayPlan): void {
    const { scheduleInfo, shipsSummary } = plan;
    const hasDateMatch = scheduleInfo.hasDateMatch && scheduleInfo.entries.length > 0;
    const scheduleUrl = getScheduleHubUrl(plan);

    this.canvas.y = drawEditorialSectionTitle(
      this.canvas.doc,
      "Ships in port",
      MARGIN,
      this.canvas.y,
      CONTENT_WIDTH,
      hasDateMatch ? "Schedule snapshot for your sailing date" : "Live schedule hub",
    );

    if (hasDateMatch) {
      this.canvas.addParagraph(scheduleInfo.message, 8, 2);
    } else {
      this.canvas.addParagraph(LIVE_SCHEDULE_HUB_MESSAGE, 8, 2);
    }

    if (hasDateMatch && shipsSummary) {
      this.canvas.addMetaChips([
        { label: "Ships in port", value: String(shipsSummary.shipCount) },
        { label: "Est. passengers", value: formatPdfPassengers(shipsSummary.estimatedPassengers) },
        { label: "Crowd level", value: shipsSummary.crowdLevel },
      ]);
      this.canvas.addParagraph(shipsSummary.planningNote, 8, 2);
      this.renderScheduleTable(scheduleInfo.entries);
    } else if (scheduleUrl) {
      const { doc } = this.canvas;
      this.canvas.ensureSpace(8);
      doc.setTextColor(...C.caribbean800);
      doc.setFont(F.body, "bold");
      doc.setFontSize(8.5);
      doc.textWithLink("Open live schedule hub →", MARGIN, this.canvas.y, { url: scheduleUrl });
      this.canvas.y += 6;
    }
  }

  addPortActionCta(plan: CruiseDayPlan): void {
    const excursionUrl = getExcursionCtaUrl(plan);
    const portGuideUrl = getPortGuideUrl(plan);
    const scheduleUrl = getScheduleHubUrl(plan);

    const links = [
      { label: "View Excursion Options", url: excursionUrl },
      { label: "Explore port guide", url: portGuideUrl },
      ...(scheduleUrl ? [{ label: "Check ship schedule", url: scheduleUrl }] : []),
    ];

    this.canvas.ensureSpace(52);
    if (this.premium) {
      this.canvas.y = drawLuxuryInvitationCta(
        this.canvas.doc,
        links,
        {
          heading: "Ready to plan this port day?",
          subline: "Book with vetted local specialists — confirm all-aboard times with your operator.",
          qrDataUrl: this.canvas.qrCodes[excursionUrl],
        },
        MARGIN,
        this.canvas.y,
        CONTENT_WIDTH,
      );
      return;
    }

    this.canvas.y = drawPortActionCtaBox(
      this.canvas.doc,
      links,
      {
        heading: "Ready to plan this port day?",
        qrDataUrl: this.canvas.qrCodes[excursionUrl],
        qrCaption: "Scan to book",
      },
      MARGIN,
      this.canvas.y,
      CONTENT_WIDTH,
    );
  }

  addExcursionCta(plan: CruiseDayPlan): void {
    this.canvas.addSpacer(2);
    this.canvas.ensureSpace(20);
    if (this.premium) {
      this.canvas.y = drawPremiumCtaBox(
        this.canvas.doc,
        "View Recommended Excursions →",
        getExcursionCtaUrl(plan),
        MARGIN,
        this.canvas.y,
        CONTENT_WIDTH,
      );
    } else {
      this.canvas.y = drawPrimaryCta(
        this.canvas.doc,
        "View Recommended Excursions →",
        getExcursionCtaUrl(plan),
        MARGIN,
        this.canvas.y,
        CONTENT_WIDTH,
      );
    }
  }

  addCruiseConfidence(plan: CruiseDayPlan): void {
    const confidence = plan.returnToShipAdvice.cruiseConfidence;
    if (this.premium) {
      this.canvas.ensureSpace(36);
      const supportingLabels = confidence.supportingLabels.map(
        (id) => CRUISE_CONFIDENCE_LABELS[id].label,
      );
      this.canvas.y = drawLuxuryConfidencePanel(
        this.canvas.doc,
        confidence.title,
        confidence.level,
        confidence.guidance,
        supportingLabels,
        plan.returnToShipAdvice.timeBuffer,
        MARGIN,
        this.canvas.y,
        CONTENT_WIDTH,
      );
      return;
    }
    this.canvas.addSectionTitle("Cruise Confidence");
    this.canvas.addParagraph(confidence.guidance, 8.5, 2);
    this.canvas.addMetaChips([
      { label: "Rating", value: formatConfidenceTitle(confidence.level) },
      { label: "Return buffer", value: plan.returnToShipAdvice.timeBuffer },
    ]);
    if (confidence.supportingLabels.length > 0) {
      const labelText = confidence.supportingLabels
        .map((id) => CRUISE_CONFIDENCE_LABELS[id].label)
        .join(" · ");
      this.canvas.addParagraph(labelText, 7.5, 2);
    }
    if (!this.premium) {
      this.canvas.addParagraph(CRUISE_CONFIDENCE_DISCLAIMER, 7, 2);
    }
  }

  addPremiumPortSections(plan: CruiseDayPlan, portIndex: number): void {
    this.addPassengerSnapshot(plan);
    this.addPortEditorialMoments(plan);
    this.addRecommendedExcursion(plan, portIndex);
    this.addPortDayOutline(plan);
    this.addCruiseConfidence(plan);
    this.addPremiumScheduleSection(plan);
    this.addPortActionCta(plan);
  }

  addPortSections(plan: CruiseDayPlan): void {
    this.addPassengerSnapshot(plan);
    this.addRecommendedExcursion(plan);
    this.addMatchReasonsPanel(plan);
    this.addCruiseConfidence(plan);
    this.addPortDayOutline(plan);
    this.addScheduleSummary(plan);
    this.addExcursionCta(plan);
  }

  private renderScheduleTable(entries: CruiseDayPlan["scheduleInfo"]["entries"]): void {
    const colWidths = [42, 32, 22, 22, 24];
    const headers = ["Ship", "Line", "Arrival", "Departure", "In port"];
    let x = MARGIN;
    const { doc } = this.canvas;

    this.canvas.ensureSpace(12 + entries.length * 6);
    doc.setFillColor(...C.caribbean50);
    doc.roundedRect(MARGIN, this.canvas.y - 4, CONTENT_WIDTH, 8, 1.5, 1.5, "F");
    doc.setFont(F.body, "bold");
    doc.setFontSize(7);
    doc.setTextColor(...C.gray600);
    for (let i = 0; i < headers.length; i++) {
      doc.text(headers[i], x + 2, this.canvas.y);
      x += colWidths[i];
    }
    this.canvas.y += 7;

    doc.setFont(F.body, "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...C.gray900);
    for (const entry of entries) {
      this.canvas.ensureSpace(7);
      x = MARGIN;
      const cells = [
        entry.ship,
        entry.cruiseLine,
        entry.arrival,
        entry.departure,
        entry.timeInPort ?? "—",
      ];
      for (let i = 0; i < cells.length; i++) {
        const clipped = doc.splitTextToSize(cells[i], colWidths[i] - 2)[0] ?? cells[i];
        doc.text(clipped, x + 2, this.canvas.y);
        x += colWidths[i];
      }
      this.canvas.y += 5.5;
    }
    this.canvas.y += 4;
  }
}

class CruiseDayPlanPdfBuilder {
  private canvas: PdfCanvas;
  private sections: PortPlanPdfSections;

  constructor(
    private plan: CruiseDayPlan,
    assets: PdfBrandAssets,
  ) {
    const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
    this.canvas = new PdfCanvas(doc, assets);
    this.sections = new PortPlanPdfSections(this.canvas);
    this.drawSinglePortCover();
  }

  private drawSinglePortCover(): void {
    const { plan, canvas } = this;
    const { doc } = canvas;
    const port = getPortBySlug(plan.portSlug);
    const theme = port ? PDF_PORT_THEMES[port.imageTheme] : PDF_PORT_THEMES.beach;
    const heroHeight = 95;

    drawLuxuryImageBand(
      doc,
      canvas.assets,
      theme,
      0,
      0,
      PAGE_WIDTH,
      heroHeight,
      portCropOffset(plan.portSlug),
      getPortHeroDataUrl(canvas.assets, plan.portSlug),
    );
    drawSiteWordmark(doc, MARGIN, 14);

    doc.setFont(F.body, "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(230, 247, 251);
    doc.text("YOUR PORT DAY GUIDE", MARGIN, 30);

    doc.setFont(F.display, "bold");
    doc.setFontSize(22);
    doc.setTextColor(...C.white);
    doc.text(plan.portName, MARGIN, 44);

    doc.setFont(F.body, "normal");
    doc.setFontSize(9);
    doc.setTextColor(230, 247, 251);
    doc.text(
      `${plan.displayDate} · ${interestLabels(plan.interests)}`,
      MARGIN,
      52,
    );

    canvas.y = heroHeight + 8;
    canvas.y = drawExperienceCard(
      doc,
      {
        portName: plan.portName,
        excursionName: plan.recommendedExcursions.primary.name,
        whyLoveIt: buildWhyCruisersLoveIt(plan),
        duration: plan.recommendedExcursions.primary.duration,
        excursionType: plan.recommendedExcursions.primary.type,
        matchLabel: plan.recommendedExcursions.matchLabel,
        matchScore: plan.recommendedExcursions.matchScore,
        imageTheme: port?.imageTheme ?? excursionTypeToTheme(plan.recommendedExcursions.primary.type),
        assets: canvas.assets,
        cropOffset: portCropOffset(plan.portSlug) + 10,
      },
      MARGIN,
      canvas.y,
      CONTENT_WIDTH,
    );
    canvas.y += 4;
  }

  build(): Blob {
    this.sections.addPassengerSnapshot(this.plan);
    this.sections.addPortDayOutline(this.plan);
    this.sections.addCruiseConfidence(this.plan);
    this.sections.addScheduleSummary(this.plan);
    this.sections.addExcursionCta(this.plan);
    this.canvas.drawFooter();
    return this.canvas.doc.output("blob");
  }
}

interface TocEntry {
  portName: string;
  region: string;
  excursion: string;
  page: number;
}

class CombinedCruisePlannerPdfBuilder {
  private canvas: PdfCanvas;
  private sections: PortPlanPdfSections;
  private tocEntries: TocEntry[] = [];

  constructor(
    private input: CombinedCruisePlannerInput,
    assets: PdfBrandAssets,
    qrCodes: Record<string, string> = {},
  ) {
    const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
    this.canvas = new PdfCanvas(doc, assets, qrCodes);
    this.sections = new PortPlanPdfSections(this.canvas, true);
    this.drawCoverPage();
    doc.addPage();
    this.canvas.pageNumber = 2;
    this.canvas.resetY(MARGIN);
  }

  build(): Blob {
    for (let i = 0; i < this.input.portPlans.length; i++) {
      const plan = this.input.portPlans[i];
      this.canvas.doc.addPage();
      this.canvas.pageNumber = this.canvas.getCurrentPage();
      this.tocEntries.push({
        portName: plan.portName,
        region: plan.portInformation.region,
        excursion: plan.recommendedExcursions.primary.name,
        page: this.canvas.pageNumber,
      });
      this.drawPortHeroBand(plan, i + 1);
      this.sections.addPremiumPortSections(plan, i + 1);
    }

    this.drawTableOfContents();
    this.drawAllFooters();
    return this.canvas.doc.output("blob");
  }

  private drawCoverPage(): void {
    const { input, canvas } = this;
    const { doc } = canvas;
    const heroHeight = 118;
    const portCount = input.portPlans.length;
    const sailingLabel =
      input.sailingMonth && input.sailingYear
        ? `${input.sailingMonth} ${input.sailingYear}`
        : (input.sailingMonth ?? "Your sailing dates");
    const coverHero =
      getPortHeroDataUrl(canvas.assets, input.portPlans[0]?.portSlug ?? "") ??
      canvas.assets.heroImageDataUrl;

    drawHeroImageBand(doc, canvas.assets, 0, 0, PAGE_WIDTH, heroHeight, coverHero);
    drawSiteWordmark(doc, MARGIN, 14);

    doc.setDrawColor(212, 175, 95);
    doc.setLineWidth(0.6);
    doc.line(MARGIN, 24, MARGIN + 28, 24);

    doc.setFont(F.body, "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(230, 247, 251);
    doc.text("YOUR CARIBBEAN CRUISE GUIDE", MARGIN, 30);

    drawDisplayTitle(doc, "Complete", MARGIN, 42, 24);
    drawDisplayTitle(doc, "Cruise Planner", MARGIN, 54, 24);

    if (input.shipName) {
      doc.setFont(F.display, "bold");
      doc.setFontSize(13);
      doc.setTextColor(...C.white);
      doc.text(input.shipName, MARGIN, 68);
    }
    if (input.cruiseLineName) {
      doc.setFont(F.body, "normal");
      doc.setFontSize(9);
      doc.setTextColor(230, 247, 251);
      doc.text(input.cruiseLineName, MARGIN, input.shipName ? 74 : 68);
    }

    doc.setFont(F.body, "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(230, 247, 251);
    const metaY = input.shipName || input.cruiseLineName ? 80 : 70;
    doc.text(`${portCount} port${portCount === 1 ? "" : "s"} · Sailing ${sailingLabel}`, MARGIN, metaY);

    canvas.resetY(heroHeight + 8);

    const statW = (CONTENT_WIDTH - 9) / 4;
    const statH = 18;
    const statValues = [
      input.cruiseLineName ?? "Your cruise line",
      input.shipName ?? "Your ship",
      `${portCount} port${portCount === 1 ? "" : "s"}`,
      sailingLabel,
    ];
    const statLabels = ["Cruise line", "Ship", "Itinerary", "Sailing"];
    for (let i = 0; i < 4; i++) {
      drawCoverStatTile(
        doc,
        statLabels[i],
        statValues[i],
        MARGIN + i * (statW + 3),
        canvas.y,
        statW,
        statH,
      );
    }
    canvas.y += statH + 8;

    doc.setFont(F.display, "bold");
    doc.setFontSize(11);
    doc.setTextColor(...C.gray900);
    doc.text("Recommended experiences", MARGIN, canvas.y);
    canvas.y += 6;

    const previewCount = Math.min(input.portPlans.length, 4);
    const tileW = (CONTENT_WIDTH - (previewCount - 1) * 3) / Math.min(previewCount, 2);
    const tileH = 32;
    for (let i = 0; i < previewCount; i++) {
      const plan = input.portPlans[i];
      const port = getPortBySlug(plan.portSlug);
      const theme = port ? PDF_PORT_THEMES[port.imageTheme] : PDF_PORT_THEMES.beach;
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = MARGIN + col * (tileW + 3);
      const y = canvas.y + row * (tileH + 3);
      drawCoverExperienceTile(
        doc,
        plan.portName,
        plan.recommendedExcursions.primary.name,
        theme,
        x,
        y,
        tileW,
        tileH,
        getPortHeroDataUrl(canvas.assets, plan.portSlug),
      );
    }
    canvas.y += Math.ceil(previewCount / 2) * (tileH + 3) + 6;

    doc.setFont(F.display, "bold");
    doc.setFontSize(11);
    doc.setTextColor(...C.gray900);
    doc.text("Your route", MARGIN, canvas.y);
    canvas.y += 6;

    const chipCount = Math.min(input.portPlans.length, 5);
    const chipW = (CONTENT_WIDTH - (chipCount - 1) * 3) / chipCount;
    for (let i = 0; i < chipCount; i++) {
      const plan = input.portPlans[i];
      const chipH = drawRoutePortChip(
        doc,
        i + 1,
        plan.portName,
        plan.portInformation.region,
        MARGIN + i * (chipW + 3),
        canvas.y,
        chipW,
      );
      if (i === chipCount - 1) canvas.y += chipH;
    }
    if (input.portPlans.length > chipCount) {
      doc.setFont(F.body, "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...C.gray600);
      doc.text(`+ ${input.portPlans.length - chipCount} more port${input.portPlans.length - chipCount === 1 ? "" : "s"} inside`, MARGIN, canvas.y + 2);
      canvas.y += 6;
    } else {
      canvas.y += 4;
    }

    doc.setFont(F.body, "italic");
    doc.setFontSize(8);
    doc.setTextColor(...C.gray600);
    doc.text("A personalised guide to the Caribbean ports on your itinerary.", MARGIN, canvas.y);
    canvas.y += 8;
  }

  private drawPortHeroBand(plan: CruiseDayPlan, portIndex: number): void {
    const { doc } = this.canvas;
    const { recommendedExcursions: rec } = plan;
    const port = getPortBySlug(plan.portSlug);
    const theme = port ? PDF_PORT_THEMES[port.imageTheme] : PDF_PORT_THEMES.beach;
    const bandHeight = 52;

    drawLuxuryImageBand(
      doc,
      this.canvas.assets,
      theme,
      0,
      0,
      PAGE_WIDTH,
      bandHeight,
      portCropOffset(plan.portSlug),
      getPortHeroDataUrl(this.canvas.assets, plan.portSlug),
    );

    doc.setFillColor(...C.white);
    doc.roundedRect(MARGIN, 12, 16, 7, 2, 2, "F");
    doc.setTextColor(...C.caribbean800);
    doc.setFont(F.body, "bold");
    doc.setFontSize(6);
    doc.text(String(portIndex), MARGIN + 8, 16.5, { align: "center" });

    doc.setTextColor(230, 247, 251);
    doc.setFont(F.body, "bold");
    doc.setFontSize(7);
    doc.text(plan.portInformation.region.toUpperCase(), MARGIN, 26);

    doc.setTextColor(...C.white);
    doc.setFont(F.display, "bold");
    doc.setFontSize(24);
    doc.text(plan.portName, MARGIN, 38);

    doc.setFont(F.body, "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(230, 247, 251);
    doc.text(plan.displayDate, MARGIN, 44);

    drawMatchBadge(doc, rec.matchLabel, rec.matchScore, PAGE_WIDTH - MARGIN - 54, 36);

    this.canvas.resetY(bandHeight + 6);
  }

  private drawTableOfContents(): void {
    const { doc } = this.canvas;
    doc.setPage(2);
    this.canvas.pageNumber = 2;
    this.canvas.resetY(MARGIN);

    drawLuxuryImageBand(
      doc,
      this.canvas.assets,
      PDF_PORT_THEMES.snorkel,
      MARGIN,
      this.canvas.y,
      CONTENT_WIDTH,
      28,
      12,
    );
    doc.setTextColor(...C.white);
    doc.setFont(F.display, "bold");
    doc.setFontSize(18);
    doc.text("Contents", MARGIN + 4, this.canvas.y + 18);
    this.canvas.y += 34;

    doc.setFont(F.body, "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.gray600);
    doc.text("Your ports, experiences, and day plans.", MARGIN, this.canvas.y);
    this.canvas.y += 8;

    for (let i = 0; i < this.tocEntries.length; i++) {
      const entry = this.tocEntries[i];
      const plan = this.input.portPlans[i];
      const port = plan ? getPortBySlug(plan.portSlug) : null;
      const theme = port ? PDF_PORT_THEMES[port.imageTheme] : PDF_PORT_THEMES.beach;
      this.canvas.ensureSpace(20);
      const rowH = drawMagazineTocEntry(
        doc,
        i + 1,
        entry.portName,
        entry.region,
        entry.excursion,
        entry.page,
        theme,
        MARGIN,
        this.canvas.y,
        CONTENT_WIDTH,
      );
      this.canvas.y += rowH;
    }
  }

  private drawAllFooters(): void {
    const totalPages = this.canvas.doc.getNumberOfPages();
    for (let page = 1; page <= totalPages; page++) {
      this.canvas.doc.setPage(page);
      this.canvas.pageNumber = page;
      this.canvas.drawFooter();
    }
  }
}

/** Build combined PDF blob without browser guard (for smoke tests). */
export function buildCombinedCruisePlannerPdfBlob(
  input: CombinedCruisePlannerInput,
  assets: PdfBrandAssets = {},
  qrCodes: Record<string, string> = {},
): Blob {
  return new CombinedCruisePlannerPdfBuilder(input, assets, qrCodes).build();
}

/** Build combined PDF with optional QR preload (Node or browser). */
export async function buildCombinedCruisePlannerPdfBlobAsync(
  input: CombinedCruisePlannerInput,
  assets: PdfBrandAssets = {},
): Promise<Blob> {
  const qrCodes = await preparePdfQrCodes(collectCombinedActionUrls(input));
  return buildCombinedCruisePlannerPdfBlob(input, assets, qrCodes);
}

/** Build single-port PDF blob without browser guard (for smoke tests). */
export function buildCruiseDayPlanPdfBlob(plan: CruiseDayPlan, assets: PdfBrandAssets = {}): Blob {
  return new CruiseDayPlanPdfBuilder(plan, assets).build();
}

/** Generate an A4 PDF blob from a cruise day plan (client-side). */
export async function generateCruiseDayPlanPdf(plan: CruiseDayPlan): Promise<Blob | null> {
  if (typeof window === "undefined") return null;
  try {
    const assets = await loadPdfBrandAssets();
    return buildCruiseDayPlanPdfBlob(plan, assets);
  } catch {
    return null;
  }
}

/** Generate a combined cruise planner PDF blob (client-side). */
export async function generateCombinedCruisePlannerPdf(
  input: CombinedCruisePlannerInput,
): Promise<Blob | null> {
  if (typeof window === "undefined") return null;
  try {
    const assets = await loadPdfBrandAssets();
    return buildCombinedCruisePlannerPdfBlobAsync(input, assets);
  } catch {
    return null;
  }
}

/** Trigger a browser download of the plan PDF; falls back to print route on failure. */
export async function downloadCruiseDayPlanPdf(plan: CruiseDayPlan): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const blob = await generateCruiseDayPlanPdf(plan);
  if (!blob) {
    printCruiseDayPlan({ plan, usePrintRoute: true });
    return false;
  }

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = buildPdfFilename(plan);
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
  return true;
}

/** Trigger a browser download of the combined cruise planner PDF. */
export async function downloadCombinedCruisePlannerPdf(
  input: CombinedCruisePlannerInput,
): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const blob = await generateCombinedCruisePlannerPdf(input);
  if (!blob) return false;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = buildCombinedPdfFilename(input);
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
  return true;
}

/** Browser print via window.print() on the current or print route page. */
export function printCruiseDayPlan({ plan, usePrintRoute = false }: CruiseDayPlanPdfOptions): void {
  if (typeof window === "undefined") return;

  if (usePrintRoute) {
    const printUrl = getCruiseDayPlanPrintUrl(plan);
    const printWindow = window.open(printUrl, "_blank", "noopener,noreferrer");
    if (printWindow) {
      printWindow.addEventListener("load", () => {
        printWindow.print();
      });
    }
    return;
  }

  window.print();
}

export const cruiseDayPlanPdfGenerator: CruiseDayPlanPdfGenerator = {
  generate: generateCruiseDayPlanPdf,
  print: printCruiseDayPlan,
};
