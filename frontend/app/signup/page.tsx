"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import AuthFormCard from "@/components/auth/AuthFormCard";
import AuthTextField from "@/components/auth/AuthTextField";
import { mapAuthError } from "@/lib/authErrors";
import { getSupabase } from "@/lib/supabase";
import {
  validateSignupFields,
  type SignupFieldErrors,
} from "@/lib/authValidation";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<SignupFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    const validation = validateSignupFields({
      fullName,
      email,
      password,
      confirmPassword,
    });

    if (!validation.ok) {
      setFieldErrors(validation.errors);
      return;
    }
    setFieldErrors({});

    setSubmitting(true);
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        setFormError(mapAuthError(error));
        return;
      }

      // Session present when email confirmation is disabled
      if (data.session) {
        router.replace("/");
        router.refresh();
        return;
      }

      setSuccessMessage(
        "Check your email to confirm your account. After confirming, you can sign in."
      );
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:px-5 sm:py-14">
      <AuthFormCard title="Create account" subtitle="OpenSpot Parking · University of Tampa">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          <AuthTextField
            id="fullName"
            label="Full name"
            autoComplete="name"
            value={fullName}
            onChange={(v) => setFullName(v)}
            error={fieldErrors.fullName}
            disabled={submitting}
          />
          <AuthTextField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(v) => setEmail(v)}
            error={fieldErrors.email}
            disabled={submitting}
          />
          <AuthTextField
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(v) => setPassword(v)}
            error={fieldErrors.password}
            disabled={submitting}
          />
          <AuthTextField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(v) => setConfirmPassword(v)}
            error={fieldErrors.confirmPassword}
            disabled={submitting}
          />

          {formError ? (
            <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-800">
              {formError}
            </p>
          ) : null}

          {successMessage ? (
            <p className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              {successMessage}{" "}
              <Link href="/login" className="font-semibold text-emerald-800 underline">
                Sign in
              </Link>
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting || !!successMessage}
            className="focus-ring-ut rounded-xl bg-ut-red px-4 py-3.5 text-sm font-semibold text-white shadow-[0_3px_12px_rgba(200,16,46,0.35)] transition hover:bg-ut-red-dark active:translate-y-px disabled:opacity-60"
          >
            {submitting ? "Creating account…" : "Sign up"}
          </button>

          <p className="text-center text-sm text-ut-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-ut-red hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </AuthFormCard>
    </main>
  );
}
