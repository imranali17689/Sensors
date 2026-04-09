import type { Garage, GarageStatusResponse } from "./types";

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

export async function getGarageStatus(): Promise<GarageStatusResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }

  const response = await fetch(`${apiUrl}/status`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch garage status");
  }

  return response.json();
}