"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CruiseDayPlanForm } from "@/components/CruiseDayPlanForm";
import { CruiseDayPlanView } from "@/components/CruiseDayPlanView";
import {
  buildCruiseDayPlanSearchParams,
  generateCruiseDayPlan,
  parseCruiseDayPlanInterests,
  type CruiseDayPlan,
  type CruiseDayPlanInput,
} from "@/lib/cruise-day-plan";
import { downloadCruiseDayPlanPdf } from "@/lib/cruise-day-plan-pdf";
import { getPortGuideCount } from "@/data/content-inventory";
import type { FitnessLevel } from "@/data/excursion-finder";

function isValidActivity(value: string | null): value is FitnessLevel {
  return value === "easy" || value === "moderate" || value === "active";
}

function CruiseDayPlanPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPort = searchParams.get("port") ?? "";
  const initialDate = searchParams.get("date") ?? "";
  const initialInterests = useMemo(
    () => parseCruiseDayPlanInterests(searchParams.get("interests")),
    [searchParams],
  );
  const initialActivityParam = searchParams.get("activity");
  const initialActivity = isValidActivity(initialActivityParam) ? initialActivityParam : "easy";

  const [plan, setPlan] = useState<CruiseDayPlan | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const buildPlan = useCallback((input: CruiseDayPlanInput) => {
    const nextPlan = generateCruiseDayPlan(input);
    setPlan(nextPlan);
    setHasSubmitted(true);
    return nextPlan;
  }, []);

  const handleSubmit = (input: CruiseDayPlanInput) => {
    buildPlan(input);
    const params = buildCruiseDayPlanSearchParams(input);
    router.replace(`/cruise-day-plan?${params.toString()}`, { scroll: false });
    requestAnimationFrame(() => {
      document.getElementById("cruise-day-plan-results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  useEffect(() => {
    const port = searchParams.get("port");
    const date = searchParams.get("date");
    const interestsRaw = searchParams.get("interests");
    const activity = searchParams.get("activity");
    const shouldGenerate = searchParams.get("generated") === "1" || Boolean(port && date);

    if (!shouldGenerate || !port || !date) return;

    buildPlan({
      portSlug: port,
      date,
      interests: parseCruiseDayPlanInterests(interestsRaw),
      activityLevel: isValidActivity(activity) ? activity : "easy",
    });
    setHasSubmitted(true);
  }, [searchParams, buildPlan]);

  useEffect(() => {
    if (!plan || searchParams.get("download") !== "1") return;
    void downloadCruiseDayPlanPdf(plan);
  }, [plan, searchParams]);

  return (
    <>
      <div className="print:hidden">
        <CruiseDayPlanForm
          initialPort={initialPort}
          initialDate={initialDate}
          initialInterests={initialInterests}
          initialActivity={initialActivity}
          onSubmit={handleSubmit}
        />
      </div>

      {hasSubmitted && !plan && (
        <div className="mt-8 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          We couldn&apos;t build a plan for that port. Choose one of the {getPortGuideCount()} authority ports listed in the dropdown.
        </div>
      )}

      {plan && <CruiseDayPlanView plan={plan} />}
    </>
  );
}

export function CruiseDayPlanPageClient() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-caribbean-200 bg-caribbean-50 p-8 text-center text-sm text-gray-600">
          Loading cruise day planner…
        </div>
      }
    >
      <CruiseDayPlanPageInner />
    </Suspense>
  );
}

export function CruiseDayPlanPrintClient() {
  const searchParams = useSearchParams();

  const plan = useMemo(() => {
    const port = searchParams.get("port");
    const date = searchParams.get("date");
    if (!port || !date) return null;

    return generateCruiseDayPlan({
      portSlug: port,
      date,
      interests: parseCruiseDayPlanInterests(searchParams.get("interests")),
      activityLevel: isValidActivity(searchParams.get("activity"))
        ? (searchParams.get("activity") as FitnessLevel)
        : "easy",
    });
  }, [searchParams]);

  useEffect(() => {
    if (!plan) return;
    const timer = window.setTimeout(() => {
      window.print();
    }, 400);
    return () => window.clearTimeout(timer);
  }, [plan]);

  if (!plan) {
    return (
      <p className="p-8 text-center text-sm text-gray-600">
        Missing or invalid plan parameters. Open the cruise day planner and generate a plan first.
      </p>
    );
  }

  return <CruiseDayPlanView plan={plan} variant="print" />;
}
