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
    ? "border-ut-red/12 bg-ut-red/[0.05]"
    : "border-gray-200/90 bg-gray-50/90";
  const fillClass = isRed ? "bg-ut-red" : "bg-ut-navy";

  return (
    <article className="rounded-xl border border-ut-border bg-white p-4 shadow-card transition-shadow duration-200 hover:shadow-card-hover sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border ${iconBg}`}
          >
            <Car
              className={`h-[1.125rem] w-[1.125rem] ${accentText}`}
              strokeWidth={2}
              aria-hidden
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-[0.9375rem] font-semibold leading-tight text-gray-900">
              {title}
            </h2>
            <p className="mt-0.5 text-[0.6875rem] text-ut-muted">
              Live capacity
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-gray-100/90 bg-gradient-to-b from-gray-50/70 to-white px-4 py-3.5 text-center sm:px-5 sm:py-4">
        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-gray-500">
          Available now
        </p>
        <p
          className={`mt-1.5 text-[2.75rem] font-semibold leading-none tabular-nums tracking-[-0.03em] sm:text-5xl ${accentText}`}
        >
          {counts.available}
        </p>
        <div className="mt-2 space-y-0.5 text-[0.8125rem] leading-snug text-gray-600">
          <p>
            <span className="font-medium text-gray-800 tabular-nums">
              {counts.available}
            </span>
            <span className="text-gray-500"> of </span>
            <span className="tabular-nums text-gray-800">{counts.total}</span>
            <span className="text-gray-500"> spaces</span>
          </p>
          <p className="text-xs text-ut-muted tabular-nums">
            {counts.occupied} occupied
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3.5">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-gray-500">
            Lot availability
          </span>
          <span className="text-xs font-semibold tabular-nums text-gray-800">
            {percent}%
          </span>
        </div>
        <div
          className="h-[7px] overflow-hidden rounded-full bg-gray-100/95 ring-1 ring-inset ring-gray-200/60"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percent} percent of spaces available`}
        >
          <div
            className={`h-full rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 ${fillClass}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </article>
  );
}
