"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import AuthFormCard from "@/components/auth/AuthFormCard";
import AuthTextField from "@/components/auth/AuthTextField";
import { mapAuthError } from "@/lib/authErrors";
import { getSupabase } from "@/lib/supabase";
import { isNonEmptyEmail, isValidEmailFormat } from "@/lib/authValidation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!isNonEmptyEmail(email)) {
      setFormError("Enter your email.");
      return;
    }
    if (!isValidEmailFormat(email)) {
      setFormError("Enter a valid email address.");
      return;
    }
    if (!password) {
      setFormError("Enter your password.");
      return;
    }

    setSubmitting(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        setFormError(mapAuthError(error));
        return;
      }
      router.replace("/");
      router.refresh();
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <AuthFormCard title="Sign in" subtitle="OpenSpot Parking · University of Tampa">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          <AuthTextField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={setEmail}
            disabled={submitting}
          />
          <AuthTextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
            disabled={submitting}
          />

          {formError ? (
            <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-800">
              {formError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="focus-ring-ut rounded-lg bg-ut-red px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-ut-red-dark disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-center text-sm text-ut-muted">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-ut-red hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </AuthFormCard>
    </main>
  );
}
