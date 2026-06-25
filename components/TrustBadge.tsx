interface TrustBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
}

/** Subtle planning-trust marker — editorial, not promotional. */
export function TrustBadge({ children, className = "", variant = "light" }: TrustBadgeProps) {
  const variantClass =
    variant === "dark"
      ? "border-white/20 bg-white/10 text-white/90"
      : "border-gray-200/90 bg-white/90 text-gray-700";

  return (
    <span
      className={`inline-flex cursor-default items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-sm ${variantClass} ${className}`}
    >
      <span className={variant === "dark" ? "text-turquoise-light" : "text-caribbean-600"} aria-hidden>
        ✓
      </span>
      {children}
    </span>
  );
}

export const TRUST_BADGE_PRESETS = [
  "Cruise passenger friendly",
  "Easy return to ship",
  "Family favourite",
  "Local expert pick",
  "Independent planning guide",
] as const;

export function TrustBadgeStrip({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {TRUST_BADGE_PRESETS.map((label) => (
        <TrustBadge key={label} variant={variant}>
          {label}
        </TrustBadge>
      ))}
    </div>
  );
}
