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
      className="rounded-lg border border-ut-border bg-white p-1 shadow-sm"
      role="tablist"
      aria-label="Select garage"
    >
      <div className="grid grid-cols-3 gap-0.5">
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
                rounded-md px-3 py-2.5 text-center text-sm font-medium transition-colors duration-150
                focus-ring-ut
                ${isActive
                  ? "bg-ut-red text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
