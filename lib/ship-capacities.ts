import shipCapacityData from "@/data/ship-capacities.json";

export interface ShipCapacityRecord {
  name: string;
  min: number;
  max: number;
  slug: string | null;
}

const capacityByKey = new Map<string, ShipCapacityRecord>(
  shipCapacityData.ships.map((ship) => [normalizeShipKey(ship.name), ship]),
);

const ALIASES: Record<string, string> = {
  "carnival festivale": "carnival tropicale",
  "explora 1": "msc explora 1",
  "explora 2": "msc explora 2",
  "explora 3": "msc explora 3",
  "explora 4": "msc explora 4",
};

export function normalizeShipKey(name: string): string {
  return name.toLowerCase().replace(/\s+/g, " ").trim();
}

export function formatPassengerCapacity(min: number, max: number): string {
  if (min === max) return min.toLocaleString("en-US");
  return `${min.toLocaleString("en-US")} to ${max.toLocaleString("en-US")}`;
}

export function getShipCapacity(shipName: string): ShipCapacityRecord | null {
  const key = normalizeShipKey(shipName);
  if (capacityByKey.has(key)) return capacityByKey.get(key)!;

  const alias = ALIASES[key];
  if (alias && capacityByKey.has(alias)) return capacityByKey.get(alias)!;

  for (const [storedKey, record] of capacityByKey) {
    if (storedKey === key) return record;
    if (storedKey.includes(key) || key.includes(storedKey)) return record;
  }

  return null;
}

export function getPassengerCapacityLabel(shipName: string): string | null {
  const capacity = getShipCapacity(shipName);
  if (!capacity) return null;
  return formatPassengerCapacity(capacity.min, capacity.max);
}

export function getPassengerCapacityMax(shipName: string): number | null {
  const capacity = getShipCapacity(shipName);
  return capacity?.max ?? null;
}

export function getShipCapacitySource() {
  return {
    source: shipCapacityData.source,
    sourceUrls: shipCapacityData.sourceUrls,
    updatedAt: shipCapacityData.updatedAt,
    shipCount: shipCapacityData.shipCount,
  };
}
