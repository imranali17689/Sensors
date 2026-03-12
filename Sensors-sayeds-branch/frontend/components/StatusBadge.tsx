import type { ParkingStatus } from "@/lib/types";

type StatusBadgeProps = {
  status: ParkingStatus;
};

/**
 * Pill showing status (Available / Nearly full / Full) with a green dot for Available.
 */
export default function StatusBadge({ status }: StatusBadgeProps) {
  const isAvailable = status === "Available";
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
        ${isAvailable ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-700"}
      `}
    >
      {isAvailable && (
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden />
      )}
      {status}
    </span>
  );
}
