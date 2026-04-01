"use client";

import { useState, useCallback } from "react";
import DashboardShell from "@/components/DashboardShell";
import HeaderCard from "@/components/HeaderCard";
import GarageTabs from "@/components/GarageTabs";
import ParkingTrendsCard from "@/components/ParkingTrendsCard";
import PredictedAvailabilityCard from "@/components/PredictedAvailabilityCard";
import BackToLiveParkingButton from "@/components/BackToLiveParkingButton";
import { getTrendsForGarage } from "@/lib/trendsData";
import type { GarageId } from "@/lib/types";

export default function TrendsPage() {
  const [selectedGarage, setSelectedGarage] = useState<GarageId>("Grand");

  const handleGarageSelect = useCallback((garage: GarageId) => {
    setSelectedGarage(garage);
  }, []);

  const trends = getTrendsForGarage(selectedGarage);

  return (
    <DashboardShell>
      <HeaderCard />
      <GarageTabs
        selectedGarage={selectedGarage}
        onSelect={handleGarageSelect}
      />
      <div className="flex flex-col gap-4 sm:gap-5">
        <ParkingTrendsCard heatmap={trends.heatmap} />
        <PredictedAvailabilityCard
          bestTimeLabel={trends.bestTimeLabel}
          description={trends.bestTimeDescription}
        />
      </div>
      <div className="rounded-xl border border-ut-border bg-white/90 p-4 shadow-card backdrop-blur-sm sm:p-5">
        <BackToLiveParkingButton />
      </div>
    </DashboardShell>
  );
}
