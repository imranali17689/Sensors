"use client";

import { useState, useCallback } from "react";
import HeaderCard from "@/components/HeaderCard";
import GarageTabs from "@/components/GarageTabs";
import ParkingCard from "@/components/ParkingCard";
import LastUpdatedCard from "@/components/LastUpdatedCard";
import TrendsButton from "@/components/TrendsButton";
import { getGarageData } from "@/lib/data";
import { formatTime } from "@/lib/utils";
import type { GarageId } from "@/lib/types";

/**
 * Main dashboard page. Selected garage is kept in state; switching tabs
 * updates the displayed parking data and last updated time.
 * Later: replace getGarageData(selectedGarage) with an API call.
 */
export default function DashboardPage() {
  const [selectedGarage, setSelectedGarage] = useState<GarageId>("Grand");
  const [lastUpdated, setLastUpdated] = useState<Date>(() => new Date());

  const handleGarageSelect = useCallback((garage: GarageId) => {
    setSelectedGarage(garage);
    setLastUpdated(new Date());
  }, []);

  const garage = getGarageData(selectedGarage);
  const lastUpdatedString = formatTime(lastUpdated);

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6 pb-10">
      <div className="w-full max-w-[400px] flex flex-col gap-5">
        <HeaderCard />
        <GarageTabs
          selectedGarage={selectedGarage}
          onSelect={handleGarageSelect}
        />
        <ParkingCard
          title="Student Parking"
          counts={garage.parking.student}
          accentColor="red"
        />
        <ParkingCard
          title="Faculty Parking"
          counts={garage.parking.faculty}
          accentColor="navy"
        />
        <LastUpdatedCard timeString={lastUpdatedString} />
        <TrendsButton />
      </div>
    </main>
  );
}
