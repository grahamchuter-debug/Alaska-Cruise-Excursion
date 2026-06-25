import { portExcursionAuthority } from "@/data/port-excursion-authority";

export function getSignatureExcursionForPort(portSlug: string) {
  return portExcursionAuthority.portTable.find((row) => row.portSlug === portSlug);
}
