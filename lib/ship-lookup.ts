import { ships } from "@/data/ships";

/** Resolve a schedule/display ship name to a ship guide slug when possible. */
export function getShipSlugByName(shipName: string): string | undefined {
  const normalized = shipName.trim().toLowerCase();
  if (!normalized) return undefined;

  const exact = ships.find((ship) => ship.name.toLowerCase() === normalized);
  if (exact) return exact.slug;

  const partial = ships.find(
    (ship) =>
      normalized.includes(ship.name.toLowerCase()) ||
      ship.name.toLowerCase().includes(normalized),
  );
  return partial?.slug;
}
