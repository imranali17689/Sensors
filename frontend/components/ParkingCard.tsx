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
 * Student or faculty parking card: icon, title, status, availability, progress.
 */
export default function ParkingCard({
  title,
  counts,
  accentColor,
}: ParkingCardProps) {
  const status: ParkingStatus = getStatus(counts);
  const percent = getAvailablePercent(counts);
  const isRed = accentColor === "red";
  const accentText = isRed ? "text-ut-red" : "text-ut-navy";
  const iconBg = isRed
    ? "border-ut-red/10 bg-ut-red/[0.06]"
    : "border-gray-200/80 bg-gray-50";
  const fillClass = isRed ? "bg-ut-red" : "bg-ut-navy";

  return (
    <article className="rounded-xl border border-ut-border bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border ${iconBg}`}
          >
            <Car
              className={`h-5 w-5 ${accentText}`}
              strokeWidth={1.75}
              aria-hidden
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semibold leading-tight text-gray-900">
              {title}
            </h2>
            <p className="mt-0.5 text-xs text-ut-muted">
              Live capacity
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 pt-0.5">
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-ut-muted">
          Spaces available
        </p>
        <p
          className={`mt-1 text-5xl font-semibold tabular-nums tracking-tight ${accentText}`}
        >
          {counts.available}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-medium text-gray-800">{counts.available}</span>
          {" of "}
          <span className="tabular-nums">{counts.total}</span>
          {" total"}
        </p>
        <p className="mt-1 text-xs text-ut-muted tabular-nums">
          {counts.occupied} occupied
        </p>
      </div>

      <div className="mt-8">
        <div className="mb-1.5 flex items-center justify-between text-[0.6875rem] font-medium text-ut-muted">
          <span>Availability</span>
          <span className="tabular-nums text-gray-700">{percent}%</span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-gray-100"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percent} percent of spaces available`}
        >
          <div
            className={`h-full rounded-full transition-all duration-300 ${fillClass}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </article>
  );
}
