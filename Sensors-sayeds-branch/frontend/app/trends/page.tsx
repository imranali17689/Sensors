 "use client";

import GarageTabs from "@/components/GarageTabs";
import HeaderCard from "@/components/HeaderCard";
import type { GarageId } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

export default function TrendsPage() {
  const [selectedGarage, setSelectedGarage] = useState<GarageId>("Grand");

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6 pb-10">
      <div className="w-full max-w-[400px] flex flex-col gap-5">

        {/* Header */}
        <HeaderCard />

        {/* Garage Tabs */}
        <GarageTabs
          selectedGarage={selectedGarage}
          onSelect={setSelectedGarage}
        />

        {/* Trends Title */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold">
            Parking Trends
          </h2>
          <p className="text-sm text-gray-500">
            Based on last 30 days
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
  <div className="grid grid-cols-6 gap-2">

    {[...Array(18)].map((_, i) => (
      <div
        key={i}
        className="h-6 rounded bg-red-200"
      />
    ))}

  </div>
</div>

        {/* Prediction Section */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-2">
            Predicted Availability
          </h3>

          <p className="text-sm text-gray-500 mb-4">
            Best parking times based on past data
          </p>

          <div className="text-lg font-semibold text-green-600">
            Best Time: 3PM
          </div>
        </div>

        {/* Back Button */}
        <Link href="/">
          <button className="bg-gray-200 rounded-lg py-3 w-full">
            Back to Live Parking
          </button>
        </Link>

      </div>
    </main>
  );
}