"use client";

import { useState } from "react";
import type { CombinedCruisePlannerInput } from "@/lib/cruise-day-plan";
import { downloadCombinedCruisePlannerPdf } from "@/lib/cruise-day-plan-pdf";
import {
  isValidPlannerEmail,
  normalizePlannerEmail,
  submitCruisePlannerLead,
  type CruisePlannerLeadRecord,
} from "@/lib/cruise-planner-lead-capture";
import { CruisePlannerEmailModal } from "@/components/CruisePlannerEmailModal";

export interface CruisePlannerLeadMetadata {
  cruiseLineSlug?: string;
  cruiseLineName?: string;
  shipSlug?: string;
  shipName?: string;
  sailingMonth?: string;
  sailingYear?: number;
}

interface CombinedCruisePlannerDownloadButtonProps {
  planner: CombinedCruisePlannerInput;
  leadMetadata?: CruisePlannerLeadMetadata;
  className?: string;
  label?: string;
  variant?: "default" | "premium";
}

const PREMIUM_BUTTON_CLASS =
  "relative inline-flex w-full min-w-[min(100%,280px)] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-caribbean-700 via-caribbean-800 to-caribbean-900 px-8 py-5 text-base font-bold text-white shadow-lg shadow-caribbean-900/30 ring-2 ring-caribbean-500/40 transition hover:from-caribbean-800 hover:via-caribbean-900 hover:to-caribbean-950 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-caribbean-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto";

export function CombinedCruisePlannerDownloadButton({
  planner,
  leadMetadata,
  className,
  label = "Download My Complete Cruise Planner PDF",
  variant = "default",
}: CombinedCruisePlannerDownloadButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [formError, setFormError] = useState<string | undefined>();

  const buildLeadRecord = (normalizedEmail: string): CruisePlannerLeadRecord => ({
    email: normalizedEmail,
    marketingConsent,
    cruiseLineSlug: leadMetadata?.cruiseLineSlug ?? undefined,
    cruiseLineName: leadMetadata?.cruiseLineName ?? planner.cruiseLineName,
    shipSlug: leadMetadata?.shipSlug ?? undefined,
    shipName: leadMetadata?.shipName ?? planner.shipName,
    sailingMonth: leadMetadata?.sailingMonth ?? planner.sailingMonth,
    sailingYear: leadMetadata?.sailingYear ?? planner.sailingYear,
    portSlugs: planner.portPlans.map((plan) => plan.portSlug),
    portNames: planner.portPlans.map((plan) => plan.portName),
    capturedAt: new Date().toISOString(),
  });

  const handleDownload = async () => {
    const normalizedEmail = normalizePlannerEmail(email);
    if (!isValidPlannerEmail(normalizedEmail)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setFailed(false);
    setFormError(undefined);

    try {
      await submitCruisePlannerLead(buildLeadRecord(normalizedEmail));

      const ok = await downloadCombinedCruisePlannerPdf(planner);
      if (!ok) {
        setFailed(true);
        setFormError("PDF generation failed. Please try again.");
        return;
      }

      setModalOpen(false);
      setEmail("");
      setMarketingConsent(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${variant === "premium" ? "shrink-0" : ""}`}>
      <div className={variant === "premium" ? "relative" : undefined}>
        {variant === "premium" && (
          <span className="absolute -top-2.5 right-3 z-10 rounded-full bg-tropical-mango px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            Recommended
          </span>
        )}
        <button
          type="button"
          onClick={() => {
            setFailed(false);
            setFormError(undefined);
            setModalOpen(true);
          }}
          disabled={loading}
          className={className ?? (variant === "premium" ? PREMIUM_BUTTON_CLASS : "btn-primary")}
          aria-haspopup="dialog"
        >
          {label}
        </button>
      </div>

      {failed && !modalOpen && (
        <p className="text-xs text-amber-800">
          PDF generation failed. Please try again in a moment.
        </p>
      )}

      <CruisePlannerEmailModal
        open={modalOpen}
        email={email}
        marketingConsent={marketingConsent}
        loading={loading}
        error={formError}
        onEmailChange={setEmail}
        onMarketingConsentChange={setMarketingConsent}
        onSubmit={handleDownload}
        onClose={() => {
          if (!loading) setModalOpen(false);
        }}
      />
    </div>
  );
}
