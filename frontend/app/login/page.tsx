"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthFormCard from "@/components/auth/AuthFormCard";
import AuthTextField from "@/components/auth/AuthTextField";
import { formatAuthError } from "@/lib/authErrors";
import { validateLogin } from "@/lib/authValidation";
import { getSupabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const errors = validateLogin({ email, password });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const { error } = await getSupabase().auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        setFormError(formatAuthError(error));
        return;
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
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
        <AuthFormCard title="Log in" subtitle="OpenSpot · University of Tampa">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {formError ? (
              <p
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                role="alert"
              >
                {formError}
              </p>
            ) : null}
            <AuthTextField
              id="login-email"
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={setEmail}
              error={fieldErrors.email}
            />
            <AuthTextField
              id="login-password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={setPassword}
              error={fieldErrors.password}
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-ut-red py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-ut-red/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in…" : "Log in"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            No account?{" "}
            <Link href="/signup" className="font-semibold text-ut-red hover:underline">
              Sign up
            </Link>
          </p>
        </AuthFormCard>
      </div>
    </div>
  );
}
