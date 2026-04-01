import Link from "next/link";

/**
 * Navigates to the parking trends page (placeholder until trends UI is built).
 */
export default function TrendsButton() {
  return (
    <Link
      href="/trends"
      className="focus-ring-ut flex w-full items-center justify-center rounded-lg border border-ut-red/25 bg-ut-red px-4 py-3 text-[0.9375rem] font-semibold text-white shadow-[0_1px_2px_rgba(15,20,25,0.06)] transition-all duration-150 hover:border-ut-red-dark hover:bg-ut-red-dark hover:shadow-md active:translate-y-px active:bg-[#8F0B22]"
    >
      View parking trends
    </Link>
  );
}
