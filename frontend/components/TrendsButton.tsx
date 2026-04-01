/**
 * Primary CTA for parking trends (navigation can be wired later).
 */
export default function TrendsButton() {
  return (
    <button
      type="button"
      className="focus-ring-ut w-full rounded-lg border border-ut-red/20 bg-ut-red px-4 py-3.5 text-[0.9375rem] font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-ut-red-dark hover:shadow active:bg-[#8F0B22]"
    >
      View parking trends
    </button>
  );
}
