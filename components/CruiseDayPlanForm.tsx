"use client";

import { useMemo } from "react";
import {
  cruiseDayPlanActivityLevels,
  cruiseDayPlanInterests,
  getCruiseDayPlanPortOptions,
  type CruiseDayPlanInput,
  type CruiseDayPlanInterest,
} from "@/lib/cruise-day-plan";

interface CruiseDayPlanFormProps {
  initialPort?: string;
  initialDate?: string;
  initialInterests?: CruiseDayPlanInterest[];
  initialActivity?: CruiseDayPlanInput["activityLevel"];
  onSubmit: (input: CruiseDayPlanInput) => void;
  isGenerating?: boolean;
}

function toggleInterest(list: CruiseDayPlanInterest[], value: CruiseDayPlanInterest) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function CruiseDayPlanForm({
  initialPort = "",
  initialDate = "",
  initialInterests = ["whales"],
  initialActivity = "easy",
  onSubmit,
  isGenerating = false,
}: CruiseDayPlanFormProps) {
  const portOptions = useMemo(() => getCruiseDayPlanPortOptions(), []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const portSlug = String(formData.get("port") ?? "");
    const date = String(formData.get("date") ?? "");
    const activity = String(formData.get("activity") ?? "easy") as CruiseDayPlanInput["activityLevel"];
    const interests = cruiseDayPlanInterests
      .map((option) => option.id)
      .filter((id) => formData.get(`interest-${id}`) === "on");

    if (!portSlug || !date || interests.length === 0) return;

    onSubmit({
      portSlug,
      date,
      interests,
      activityLevel: activity,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-2xl border border-caribbean-200 bg-gradient-to-br from-caribbean-50 via-tropical-sand/40 to-white p-5 shadow-sm sm:p-6 lg:p-8"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caribbean-700">
          Printable cruise day planner
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold text-gray-900 sm:text-3xl">
          Build your Caribbean cruise day plan
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
          Choose your port, cruise date, and interests. We&apos;ll assemble excursions, port logistics,
          passenger snapshot, and ship-day context into a print-ready day plan.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="text-sm font-medium text-gray-700">Cruise port</span>
          <select
            name="port"
            defaultValue={initialPort}
            required
            className="mt-1.5 w-full rounded-xl border border-caribbean-200 bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm focus:border-caribbean-500 focus:outline-none focus:ring-2 focus:ring-caribbean-200"
          >
            <option value="">Select authority port</option>
            {portOptions.map((port) => (
              <option key={port.slug} value={port.slug}>
                {port.name} ({port.region})
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-1">
          <span className="text-sm font-medium text-gray-700">Cruise date</span>
          <input
            type="date"
            name="date"
            defaultValue={initialDate}
            required
            className="mt-1.5 w-full rounded-xl border border-caribbean-200 bg-white px-3 py-2.5 text-base text-gray-900 shadow-sm focus:border-caribbean-500 focus:outline-none focus:ring-2 focus:ring-caribbean-200"
          />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-gray-700">Cruise interests</legend>
        <p className="mt-1 text-xs text-gray-500">Select all that apply — we&apos;ll tailor excursion picks and related guides.</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {cruiseDayPlanInterests.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-caribbean-100 bg-white/90 px-3 py-3 shadow-sm transition hover:border-caribbean-300 has-[:checked]:border-caribbean-500 has-[:checked]:bg-caribbean-50"
            >
              <input
                type="checkbox"
                name={`interest-${option.id}`}
                defaultChecked={initialInterests.includes(option.id)}
                className="mt-1 h-4 w-4 rounded border-caribbean-300 text-caribbean-700 focus:ring-caribbean-500"
              />
              <span>
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <span aria-hidden>{option.icon}</span>
                  {option.label}
                </span>
                <span className="mt-0.5 block text-xs text-gray-600">{option.description}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-gray-700">Activity level</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {cruiseDayPlanActivityLevels.map((level) => (
            <label
              key={level.id}
              className="flex cursor-pointer flex-col rounded-xl border border-caribbean-100 bg-white/90 px-3 py-3 shadow-sm transition hover:border-caribbean-300 has-[:checked]:border-caribbean-500 has-[:checked]:bg-caribbean-50"
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="activity"
                  value={level.id}
                  defaultChecked={initialActivity === level.id}
                  className="h-4 w-4 border-caribbean-300 text-caribbean-700 focus:ring-caribbean-500"
                />
                <span className="text-sm font-semibold text-gray-900">{level.label}</span>
              </span>
              <span className="mt-1 pl-6 text-xs text-gray-600">{level.description}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-wrap gap-3 print:hidden">
        <button type="submit" disabled={isGenerating} className="btn-primary">
          {isGenerating ? "Building plan…" : "Generate My Cruise Day Plan"}
        </button>
      </div>
    </form>
  );
}
