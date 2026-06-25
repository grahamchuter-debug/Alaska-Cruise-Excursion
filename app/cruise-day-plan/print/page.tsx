import { Suspense } from "react";
import { CruiseDayPlanPrintClient } from "@/components/CruiseDayPlanPageClient";

export default function CruiseDayPlanPrintPage() {
  return (
    <Suspense fallback={null}>
      <CruiseDayPlanPrintClient />
    </Suspense>
  );
}
