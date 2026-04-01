import type { GarageId } from "@/lib/types";

type GarageTabsProps = {
  selectedGarage: GarageId;
  onSelect: (garage: GarageId) => void;
};

const TABS: GarageId[] = ["Grand", "Sykes", "West"];

/**
 * Segmented control for Grand / Sykes / West garages.
 */
export default function GarageTabs({ selectedGarage, onSelect }: GarageTabsProps) {
  return (
    <div
      className="rounded-lg border border-gray-200/95 bg-gradient-to-b from-gray-50/90 to-gray-100/80 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
      role="tablist"
      aria-label="Select garage"
    >
      <div className="grid grid-cols-3 gap-px rounded-[7px] bg-gray-200/60 p-px">
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
                relative rounded-[6px] px-3 py-2.5 text-center text-sm font-semibold transition-all duration-150
                focus-ring-ut
                ${isActive
                  ? "z-[1] bg-ut-red text-white shadow-[0_1px_3px_rgba(200,16,46,0.35),inset_0_1px_0_rgba(255,255,255,0.12)]"
                  : "bg-white/95 text-gray-600 shadow-sm hover:z-[1] hover:bg-white hover:text-gray-900 hover:shadow-md active:bg-gray-50/95"
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
