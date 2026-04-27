import AuthNav from "@/components/auth/AuthNav";

type HeaderCardProps = {
  /** When false, hides Login/Sign up (e.g. minimal auth-only screens). */
  showAuthNav?: boolean;
};

/**
 * Top header card: logo, title, subtitle, tagline, and optional auth actions.
 */
export default function HeaderCard({ showAuthNav = true }: HeaderCardProps) {
  return (
    <header className="relative overflow-hidden rounded-xl border border-ut-border bg-white shadow-card">
      <div
        className="absolute left-0 top-0 h-full w-[3px] bg-ut-red"
        aria-hidden
      />
      <div className="flex flex-col gap-4 px-5 py-[1.125rem] pl-[1.375rem] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5 sm:pl-6">
        <div className="flex min-w-0 flex-1 items-center gap-5 sm:gap-6">
          <div className="flex flex-shrink-0 items-center justify-center self-center">
            <div
              className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-[10px] border border-ut-red/12 bg-ut-red text-[1rem] font-bold tracking-tight text-white shadow-[0_1px_2px_rgba(15,20,25,0.08)] sm:h-[3.625rem] sm:w-[3.625rem]"
              aria-hidden
            >
              UT
            </div>
          </div>
          <div className="min-w-0 flex-1 border-l border-gray-100/90 pl-5 sm:pl-6">
            <p className="text-[0.625rem] font-semibold uppercase leading-none tracking-[0.14em] text-gray-500">
              University of Tampa
            </p>
            <h1 className="mt-2 text-[1.3125rem] font-semibold leading-[1.2] tracking-[-0.02em] text-gray-900 sm:text-[1.375rem]">
              OpenSpot Parking
            </h1>
            <p className="mt-1.5 text-[0.8125rem] leading-snug text-ut-muted sm:text-sm">
              Real-time parking availability
            </p>
          </div>
        </div>
        {showAuthNav ? <AuthNav /> : null}
      </div>
    </header>
  );
}
