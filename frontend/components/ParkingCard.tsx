import { Car } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { getAvailablePercent, getStatus } from "@/lib/utils";
import type { ParkingCounts, ParkingStatus } from "@/lib/types";

type ParkingCardProps = {
  title: string;
  counts: ParkingCounts;
  accentColor: "red" | "navy";
};

/**
 * Reusable card for Student or Faculty parking: icon, title, status pill,
 * large available number, "Available Spots: X / Y", and progress bar.
 */
export default function ParkingCard({
  title,
  counts,
  accentColor,
}: ParkingCardProps) {
  const status: ParkingStatus = getStatus(counts);
  const percent = getAvailablePercent(counts);
  const isRed = accentColor === "red";

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-lg ${isRed ? "bg-ut-red/10" : "bg-ut-navy/10"}`}
          >
            <Car
              className={`w-5 h-5 ${isRed ? "text-ut-red" : "text-ut-navy"}`}
              aria-hidden
            />
          </div>
          <h2 className="font-semibold text-gray-900">{title}</h2>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-4">
        <span
          className={`text-4xl font-bold tabular-nums ${isRed ? "text-ut-red" : "text-ut-navy"}`}
        >
          {counts.available}
        </span>
        <p className="text-sm text-gray-600 mt-1">
          Available Spots: {counts.available} / {counts.total}
        </p>
      </div>

      <div className="mt-auto pt-3">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${isRed ? "bg-ut-red" : "bg-ut-navy"}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
