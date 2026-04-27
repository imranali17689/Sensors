import Link from "next/link";

/**
 * Secondary navigation back to the live parking dashboard.
 */
export default function BackToLiveParkingButton() {
  return (
    <Link
      href="/"
      className="focus-ring-ut flex w-full items-center justify-center rounded-xl border border-gray-200/95 bg-white/95 px-4 py-3.5 text-[0.9375rem] font-semibold text-gray-900 shadow-soft transition hover:border-gray-300 hover:bg-gray-50 active:translate-y-px"
    >
      Back to Live Parking
    </Link>
  );
}
