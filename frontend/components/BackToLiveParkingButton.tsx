import Link from "next/link";

/**
 * Secondary navigation back to the live parking dashboard.
 */
export default function BackToLiveParkingButton() {
  return (
    <Link
      href="/"
      className="focus-ring-ut flex w-full items-center justify-center rounded-lg border border-gray-200/95 bg-white px-4 py-3 text-[0.9375rem] font-semibold text-gray-800 shadow-sm transition-all duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 active:translate-y-px"
    >
      Back to Live Parking
    </Link>
  );
}
