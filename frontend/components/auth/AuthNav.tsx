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
        className="h-9 w-[11rem] shrink-0 rounded-full border border-white/70 bg-white/60 shadow-soft"
        aria-hidden
      />
    );
  }

  if (!user) {
    return (
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
        <Link
          href="/login"
          className="rounded-full border border-gray-200/95 bg-white/95 px-3.5 py-2 text-xs font-semibold text-gray-800 shadow-soft transition hover:border-ut-red/40 hover:text-ut-red sm:text-sm"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-full bg-ut-red px-3.5 py-2 text-xs font-semibold text-white shadow-[0_2px_10px_rgba(200,16,46,0.35)] transition hover:bg-ut-red-dark sm:text-sm"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
      <span className="max-w-[10rem] truncate rounded-full border border-gray-100 bg-white/95 px-3.5 py-2 text-xs font-semibold text-gray-900 shadow-soft sm:max-w-[14rem] sm:text-sm">
        Hello, {getDisplayName(user)}
      </span>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full border border-gray-200/95 bg-white px-3.5 py-2 text-xs font-semibold text-gray-800 shadow-soft transition hover:border-ut-red/40 hover:text-ut-red sm:text-sm"
      >
        Log out
      </button>
    </div>
  );
}
