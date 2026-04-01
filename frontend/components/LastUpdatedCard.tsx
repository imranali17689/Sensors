import { Clock } from "lucide-react";

type LastUpdatedCardProps = {
  timeString: string;
};

/**
 * Small card showing last updated time with a clock icon.
 */
export default function LastUpdatedCard({ timeString }: LastUpdatedCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm px-4 py-3 flex items-center gap-2">
      <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" aria-hidden />
      <span className="text-sm text-gray-600">
        Last Updated: <span className="font-medium text-gray-800">{timeString}</span>
      </span>
    </div>
  );
}
