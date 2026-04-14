"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthFormCard from "@/components/auth/AuthFormCard";
import AuthTextField from "@/components/auth/AuthTextField";
import { validateSignup } from "@/lib/authValidation";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSuccess(null);
    const errors = validateSignup({
      fullName,
      email,
      password,
      confirmPassword,
    });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      // Mock: replace with fetch(`${API_BASE}/auth/signup`, { method: 'POST', ... })
      await new Promise((r) => setTimeout(r, 800));
      setSuccess("Account created successfully.");
      setLoading(false);
      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 1600);
    } catch {
      setFormError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] px-4 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <Link
          href="/"
          className="text-center text-sm font-medium text-ut-red hover:underline"
        >
          ← Back to parking dashboard
        </Link>
        <AuthFormCard title="Create account" subtitle="OpenSpot · University of Tampa">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {formError ? (
              <p
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                role="alert"
              >
                {formError}
              </p>
            ) : null}
            {success ? (
              <p
                className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900"
                role="status"
              >
                {success}
              </p>
            ) : null}
            <AuthTextField
              id="signup-name"
              label="Full name"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={setFullName}
              error={fieldErrors.fullName}
            />
            <AuthTextField
              id="signup-email"
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={setEmail}
              error={fieldErrors.email}
            />
            <AuthTextField
              id="signup-password"
              label="Password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={setPassword}
              error={fieldErrors.password}
            />
            <AuthTextField
              id="signup-confirm"
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={fieldErrors.confirmPassword}
            />
            <button
              type="submit"
              disabled={loading || Boolean(success)}
              className="mt-2 w-full rounded-lg bg-ut-red py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-ut-red/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account…" : "Sign up"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-ut-red hover:underline">
              Log in
            </Link>
          </p>
        </AuthFormCard>
      </div>
    </div>
  );
}
