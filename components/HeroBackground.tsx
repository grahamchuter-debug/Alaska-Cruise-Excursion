import Image from "next/image";
import { HERO_IMAGE } from "@/lib/hero-image";

export function HeroBackground() {
  return (
    <>
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-gray-950/88 via-caribbean-950/72 to-caribbean-800/55"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(64,224,208,0.12),transparent_50%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-gray-950/55 via-gray-950/10 to-transparent"
        aria-hidden
      />
    </>
  );
}
