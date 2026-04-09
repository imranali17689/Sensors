import type { Garage } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000";

/**
 * Mock data for all three garages.
 * Replace with API calls later (e.g. fetch from your backend).
 */
export const GARAGES_DATA: Record<Garage["id"], Garage> = {
  Grand: {
    id: "Grand",
    name: "Grand",
    parking: {
      student: { occupied: 59, available: 141, total: 200 },
      faculty: { occupied: 24, available: 26, total: 50 },
    },
  },
  Sykes: {
    id: "Sykes",
    name: "Sykes",
    parking: {
      student: { occupied: 62, available: 88, total: 150 },
      faculty: { occupied: 18, available: 12, total: 30 },
    },
  },
  West: {
    id: "West",
    name: "West",
    parking: {
      student: { occupied: 55, available: 45, total: 100 },
      faculty: { occupied: 12, available: 8, total: 20 },
    },
  },
};

/**
 * Get parking data for a garage by id.
 * Later you can replace this with: fetch(`/api/garages/${id}`).then(r => r.json())
 */
export function getGarageData(garageId: Garage["id"]): Garage {
  return GARAGES_DATA[garageId];
}

export async function getGarageStatus() {
  const response = await fetch(
    `${API_BASE}/garage-status/grand/student`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch garage status");
  }

  return response.json();
}
