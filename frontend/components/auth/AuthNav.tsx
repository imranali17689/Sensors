"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDisplayName, useAuth } from "@/components/auth/AuthProvider";

/**
 * Compact auth actions for the dashboard header.
 */
export default function AuthNav() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    router.refresh();
  }

  if (loading) {
    return <div className="h-9 w-[11rem] rounded-lg bg-gray-100/80" aria-hidden />;
  }

  if (!user) {
    return (
      <div className="flex flex-shrink-0 items-center gap-2">
        <Link
          href="/login"
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm transition hover:border-ut-red/40 hover:text-ut-red sm:text-sm"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-lg bg-ut-red px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-ut-red/90 sm:text-sm"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-shrink-0 items-center gap-2">
      <span className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-800 sm:text-sm">
        Hello, {getDisplayName(user)}
      </span>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm transition hover:border-ut-red/40 hover:text-ut-red sm:text-sm"
      >
        Log out
      </button>
    </div>
  );
}
