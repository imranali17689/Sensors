import { Clock } from "lucide-react";

type LastUpdatedCardProps = {
  timeString: string;
};

/**
 * Slim metadata row for last refresh time.
 */
export default function LastUpdatedCard({ timeString }: LastUpdatedCardProps) {
  return (
    <div className="flex items-center justify-center gap-2 border-t border-ut-border/80 pt-5 text-xs text-ut-muted">
      <Clock className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" aria-hidden />
      <span>
        Last updated{" "}
        <time className="font-semibold tabular-nums text-gray-700">
          {timeString}
        </time>
      </span>
    </div>
  );
}
