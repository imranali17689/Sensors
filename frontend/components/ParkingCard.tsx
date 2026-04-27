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
 * Student or faculty parking card — layout/styling only; counts come from props.
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
    ? "border-ut-red/15 bg-gradient-to-br from-ut-red/[0.08] to-white"
    : "border-gray-200/95 bg-gradient-to-br from-gray-50 to-white";
  const fillClass = isRed ? "bg-ut-red" : "bg-ut-navy";

  return (
    <article className="rounded-2xl border border-white/80 bg-white/95 p-4 shadow-card ring-1 ring-black/[0.03] backdrop-blur-[2px] transition-shadow duration-300 hover:shadow-card-hover sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border shadow-soft ${iconBg}`}
          >
            <Car
              className={`h-5 w-5 ${accentText}`}
              strokeWidth={2}
              aria-hidden
            />
          </div>
          <div className="min-w-0 pt-0.5">
            <h2 className="text-[0.9375rem] font-semibold leading-tight text-gray-900">
              {title}
            </h2>
            <p className="mt-0.5 text-[0.6875rem] tracking-wide text-ut-muted">
              Lot capacity
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 pt-0.5">
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-gray-100/90 bg-gradient-to-b from-gray-50/90 to-white px-4 py-5 text-center shadow-soft sm:px-5">
        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-gray-500">
          Available now
        </p>
        <p
          className={`mt-2 text-[2.875rem] font-semibold leading-none tabular-nums tracking-[-0.04em] sm:text-[3rem] ${accentText}`}
        >
          {counts.available}
        </p>
        <div className="mt-3 space-y-1 text-[0.8125rem] leading-snug text-gray-600">
          <p>
            <span className="font-semibold tabular-nums text-gray-900">
              {counts.available}
            </span>
            <span className="font-normal text-gray-500"> of </span>
            <span className="tabular-nums font-semibold text-gray-900">
              {counts.total}
            </span>
            <span className="font-normal text-gray-500"> spaces</span>
          </p>
          <p className="text-[0.8125rem] tabular-nums text-ut-muted">
            <span className="font-medium text-gray-700">{counts.occupied}</span>{" "}
            occupied
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-gray-500">
            Lot Availability
          </span>
          <span className="text-xs font-bold tabular-nums text-gray-900">
            {percent}%
          </span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-gray-100 ring-1 ring-inset ring-gray-200/70"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percent} percent of spaces available`}
        >
          <div
            className={`h-full rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] transition-all duration-300 ${fillClass}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </article>
  );
}
