import type { GarageId } from "@/lib/types";

type GarageTabsProps = {
  selectedGarage: GarageId;
  onSelect: (garage: GarageId) => void;
};

const TABS: GarageId[] = ["Grand", "Sykes", "West"];

/**
 * Tab bar to switch between Grand, Sykes, and West garages.
 * Active tab: red background, white text. Inactive: light background, dark text.
 */
export default function GarageTabs({ selectedGarage, onSelect }: GarageTabsProps) {
  return (
    <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
      {TABS.map((garage) => {
        const isActive = selectedGarage === garage;
        return (
          <button
            key={garage}
            type="button"
            onClick={() => onSelect(garage)}
            className={`
              flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-colors
              ${isActive
                ? "bg-ut-red text-white shadow"
                : "bg-white text-gray-800 hover:bg-gray-50"
              }
            `}
          >
            {garage}
          </button>
        );
      })}
    </div>
  );
}
