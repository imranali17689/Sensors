/**
 * Top header card: logo, title, subtitle, and tagline.
 * Replace the logo circle with your official UT mark in public/ when available.
 */
export default function HeaderCard() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-ut-border bg-white shadow-card">
      <div
        className="absolute left-0 top-0 h-full w-1 bg-ut-red"
        aria-hidden
      />
      <div className="flex items-stretch gap-5 px-5 py-5 pl-6">
        <div className="flex flex-shrink-0 flex-col items-center justify-center">
          <div
            className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-lg border border-ut-red/15 bg-ut-red text-[0.95rem] font-bold tracking-tight text-white shadow-sm"
            aria-hidden
          >
            UT
          </div>
        </div>
        <div className="min-w-0 flex-1 border-l border-gray-100 pl-5">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ut-muted">
            University of Tampa
          </p>
          <h1 className="mt-1 text-[1.375rem] font-semibold leading-tight tracking-tight text-gray-900">
            OpenSpot Parking
          </h1>
          <p className="mt-2 text-sm leading-snug text-ut-muted">
            Real-time parking availability
          </p>
        </div>
      </div>
    </header>
  );
}
