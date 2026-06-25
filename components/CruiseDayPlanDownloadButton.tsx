"use client";

import { useState } from "react";
import type { CruiseDayPlan } from "@/lib/cruise-day-plan";
import { downloadCruiseDayPlanPdf, printCruiseDayPlan } from "@/lib/cruise-day-plan-pdf";

interface CruiseDayPlanDownloadButtonProps {
  plan: CruiseDayPlan;
  className?: string;
  wrapperClassName?: string;
  label?: string;
  showPrintFallback?: boolean;
}

export function CruiseDayPlanDownloadButton({
  plan,
  className = "btn-primary",
  wrapperClassName = "flex flex-col gap-2",
  label = "Download PDF",
  showPrintFallback = true,
}: CruiseDayPlanDownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setUsedFallback(false);
    try {
      const ok = await downloadCruiseDayPlanPdf(plan);
      if (!ok) setUsedFallback(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={wrapperClassName}>
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className={className}
        aria-busy={loading}
      >
        {loading ? "Generating PDF…" : label}
      </button>
      {usedFallback && showPrintFallback && (
        <p className="text-xs text-amber-800">
          PDF generation opened the print view instead.{" "}
          <button
            type="button"
            onClick={() => printCruiseDayPlan({ plan, usePrintRoute: true })}
            className="font-medium underline"
          >
            Try print again
          </button>
        </p>
      )}
    </div>
  );
}
