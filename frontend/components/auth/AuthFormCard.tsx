import type { ReactNode } from "react";

type AuthFormCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function AuthFormCard({
  title,
  subtitle,
  children,
}: AuthFormCardProps) {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/85 bg-white/95 p-6 shadow-card ring-1 ring-black/[0.04] backdrop-blur-sm sm:p-8">
      <div
        className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-ut-red via-ut-red to-ut-red-dark opacity-95"
        aria-hidden
      />
      <div className="flex items-center gap-3 pt-1">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ut-red text-sm font-bold text-white shadow-[0_2px_10px_rgba(200,16,46,0.35)]">
          UT
        </div>
        <div className="min-w-0">
          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-gray-500">
            University of Tampa
          </p>
          <p className="truncate text-sm font-semibold text-gray-900">
            OpenSpot Parking
          </p>
        </div>
      </div>
      <h1 className="mt-6 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-1.5 text-sm text-ut-muted sm:text-[0.9375rem]">
          {subtitle}
        </p>
      ) : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}
