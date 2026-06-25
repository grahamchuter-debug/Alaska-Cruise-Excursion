"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getRoutePresetById } from "@/data/excursion-finder";
import { AlaskaExcursionFinder } from "@/components/AlaskaExcursionFinder";

function FinderWithRoute() {
  const searchParams = useSearchParams();
  const routeId = searchParams.get("route") ?? undefined;
  const preset = routeId ? getRoutePresetById(routeId) : undefined;

  return (
    <AlaskaExcursionFinder
      key={preset?.id ?? "default"}
      variant="page"
      initialPorts={preset?.portSlugs}
      initialRouteId={preset?.id}
    />
  );
}

export function AlaskaExcursionFinderWithRoute() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-caribbean-200 bg-caribbean-50 p-8 text-center text-sm text-gray-600">
          Loading excursion finder…
        </div>
      }
    >
      <FinderWithRoute />
    </Suspense>
  );
}
