"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import HeaderCard from "@/components/HeaderCard";
import GarageTabs from "@/components/GarageTabs";
import type { GarageId } from "@/lib/types";

type TrendsData = {
  bestTime: string;
  heatmap: number[];
};

const TRENDS_BY_GARAGE: Record<GarageId, TrendsData> = {
  Grand: {
    bestTime: "3PM",
    heatmap: [1, 1, 2, 2, 2, 1, 1, 2, 2, 3, 3, 2, 1, 2, 3, 4, 4, 3, 1, 2, 2, 3, 3, 2, 1, 1, 2, 2, 2, 1],
  },
  Sykes: {
    bestTime: "10AM",
    heatmap: [1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 3, 2, 1, 2, 3, 3, 3, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1],
  },
  West: {
    bestTime: "6PM",
    heatmap: [1, 2, 2, 2, 1, 1, 2, 2, 3, 3, 2, 1, 2, 3, 3, 4, 3, 2, 2, 2, 3, 3, 2, 1, 1, 2, 2, 2, 1, 1],
  },
};

const TILE_STYLES = [
  "bg-red-50",
  "bg-red-100",
  "bg-red-200",
  "bg-red-300",
  "bg-ut-red/80",
];

export default function TrendsPage() {
  const [selectedGarage, setSelectedGarage] = useState<GarageId>("Grand");

  const trends = useMemo(() => TRENDS_BY_GARAGE[selectedGarage], [selectedGarage]);

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6 pb-10">
      <div className="w-full max-w-[400px] flex flex-col gap-5">
        <HeaderCard />
        <GarageTabs
          selectedGarage={selectedGarage}
          onSelect={setSelectedGarage}
        />

        <section className="rounded-2xl bg-white p-4 shadow-md">
          <h2 className="text-base font-semibold text-gray-900">Parking Trends</h2>
          <p className="mt-1 text-sm text-gray-500">Based on last 30 days</p>
          <div className="mt-4 grid grid-cols-6 gap-2">
            {trends.heatmap.map((level, index) => (
              <div
                key={index}
                className={`h-7 rounded-md ${TILE_STYLES[level] ?? TILE_STYLES[0]} transition-transform hover:scale-[1.02]`}
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-md">
          <h2 className="text-base font-semibold text-gray-900">Predicted Availability</h2>
          <p className="mt-1 text-sm text-gray-500">Best parking times based on past data</p>
          <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
            <p className="text-sm font-medium text-gray-600">Best Time:</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">{trends.bestTime}</p>
          </div>
        </section>

        <Link
          href="/"
          className="flex w-full items-center justify-center rounded-xl bg-gray-100 py-4 text-base font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-200"
        >
          Back to Live Parking
        </Link>
      </div>
    </main>
  );
}
