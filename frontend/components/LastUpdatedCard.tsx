import { Clock } from "lucide-react";

type LastUpdatedCardProps = {
  timeString: string;
};

/**
 * Metadata row for last refresh (used inside footer panel on the dashboard).
 */
export default function LastUpdatedCard({ timeString }: LastUpdatedCardProps) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-100 bg-gray-50/60 px-3 py-2.5 text-xs text-ut-muted">
      <Clock className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" aria-hidden />
      <span className="leading-none">
        Last updated{" "}
        <time className="font-semibold tabular-nums text-gray-800">
          {timeString}
        </time>
      </span>
    </div>
  );
}
