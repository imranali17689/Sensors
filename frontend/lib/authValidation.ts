export type FieldErrors<T extends string> = Partial<Record<T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function validateLogin(input: {
  email: string;
  password: string;
}): FieldErrors<"email" | "password"> {
  const errors: FieldErrors<"email" | "password"> = {};
  if (!input.email.trim()) errors.email = "Email is required.";
  else if (!isValidEmail(input.email)) errors.email = "Enter a valid email address.";
  if (!input.password) errors.password = "Password is required.";
  return errors;
}

export function validateSignup(input: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}): FieldErrors<"fullName" | "email" | "password" | "confirmPassword"> {
  const errors: FieldErrors<
    "fullName" | "email" | "password" | "confirmPassword"
  > = {};
  if (!input.fullName.trim()) errors.fullName = "Full name is required.";
  if (!input.email.trim()) errors.email = "Email is required.";
  else if (!isValidEmail(input.email)) errors.email = "Enter a valid email address.";
  if (!input.password) errors.password = "Password is required.";
  else if (input.password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  if (!input.confirmPassword)
    errors.confirmPassword = "Please confirm your password.";
  else if (input.password !== input.confirmPassword)
    errors.confirmPassword = "Passwords do not match.";
  return errors;
}
