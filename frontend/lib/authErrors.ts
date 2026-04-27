import type { AuthError } from "@supabase/supabase-js";

/**
 * Map Supabase auth errors to a short user-facing message.
 */
export function mapAuthError(error: AuthError | null | undefined): string {
  if (!error) return "Something went wrong. Please try again.";

  const code = error.message?.toLowerCase() ?? "";
  if (code.includes("invalid login credentials")) {
    return "Invalid email or password.";
  }
  if (code.includes("email not confirmed")) {
    return "Please confirm your email before signing in.";
  }
  if (code.includes("user already registered")) {
    return "An account with this email already exists.";
  }
  if (code.includes("password")) {
    return "Check your password and try again.";
  }

  return error.message || "Something went wrong. Please try again.";
}
