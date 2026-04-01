import TrendsHeatmap from "./TrendsHeatmap";
import type { TrendIntensity } from "@/lib/types";

type ParkingTrendsCardProps = {
  heatmap: TrendIntensity[][];
};

/**
 * Trends section: title, subtitle, heatmap, minimal legend.
 */
export default function ParkingTrendsCard({ heatmap }: ParkingTrendsCardProps) {
  return (
    <section className="rounded-xl border border-ut-border bg-white p-4 shadow-card sm:p-5">
      <div className="border-b border-gray-100 pb-3">
        <h2 className="text-[0.9375rem] font-semibold text-gray-900">
          Parking Trends
        </h2>
        <p className="mt-0.5 text-xs text-ut-muted">Based on last 30 days</p>
      </div>
      <div className="pt-4">
        <TrendsHeatmap grid={heatmap} />
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.625rem] text-ut-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-red-50 ring-1 ring-red-100" />
            Lower activity
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-ut-red ring-1 ring-ut-red/30" />
            Higher activity
          </span>
        </div>
      </div>
    </section>
  );
}
