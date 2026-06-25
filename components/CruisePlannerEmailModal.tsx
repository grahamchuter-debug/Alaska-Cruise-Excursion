"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";

interface CruisePlannerEmailModalProps {
  open: boolean;
  email: string;
  marketingConsent: boolean;
  loading: boolean;
  error?: string;
  onEmailChange: (value: string) => void;
  onMarketingConsentChange: (value: boolean) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function CruisePlannerEmailModal({
  open,
  email,
  marketingConsent,
  loading,
  error,
  onEmailChange,
  onMarketingConsentChange,
  onSubmit,
  onClose,
}: CruisePlannerEmailModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    emailInputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, loading, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-gray-900/50"
        onClick={loading ? undefined : onClose}
        disabled={loading}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative w-full max-w-md rounded-2xl border border-caribbean-200 bg-white p-5 shadow-xl sm:p-6"
      >
        <h2 id={titleId} className="font-display text-xl font-bold text-gray-900">
          Get your cruise planner PDF
        </h2>
        <p id={descriptionId} className="mt-2 text-sm text-gray-600">
          Enter your email and we&apos;ll send you your personalised cruise planner PDF.
        </p>

        <form
          className="mt-5 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email address</span>
            <input
              ref={emailInputRef}
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              disabled={loading}
              className="mt-1.5 w-full rounded-xl border border-caribbean-200 px-3 py-2.5 text-base text-gray-900 shadow-sm focus:border-caribbean-500 focus:outline-none focus:ring-2 focus:ring-caribbean-200"
              placeholder="you@example.com"
            />
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
            <input
              type="checkbox"
              name="marketingConsent"
              checked={marketingConsent}
              onChange={(event) => onMarketingConsentChange(event.target.checked)}
              disabled={loading}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-caribbean-700 focus:ring-caribbean-500"
            />
            <span className="text-sm text-gray-700">
              Send me cruise excursion tips, port updates and offers by email. I can unsubscribe at any
              time.
            </span>
          </label>

          <p className="text-xs leading-5 text-gray-500">
            We use your email to deliver your PDF. Marketing emails are optional and only sent if you
            opt in above. See our{" "}
            <Link href="/privacy" className="font-medium text-caribbean-700 underline hover:text-caribbean-800">
              Privacy Policy
            </Link>
            .
          </p>

          {error && (
            <p className="text-sm text-amber-800" role="alert">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn-secondary text-sm"
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary text-sm" aria-busy={loading}>
              {loading ? "Preparing PDF…" : "Download PDF"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
