import type { TrendIntensity } from "@/lib/types";

const INTENSITY_STYLES: Record<TrendIntensity, string> = {
  1: "bg-red-50/90 ring-1 ring-red-100/80",
  2: "bg-red-100/85 ring-1 ring-red-200/60",
  3: "bg-red-200/75 ring-1 ring-red-300/50",
  4: "bg-ut-red/45 ring-1 ring-ut-red/30",
  5: "bg-ut-red ring-1 ring-ut-red/40 shadow-sm",
};

type TrendsHeatmapProps = {
  grid: TrendIntensity[][];
};

/**
 * Static placeholder heatmap — 5×6 grid, UT red tints by intensity.
 */
export default function TrendsHeatmap({ grid }: TrendsHeatmapProps) {
  return (
    <div
      className="grid w-full gap-1.5 sm:gap-2"
      style={{
        gridTemplateColumns: `repeat(${grid[0]?.length ?? 6}, minmax(0, 1fr))`,
      }}
      role="img"
      aria-label="Parking activity heatmap, lighter tiles mean lower activity"
    >
      {grid.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`
              aspect-square min-h-[1.75rem] rounded-md transition-transform duration-150
              hover:z-[1] hover:scale-[1.04] hover:shadow-md hover:ring-2 hover:ring-ut-red/25
              ${INTENSITY_STYLES[cell]}
            `}
            title={`Activity level ${cell} of 5`}
          />
        ))
      )}
    </div>
  );
}
