const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignupFieldErrors = Partial<
  Record<"fullName" | "email" | "password" | "confirmPassword", string>
>;

export function isNonEmptyEmail(email: string): boolean {
  return email.trim().length > 0;
}

export function isValidEmailFormat(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function validatePasswordMinLength(password: string, min = 6): boolean {
  return password.length >= min;
}

export function passwordsMatch(password: string, confirm: string): boolean {
  return password === confirm;
}

export function validateSignupFields(input: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}): { ok: true } | { ok: false; errors: SignupFieldErrors } {
  const errors: SignupFieldErrors = {};

  if (!input.fullName.trim()) {
    errors.fullName = "Enter your name.";
  }

  if (!isNonEmptyEmail(input.email)) {
    errors.email = "Enter your email.";
  } else if (!isValidEmailFormat(input.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!validatePasswordMinLength(input.password)) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (!passwordsMatch(input.password, input.confirmPassword)) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }
  return { ok: true };
}
