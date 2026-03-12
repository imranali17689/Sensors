/**
 * Full-width red button for "View Parking Trends".
 * Add onClick later to navigate to trends page or open modal.
 */
"use client";

import Link from "next/link";

export default function TrendsButton() {
  return (
    <Link href="/trends">
      <button className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold shadow hover:bg-red-700 transition">
        View Parking Trends
      </button>
    </Link>
  );
}
