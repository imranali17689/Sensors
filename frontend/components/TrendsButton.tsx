/**
 * Primary CTA for parking trends (navigation can be wired later).
 */
export default function TrendsButton() {
  return (
    <button
      type="button"
      className="focus-ring-ut w-full rounded-lg border border-ut-red/25 bg-ut-red px-4 py-3 text-[0.9375rem] font-semibold text-white shadow-[0_1px_2px_rgba(15,20,25,0.06)] transition-all duration-150 hover:border-ut-red-dark hover:bg-ut-red-dark hover:shadow-md active:translate-y-px active:bg-[#8F0B22]"
    >
      View parking trends
    </button>
  );
}
