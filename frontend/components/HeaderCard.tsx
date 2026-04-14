import AuthNav from "@/components/auth/AuthNav";

type HeaderCardProps = {
  /** Show Login / Sign up actions (default: true). Hide on auth pages if needed. */
  showAuthNav?: boolean;
};

/**
 * Top header card: logo, title, subtitle, tagline, and optional auth shortcuts.
 */
export default function HeaderCard({ showAuthNav = true }: HeaderCardProps) {
  return (
    <header className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-ut-red text-lg font-bold text-white">
          UT
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-gray-900">
            OpenSpot Parking
          </h1>
          <p className="text-sm font-medium text-gray-600">University of Tampa</p>
          <p className="mt-0.5 text-xs text-gray-500">
            Real-time parking availability
          </p>
        </div>
      </div>
      {showAuthNav ? <AuthNav /> : null}
    </header>
  );
}
