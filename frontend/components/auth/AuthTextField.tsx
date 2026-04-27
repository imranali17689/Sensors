type AuthTextFieldProps = {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
};

export default function AuthTextField({
  id,
  label,
  type = "text",
  autoComplete,
  value,
  onChange,
  error,
  disabled,
}: AuthTextFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wide text-gray-600"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring-ut rounded-xl border border-gray-200/90 bg-white/95 px-3.5 py-3 text-sm text-gray-900 shadow-soft outline-none ring-1 ring-black/[0.02] transition placeholder:text-gray-400 focus:border-ut-red/30 disabled:opacity-60"
      />
      {error ? (
        <p className="text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
