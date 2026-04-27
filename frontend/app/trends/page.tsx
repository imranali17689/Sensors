"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import HeaderCard from "@/components/HeaderCard";
import GarageTabs from "@/components/GarageTabs";
import ParkingTrendsCard from "@/components/ParkingTrendsCard";
import PredictedAvailabilityCard from "@/components/PredictedAvailabilityCard";
import BackToLiveParkingButton from "@/components/BackToLiveParkingButton";
import { useAuth } from "@/components/auth/AuthProvider";
import { getTrendsForGarage } from "@/lib/trendsData";
import type { GarageId } from "@/lib/types";

export default function TrendsPage() {
  const { user, loading } = useAuth();
  const [selectedGarage, setSelectedGarage] = useState<GarageId>("Grand");

  const handleGarageSelect = useCallback((garage: GarageId) => {
    setSelectedGarage(garage);
  }, []);

  const trends = getTrendsForGarage(selectedGarage);

  if (loading) {
    return (
      <DashboardShell>
        <HeaderCard />
        <div
          className="h-48 rounded-2xl border border-white/80 bg-white/70 shadow-soft ring-1 ring-black/[0.03]"
          aria-hidden
        />
      </DashboardShell>
    );
  }

  if (!user) {
    return (
      <DashboardShell>
        <HeaderCard />
        <div className="rounded-2xl border border-white/85 bg-white/95 p-6 shadow-card ring-1 ring-black/[0.04] sm:p-8">
          <h2 className="text-lg font-bold text-gray-900">Parking trends</h2>
          <p className="mt-2 text-sm leading-relaxed text-ut-muted">
            Sign in to view historical parking trends and predictions.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="focus-ring-ut inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200/95 bg-white px-4 py-3.5 text-sm font-semibold text-gray-900 shadow-soft transition hover:border-ut-red/35"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="focus-ring-ut inline-flex flex-1 items-center justify-center rounded-xl bg-ut-red px-4 py-3.5 text-sm font-semibold text-white shadow-[0_3px_12px_rgba(200,16,46,0.35)] transition hover:bg-ut-red-dark"
            >
              Sign up
            </Link>
          </div>
        </div>
      </DashboardShell>
    );
  }

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
      <div className="rounded-2xl border border-white/85 bg-white/95 p-4 shadow-card ring-1 ring-black/[0.03] backdrop-blur-[2px] sm:p-5">
        <BackToLiveParkingButton />
      </div>
    </DashboardShell>
  );
}
