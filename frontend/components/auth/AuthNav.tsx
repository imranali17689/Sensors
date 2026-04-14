import Link from "next/link";

/**
 * Compact Login / Sign up actions for the dashboard header.
 */
export default function AuthNav() {
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
