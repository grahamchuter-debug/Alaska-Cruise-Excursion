import { HeroBackground } from "@/components/HeroBackground";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  compact?: boolean;
}

export function PageHero({ title, subtitle, children, compact }: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden text-white ${compact ? "py-14 sm:py-16" : "py-20 sm:py-28"}`}
    >
      <HeroBackground />
      <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-5xl max-w-3xl drop-shadow-md">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg drop-shadow-sm">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
