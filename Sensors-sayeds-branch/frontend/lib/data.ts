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

/**
 * Mock parking trends data (last 30 days)
 * Each row = time of day, values = availability % at different levels
 */
export const GARAGE_TRENDS: Record<Garage["id"], { time: string; values: number[] }[]> = {
  Grand: [
    { time: "8 AM", values: [80, 70, 60, 50, 40, 30] },
    { time: "10 AM", values: [60, 50, 40, 30, 20, 10] },
    { time: "12 PM", values: [40, 30, 20, 10, 5, 5] },
    { time: "2 PM", values: [30, 20, 10, 5, 5, 5] },
    { time: "4 PM", values: [50, 40, 30, 20, 15, 10] },
    { time: "6 PM", values: [80, 70, 60, 50, 40, 30] },
    { time: "8 PM", values: [95, 85, 75, 65, 55, 45] },
  ],

  Sykes: [
    { time: "8 AM", values: [70, 60, 50, 40, 30, 20] },
    { time: "10 AM", values: [50, 40, 30, 20, 15, 10] },
    { time: "12 PM", values: [30, 20, 15, 10, 5, 5] },
    { time: "2 PM", values: [20, 15, 10, 5, 5, 5] },
    { time: "4 PM", values: [40, 30, 20, 15, 10, 5] },
    { time: "6 PM", values: [70, 60, 50, 40, 30, 20] },
    { time: "8 PM", values: [85, 75, 65, 55, 45, 35] },
  ],

  West: [
    { time: "8 AM", values: [60, 50, 40, 30, 20, 10] },
    { time: "10 AM", values: [40, 30, 20, 15, 10, 5] },
    { time: "12 PM", values: [20, 15, 10, 5, 5, 5] },
    { time: "2 PM", values: [15, 10, 5, 5, 5, 5] },
    { time: "4 PM", values: [30, 20, 15, 10, 5, 5] },
    { time: "6 PM", values: [60, 50, 40, 30, 20, 10] },
    { time: "8 PM", values: [80, 70, 60, 50, 40, 30] },
  ],
};

/**
 * Get trends data for selected garage
 */
export function getGarageTrends(garageId: Garage["id"]) {
  return GARAGE_TRENDS[garageId];
}