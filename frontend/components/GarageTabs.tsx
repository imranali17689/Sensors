import type { GarageId } from "@/lib/types";

type GarageTabsProps = {
  selectedGarage: GarageId;
  onSelect: (garage: GarageId) => void;
};

const TABS: GarageId[] = ["Grand", "Sykes", "West"];

/**
 * Pill-style garage selector — active tab uses UT red.
 */
export default function GarageTabs({ selectedGarage, onSelect }: GarageTabsProps) {
  return (
    <div
      className="rounded-full border border-white/80 bg-white/55 p-1 shadow-soft ring-1 ring-black/[0.03] backdrop-blur-sm"
      role="tablist"
      aria-label="Select garage"
    >
      <div className="flex gap-1">
        {TABS.map((garage) => {
          const isActive = selectedGarage === garage;
          return (
            <button
              key={garage}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(garage)}
              className={`
                flex-1 rounded-full px-2 py-2.5 text-center text-[0.8125rem] font-semibold tracking-tight transition-all duration-200
                focus-ring-ut sm:text-sm sm:py-3
                ${isActive
                  ? "bg-ut-red text-white shadow-[0_2px_10px_rgba(200,16,46,0.42)] ring-1 ring-white/25"
                  : "bg-transparent text-gray-600 hover:bg-white/90 hover:text-gray-900 active:bg-white"
                }
              `}
            >
              {garage}
            </button>
          );
        })}
      </div>
    </div>
  );
}
