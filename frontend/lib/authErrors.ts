import type { AuthError } from "@supabase/supabase-js";

/**
 * Prefer Supabase Auth error messages for the UI.
 */
export function formatAuthError(error: AuthError | null): string {
  if (error?.message) return error.message;
  return "Something went wrong. Please try again.";
}
