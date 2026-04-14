import { forwardRef } from "react";

type AuthTextFieldProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
};

const AuthTextField = forwardRef<HTMLInputElement, AuthTextFieldProps>(
  function AuthTextField(
    { id, label, type = "text", autoComplete, error, value, onChange },
    ref
  ) {
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:ring-2 focus:ring-ut-red/30 ${
            error
              ? "border-red-300 focus:border-red-400"
              : "border-gray-200 focus:border-ut-red/50"
          }`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error ? (
          <p id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

export default AuthTextField;
