import AuthNav from "@/components/auth/AuthNav";

type HeaderCardProps = {
  /** When false, hides Login/Sign up (e.g. minimal auth-only screens). */
  showAuthNav?: boolean;
};

/**
 * Compact branded header with UT badge, titles, and auth actions.
 */
export default function HeaderCard({ showAuthNav = true }: HeaderCardProps) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/95 shadow-card ring-1 ring-black/[0.04] backdrop-blur-sm">
      <div
        className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl bg-ut-red"
        aria-hidden
      />
      <div className="flex flex-col gap-3 px-4 pb-4 pl-[calc(1rem+3px)] pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-5 sm:pb-4 sm:pt-4 sm:pl-[calc(1.25rem+3px)]">
        <div className="flex min-w-0 flex-1 gap-3.5 sm:gap-4">
          <div className="flex flex-shrink-0 items-start pt-0.5">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-ut-red text-[0.9375rem] font-bold tracking-tight text-white shadow-[0_2px_8px_rgba(200,16,46,0.35)] ring-2 ring-white/40 sm:h-12 sm:w-12 sm:text-base"
              aria-hidden
            >
              UT
            </div>
          </div>
          <div className="min-w-0 flex-1 space-y-0.5 pt-0.5">
            <h1 className="text-[1.125rem] font-bold leading-snug tracking-tight text-gray-900 sm:text-[1.25rem]">
              OpenSpot Parking
            </h1>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gray-500">
              University of Tampa
            </p>
            <p className="text-[0.8125rem] leading-snug text-ut-muted sm:text-sm">
              Real-time parking availability
            </p>
          </div>
        </div>
        {showAuthNav ? (
          <div className="flex shrink-0 justify-end sm:pt-0.5">
            <AuthNav />
          </div>
        ) : null}
      </div>
    </header>
  );
}
