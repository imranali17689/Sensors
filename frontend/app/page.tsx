"use client";

import { useState, useCallback, useEffect } from "react";
import DashboardShell from "@/components/DashboardShell";
import HeaderCard from "@/components/HeaderCard";
import GarageTabs from "@/components/GarageTabs";
import ParkingCard from "@/components/ParkingCard";
import LastUpdatedCard from "@/components/LastUpdatedCard";
import TrendsButton from "@/components/TrendsButton";
import { getGarageData, getGarageStatus } from "@/lib/data";
import { formatTime } from "@/lib/utils";
import type { GarageId, ParkingCounts } from "@/lib/types";

/**
 * Main dashboard page. Grand student counts can come from getGarageStatus();
 * other garages and faculty use mock data from getGarageData.
 */
export default function DashboardPage() {
  const [selectedGarage, setSelectedGarage] = useState<GarageId>("Grand");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  /** Live Grand/student row from backend; null until fetch succeeds or if fetch failed (then mock is used). */
  const [liveGrandStudent, setLiveGrandStudent] = useState<ParkingCounts | null>(
    null
  );

  const handleGarageSelect = useCallback((garage: GarageId) => {
    setSelectedGarage(garage);
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadGrandStudentStatus() {
      try {
        const data = await getGarageStatus();
        if (cancelled) return;
        setLiveGrandStudent({
          occupied: data.occupied,
          available: data.available,
          total: data.capacity,
        });
        setLastUpdated(new Date());
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch garage status:", error);
          setLiveGrandStudent(null);
        }
      }
    }

    loadGrandStudentStatus();
    return () => {
      cancelled = true;
    };
  }, []);

  const garage = getGarageData(selectedGarage);

  const studentCounts: ParkingCounts =
    selectedGarage === "Grand" && liveGrandStudent !== null
      ? liveGrandStudent
      : garage.parking.student;

  const lastUpdatedString = lastUpdated ? formatTime(lastUpdated) : "Loading...";

  return (
    <DashboardShell>
      <HeaderCard />
      <GarageTabs
        selectedGarage={selectedGarage}
        onSelect={handleGarageSelect}
      />
      <div className="flex flex-col gap-4 sm:gap-5">
        <ParkingCard
          title="Student Parking"
          counts={studentCounts}
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
    </DashboardShell>
  );
}
