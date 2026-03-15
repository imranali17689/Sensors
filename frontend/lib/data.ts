import type { Garage } from "./types";

/**
 * Mock data for all three garages.
 * Replace with API calls later (e.g. fetch from your backend).
 */
export const GARAGES_DATA: Record<Garage["id"], Garage> = {
  Grand: {
    id: "Grand",
    name: "Grand",
    parking: {
      student: { available: 141, total: 200 },
      faculty: { available: 26, total: 50 },
    },
  },
  Sykes: {
    id: "Sykes",
    name: "Sykes",
    parking: {
      student: { available: 88, total: 150 },
      faculty: { available: 12, total: 30 },
    },
  },
  West: {
    id: "West",
    name: "West",
    parking: {
      student: { available: 45, total: 100 },
      faculty: { available: 8, total: 20 },
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

export async function getStatus() {
  const response = await fetch("http://127.0.0.1:8000/status", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error ("failed to fetch garage status");
  }

  return response.json();
}
