import type { ParkingCounts } from "./types";

/**
 * Returns the percentage of spots that are available (0–100).
 */
export function getAvailablePercent(counts: ParkingCounts): number {
  if (counts.total <= 0) return 0;
  return Math.round((counts.available / counts.total) * 100);
}

/**
 * Derives a simple status from available count and total.
 */
export function getStatus(counts: ParkingCounts): "Available" | "Nearly full" | "Full" {
  if (counts.available <= 0) return "Full";
  const percent = getAvailablePercent(counts);
  if (percent <= 15) return "Nearly full";
  return "Available";
}

/**
 * Formats a time like "5:36:56 PM" for last updated display.
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function getTrendColor(value: number): string {
  if (value > 80) return "bg-[#2FAE66]";
  if (value > 60) return "bg-[#7ED957]";
  if (value > 40) return "bg-[#FACC15]";
  if (value > 20) return "bg-[#FB923C]";
  return "bg-[#EF4444]";
}