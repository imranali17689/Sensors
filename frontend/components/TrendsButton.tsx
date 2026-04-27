"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

/**
 * Parking trends CTA. Logged-in users go to trends; logged-out users see a sign-up prompt.
 */
export default function TrendsButton() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="h-[3.25rem] w-full rounded-lg border border-ut-border/50 bg-gray-50/80 shadow-sm"
        aria-hidden
      />
    );
  }

  if (!user) {
    return (
      <div className="rounded-xl border border-ut-border bg-white/95 p-4 shadow-card">
        <p className="text-center text-sm font-medium text-gray-800">
          Sign up to view parking trends.
        </p>
        <p className="mt-1 text-center text-xs text-ut-muted">
          Create an account for historical parking insights.
        </p>
        <Link
          href="/signup"
          className="focus-ring-ut mt-4 flex w-full items-center justify-center rounded-lg border border-ut-red/25 bg-ut-red px-4 py-3 text-[0.9375rem] font-semibold text-white shadow-[0_1px_2px_rgba(15,20,25,0.06)] transition-all duration-150 hover:border-ut-red-dark hover:bg-ut-red-dark hover:shadow-md active:translate-y-px active:bg-[#8F0B22]"
        >
          Sign up to continue
        </Link>
        <Link
          href="/login"
          className="mt-2 block text-center text-sm font-semibold text-ut-red hover:underline"
        >
          Already have an account? Sign in
        </Link>
      </div>
    );
  }

  return (
    <Link
      href="/trends"
      className="focus-ring-ut flex w-full items-center justify-center rounded-lg border border-ut-red/25 bg-ut-red px-4 py-3 text-[0.9375rem] font-semibold text-white shadow-[0_1px_2px_rgba(15,20,25,0.06)] transition-all duration-150 hover:border-ut-red-dark hover:bg-ut-red-dark hover:shadow-md active:translate-y-px active:bg-[#8F0B22]"
    >
      View parking trends
    </Link>
  );
}
