"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDisplayName, useAuth } from "@/components/auth/AuthProvider";

export default function AuthNav() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    router.refresh();
  }

  if (loading) {
    return (
      <div
        className="h-9 w-[11rem] shrink-0 rounded-lg border border-ut-border/60 bg-gray-50/80"
        aria-hidden
      />
    );
  }

  if (!user) {
    return (
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
        <Link
          href="/login"
          className="rounded-lg border border-ut-border bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm transition hover:border-ut-red/35 hover:text-ut-red sm:text-sm"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-lg bg-ut-red px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-ut-red-dark sm:text-sm"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
      <span className="max-w-[10rem] truncate rounded-lg border border-ut-border bg-gray-50/90 px-3 py-1.5 text-xs font-semibold text-gray-800 sm:max-w-[14rem] sm:text-sm">
        Hello, {getDisplayName(user)}
      </span>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg border border-ut-border bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm transition hover:border-ut-red/35 hover:text-ut-red sm:text-sm"
      >
        Log out
      </button>
    </div>
  );
}
