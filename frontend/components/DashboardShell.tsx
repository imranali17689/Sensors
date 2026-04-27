/**
 * Shared outer layout — centered narrow app column (mobile-dashboard style).
 */
export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 pb-16 pt-6 sm:px-5 sm:pb-20 sm:pt-8 md:pt-10">
      <div className="animate-page-in flex w-full max-w-dashboard flex-col gap-5 sm:max-w-dashboard-md sm:gap-6 md:max-w-dashboard-lg lg:max-w-dashboard-xl lg:gap-7">
        {children}
      </div>
    </main>
  );
}
