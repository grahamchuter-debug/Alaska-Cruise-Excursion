import Link from "next/link";
import { getShipSlugByName } from "@/lib/ship-lookup";

export function ShipNameLink({
  name,
  className = "font-medium text-gray-900",
}: {
  name: string;
  className?: string;
}) {
  const slug = getShipSlugByName(name);

  if (!slug) {
    return <span className={className}>{name}</span>;
  }

  return (
    <Link
      href={`/ships/${slug}`}
      className={`${className} text-caribbean-800 underline-offset-2 transition-colors hover:text-caribbean-900 hover:underline`}
    >
      {name}
    </Link>
  );
}
