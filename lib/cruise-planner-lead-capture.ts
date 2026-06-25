/**
 * Placeholder integration for cruise planner PDF lead capture.
 * Wire NEXT_PUBLIC_CRUISE_PLANNER_LEAD_ENDPOINT when a backend/email service is ready.
 */

export interface CruisePlannerLeadRecord {
  email: string;
  marketingConsent: boolean;
  cruiseLineSlug?: string;
  cruiseLineName?: string;
  shipSlug?: string;
  shipName?: string;
  sailingMonth?: string;
  sailingYear?: number;
  portSlugs: string[];
  portNames: string[];
  capturedAt: string;
}

export interface CruisePlannerLeadCaptureResult {
  submitted: boolean;
  storedLocally: boolean;
  error?: string;
}

const LOCAL_STORAGE_KEY = "cruise-planner-leads-dev";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidPlannerEmail(email: string): boolean {
  const trimmed = email.trim();
  return trimmed.length > 0 && EMAIL_PATTERN.test(trimmed);
}

export function normalizePlannerEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isCruisePlannerLeadEndpointConfigured(): boolean {
  const endpoint = process.env.NEXT_PUBLIC_CRUISE_PLANNER_LEAD_ENDPOINT;
  return Boolean(endpoint && endpoint.trim().length > 0);
}

function appendToLocalDevLog(record: CruisePlannerLeadRecord): void {
  if (typeof window === "undefined") return;

  try {
    const existing = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const records: CruisePlannerLeadRecord[] = existing ? JSON.parse(existing) : [];
    records.push(record);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Ignore quota or privacy mode errors — PDF download must still proceed.
  }
}

/**
 * Persist lead data. Never throws; PDF download must not depend on this succeeding.
 */
export async function submitCruisePlannerLead(
  record: CruisePlannerLeadRecord,
): Promise<CruisePlannerLeadCaptureResult> {
  const endpoint = process.env.NEXT_PUBLIC_CRUISE_PLANNER_LEAD_ENDPOINT?.trim();

  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    appendToLocalDevLog(record);
    console.info("[cruise-planner-lead] captured", record);
  }

  if (!endpoint) {
    return { submitted: false, storedLocally: process.env.NODE_ENV === "development" };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      return {
        submitted: false,
        storedLocally: process.env.NODE_ENV === "development",
        error: `Lead endpoint returned ${response.status}`,
      };
    }

    return { submitted: true, storedLocally: false };
  } catch (error) {
    return {
      submitted: false,
      storedLocally: process.env.NODE_ENV === "development",
      error: error instanceof Error ? error.message : "Lead capture failed",
    };
  }
}
