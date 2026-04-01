/**
 * Top header card: logo, title, subtitle, and tagline.
 * Replace the logo src with your actual University of Tampa logo asset.
 */
export default function HeaderCard() {
  return (
    <header className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4">
      {/* Logo: replace /ut-logo.png with your logo in public/ */}
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-ut-red flex items-center justify-center text-white font-bold text-lg">
        UT
      </div>
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-gray-900 truncate">
          OpenSpot Parking
        </h1>
        <p className="text-sm font-medium text-gray-600">University of Tampa</p>
        <p className="text-xs text-gray-500 mt-0.5">
          Real-time parking availability
        </p>
      </div>
    </header>
  );
}
