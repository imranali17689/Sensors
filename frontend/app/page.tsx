"use client";

import { useState, useCallback, useEffect } from "react";
import HeaderCard from "@/components/HeaderCard";
import GarageTabs from "@/components/GarageTabs";
import ParkingCard from "@/components/ParkingCard";
import LastUpdatedCard from "@/components/LastUpdatedCard";
import TrendsButton from "@/components/TrendsButton";
import { getGarageData, getGarageStatus } from "@/lib/data";
import { formatTime } from "@/lib/utils";
import type { GarageId } from "@/lib/types";



/**
 * Main dashboard page. Selected garage is kept in state; switching tabs
 * updates the displayed parking data and last updated time.
 * Later: replace getGarageData(selectedGarage) with an API call.
 */
export default function DashboardPage() {
  const [selectedGarage, setSelectedGarage] = useState<GarageId>("Grand");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [status, setStatus] = useState ({
    occupied: 0,
    available: 0,
    capacity: 0
  });

  const handleGarageSelect = useCallback((garage: GarageId) => {
    setSelectedGarage(garage);
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    async function loadGarageStatus() {
      try {
        const data = await getGarageStatus();
        console.log("Loaded into page:", data);
        setStatus(data);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Failed to fetch garage status:", error);
      }
    }
    loadGarageStatus();
  }, []);

  const garage = getGarageData(selectedGarage);
  const lastUpdatedString = lastUpdated ? formatTime(lastUpdated) : "Loading..."
  
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-8 pb-14 sm:px-6 sm:py-10 md:py-12">
      <div className="flex w-full max-w-dashboard flex-col gap-6 sm:gap-7 md:max-w-dashboard-md md:gap-7 lg:max-w-dashboard-lg lg:gap-8 xl:max-w-dashboard-xl">
        <HeaderCard />
        <GarageTabs
          selectedGarage={selectedGarage}
          onSelect={handleGarageSelect}
        />
        <div className="flex flex-col gap-4 sm:gap-5">
          <ParkingCard
            title="Student Parking"
            counts={{
              occupied: status.occupied,
              available: status.available,
              total: status.capacity,
            }}
            accentColor="red"
          />
          <ParkingCard
            title="Faculty Parking"
            counts={garage.parking.faculty}
            accentColor="navy"
          />
        </div>
        <div className="rounded-xl border border-ut-border bg-white/90 p-4 shadow-card backdrop-blur-sm sm:p-5">
          <LastUpdatedCard timeString={lastUpdatedString} />
          <div className="mt-4">
            <TrendsButton />
          </div>
        </div>
      </div>
    </main>
  );
}
