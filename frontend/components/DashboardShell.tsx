/**
 * Shared outer layout for dashboard and trends — matches max-width and page padding.
 */
export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-8 pb-14 sm:px-6 sm:py-10 md:py-12">
      <div className="flex w-full max-w-dashboard flex-col gap-6 sm:gap-7 md:max-w-dashboard-md md:gap-7 lg:max-w-dashboard-lg lg:gap-8 xl:max-w-dashboard-xl">
        {children}
      </div>
    </main>
  );
}
