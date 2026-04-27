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
        className="h-[3.5rem] w-full rounded-2xl border border-white/70 bg-white/50 shadow-soft ring-1 ring-black/[0.03]"
        aria-hidden
      />
    );
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-white/85 bg-white/95 p-5 shadow-card ring-1 ring-black/[0.04]">
        <p className="text-center text-sm font-semibold text-gray-900">
          Sign up to view parking trends.
        </p>
        <p className="mt-1 text-center text-xs leading-relaxed text-ut-muted">
          Unlock historical occupancy patterns and predictions.
        </p>
        <Link
          href="/signup"
          className="focus-ring-ut mt-5 flex w-full items-center justify-center rounded-xl bg-ut-red px-4 py-3.5 text-[0.9375rem] font-semibold text-white shadow-[0_3px_12px_rgba(200,16,46,0.35)] transition hover:bg-ut-red-dark active:translate-y-px"
        >
          Sign up to continue
        </Link>
        <Link
          href="/login"
          className="mt-3 block text-center text-sm font-semibold text-ut-red underline-offset-2 hover:underline"
        >
          Already have an account? Sign in
        </Link>
      </div>
    );
  }

  return (
    <Link
      href="/trends"
      className="focus-ring-ut flex w-full items-center justify-center rounded-xl border border-ut-red/20 bg-ut-red px-4 py-3.5 text-[0.9375rem] font-semibold text-white shadow-[0_3px_14px_rgba(200,16,46,0.38)] transition hover:bg-ut-red-dark hover:shadow-[0_4px_18px_rgba(200,16,46,0.42)] active:translate-y-px"
    >
      View parking trends
    </Link>
  );
}
