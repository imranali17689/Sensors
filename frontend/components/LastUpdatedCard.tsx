import { Clock } from "lucide-react";

type LastUpdatedCardProps = {
  timeString: string;
};

/**
 * Last refresh — matches elevated card styling used on the dashboard.
 */
export default function LastUpdatedCard({ timeString }: LastUpdatedCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3.5 shadow-card ring-1 ring-black/[0.03] backdrop-blur-[2px] sm:px-5 sm:py-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-soft ring-1 ring-gray-100">
        <Clock className="h-[1.125rem] w-[1.125rem] text-ut-red" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-gray-500">
          Last updated
        </p>
        <p className="mt-0.5 text-sm font-semibold tabular-nums text-gray-900 sm:text-base">
          {timeString}
        </p>
      </div>
    </div>
  );
}
