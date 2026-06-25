interface NavCardCtaProps {
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}

export function NavCardCta({ children, className = "", showArrow = true }: NavCardCtaProps) {
  return (
    <span className={`nav-card-cta ${className}`.trim()}>
      {children}
      {showArrow && (
        <svg
          className="ml-1.5 h-4 w-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </span>
  );
}
