"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

/**
 * Trends CTA is only available to authenticated users.
 * Guests see a sign-up prompt instead.
 */
export default function TrendsButton() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-14 w-full rounded-xl bg-gray-100 shadow-sm" aria-hidden />;
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-md">
        <p className="text-sm font-medium text-gray-800">
          Sign up to view parking trends.
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Create an account to unlock historical parking insights.
        </p>
        <Link
          href="/signup"
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-ut-red py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-ut-red/90 active:bg-ut-red/80"
        >
          Sign Up to Continue
        </Link>
      </div>
    );
  }

  return (
    <Link
      href="/trends"
      className="flex w-full items-center justify-center rounded-xl bg-ut-red py-4 text-base font-semibold text-white shadow-md transition-colors hover:bg-ut-red/90 active:bg-ut-red/80"
    >
      View Parking Trends
    </Link>
  );
}
