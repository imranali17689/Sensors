import type { ParkingStatus } from "@/lib/types";

type StatusBadgeProps = {
  status: ParkingStatus;
};

const styles: Record<
  ParkingStatus,
  { container: string; dot?: string }
> = {
  Available: {
    container:
      "border border-emerald-200/80 bg-emerald-50/90 text-emerald-900",
    dot: "bg-emerald-600",
  },
  "Nearly full": {
    container:
      "border border-amber-200/80 bg-amber-50/90 text-amber-950",
    dot: "bg-amber-600",
  },
  Full: {
    container:
      "border border-red-200/80 bg-red-50/90 text-red-950",
    dot: "bg-red-600",
  },
};

/**
 * Status pill: Available, Nearly full, or Full.
 */
export default function StatusBadge({ status }: StatusBadgeProps) {
  const { container, dot } = styles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide ${container}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${dot}`}
          aria-hidden
        />
      )}
      {status}
    </span>
  );
}
