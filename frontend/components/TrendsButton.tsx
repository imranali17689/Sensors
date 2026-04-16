import Link from "next/link";

/**
 * Full-width red button for the parking trends page.
 */
export default function TrendsButton() {
  return (
    <Link
      href="/trends"
      className="flex w-full items-center justify-center rounded-xl bg-ut-red py-4 text-base font-semibold text-white shadow-md transition-colors hover:bg-ut-red/90 active:bg-ut-red/80"
    >
      View Parking Trends
    </Link>
  );
}
