/**
 * Full-width red button for "View Parking Trends".
 * Add onClick later to navigate to trends page or open modal.
 */
export default function TrendsButton() {
  return (
    <button
      type="button"
      className="w-full py-4 rounded-xl bg-ut-red text-white font-semibold text-base shadow-md hover:bg-ut-red/90 active:bg-ut-red/80 transition-colors"
    >
      View Parking Trends
    </button>
  );
}
