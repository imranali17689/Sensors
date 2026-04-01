type PredictedAvailabilityCardProps = {
  bestTimeLabel: string;
  description: string;
};

/**
 * Insight card: predicted best time to park (placeholder copy).
 */
export default function PredictedAvailabilityCard({
  bestTimeLabel,
  description,
}: PredictedAvailabilityCardProps) {
  return (
    <section className="rounded-xl border border-ut-border bg-white p-4 shadow-card sm:p-5">
      <h2 className="text-[0.9375rem] font-semibold text-gray-900">
        Predicted Availability
      </h2>
      <p className="mt-1 text-xs text-ut-muted">
        Best parking times based on past data
      </p>
      <div className="mt-4 rounded-lg border border-emerald-200/80 bg-emerald-50/70 px-4 py-3">
        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-emerald-800/90">
          Best time
        </p>
        <p className="mt-1 text-xl font-semibold tabular-nums tracking-tight text-emerald-900">
          {bestTimeLabel}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-emerald-900/80">
          {description}
        </p>
      </div>
    </section>
  );
}
