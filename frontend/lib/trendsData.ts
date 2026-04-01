import type { GarageId, LocationTrendsData, TrendIntensity } from "./types";

/**
 * Placeholder heatmaps and predictions per garage.
 * Swap this module for API responses when the backend is ready.
 */
const GRAND_HEATMAP: TrendIntensity[][] = [
  [2, 2, 3, 4, 4, 3],
  [2, 3, 4, 5, 5, 4],
  [3, 4, 5, 5, 5, 4],
  [3, 4, 4, 4, 4, 3],
  [2, 2, 3, 3, 3, 2],
];

const SYKES_HEATMAP: TrendIntensity[][] = [
  [1, 2, 3, 3, 3, 2],
  [2, 3, 4, 4, 4, 3],
  [2, 3, 4, 5, 4, 3],
  [2, 3, 3, 4, 3, 2],
  [1, 2, 2, 3, 2, 1],
];

const WEST_HEATMAP: TrendIntensity[][] = [
  [3, 3, 4, 4, 3, 3],
  [3, 4, 4, 5, 5, 4],
  [4, 4, 5, 5, 5, 4],
  [3, 3, 4, 4, 4, 3],
  [2, 2, 3, 3, 3, 2],
];

export const TRENDS_BY_GARAGE: Record<GarageId, LocationTrendsData> = {
  Grand: {
    garageId: "Grand",
    heatmap: GRAND_HEATMAP,
    bestTimeLabel: "3 PM",
    bestTimeDescription: "Typically more open spaces mid-afternoon this month.",
  },
  Sykes: {
    garageId: "Sykes",
    heatmap: SYKES_HEATMAP,
    bestTimeLabel: "10 AM",
    bestTimeDescription: "Morning arrivals taper off; best window before noon.",
  },
  West: {
    garageId: "West",
    heatmap: WEST_HEATMAP,
    bestTimeLabel: "7 PM",
    bestTimeDescription: "Evening classes clear out; availability improves after 6 PM.",
  },
};

export function getTrendsForGarage(garageId: GarageId): LocationTrendsData {
  return TRENDS_BY_GARAGE[garageId];
}
