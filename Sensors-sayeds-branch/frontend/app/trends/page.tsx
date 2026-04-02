"use client";

import GarageTabs from "@/components/GarageTabs";
import HeaderCard from "@/components/HeaderCard";
import { getGarageTrends } from "@/lib/data";
import type { GarageId } from "@/lib/types";
import { getTrendColor } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function TrendsPage() {
  const [selectedGarage, setSelectedGarage] =
    useState<GarageId>("Grand");

  const [selectedTimeIndex, setSelectedTimeIndex] = useState(3);

  const trends = getGarageTrends(selectedGarage);

  const times = ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"];

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6 pb-10">
      <div className="w-full max-w-[400px] flex flex-col gap-5">

        {/* Header */}
        <HeaderCard />

        {/* Title */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h2 className="text-lg font-semibold">Parking Trends</h2>
          <p className="text-sm text-gray-500">
            Based on last 30 days
          </p>
        </div>

        {/* Tabs (fixed layering) */}
        <div className="relative z-20">
          <GarageTabs
            selectedGarage={selectedGarage}
            onSelect={setSelectedGarage}
          />
        </div>

        {/* Heatmap */}
        <div className="bg-white rounded-2xl shadow-md p-6 relative z-0">

          {/* Legend */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <span className="text-red-500">Few Spots Available</span>
            <div className="flex-1 mx-4 h-2 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full" />
            <span className="text-green-600">Many Spots Available</span>
          </div>

          {/* Time Labels */}
          <div className="flex justify-between text-xs text-gray-500 mb-2 pl-12">
            {times.map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>

          {/* Heatmap Grid */}
          <div className="relative">

            {/* Vertical Line (FIXED) */}
            <div
              className="absolute top-0 bottom-0 border-l-2 border-dashed border-red-500 pointer-events-none"
              style={{
                left: `calc(48px + ${(selectedTimeIndex / (times.length - 1)) * 100}%)`,
              }}
            />

            {/* Tooltip (FIXED) */}
            <div
              className="absolute top-6 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg pointer-events-none"
              style={{
                left: `calc(48px + ${(selectedTimeIndex / (times.length - 1)) * 100}%)`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="font-semibold">{times[selectedTimeIndex]}</div>
              <div>
                Avg Spots: {trends?.[0]?.values?.[selectedTimeIndex] ?? 0}
              </div>
              <div>Status: Busy</div>
            </div>

            {/* Grid */}
            <div className="space-y-2">
              {trends.map((row, i) => (
                <div key={i} className="flex items-center gap-2">

                  {/* Y Axis */}
                  <div className="w-12 text-xs text-gray-500">
                    {row.time}
                  </div>

                  {/* Cells */}
                  <div className="flex flex-1 gap-[2px]">
                    {row.values.map((val, j) => (
                      <div
                        key={j}
                        className={`flex-1 h-8 rounded-sm ${getTrendColor(val)} transition`}
                      />
                    ))}
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Slider */}
          <input
            type="range"
            min={0}
            max={times.length - 1}
            value={selectedTimeIndex}
            onChange={(e) =>
              setSelectedTimeIndex(Number(e.target.value))
            }
            className="w-full mt-6"
          />

        </div>

        {/* Prediction */}
        <div className="bg-white rounded-2xl shadow-md p-5">
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

        {/* Back */}
        <Link href="/">
          <button className="bg-gray-200 rounded-xl py-3 w-full">
            Back to Live Parking
          </button>
        </Link>

      </div>
    </main>
  );
}