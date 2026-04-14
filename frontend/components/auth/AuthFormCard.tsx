import type { ReactNode } from "react";

type AuthFormCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

/**
 * White card shell consistent with OpenSpot dashboard cards.
 */
export default function AuthFormCard({
  title,
  subtitle,
  children,
}: AuthFormCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-md sm:p-8">
      <h1 className="text-xl font-bold tracking-tight text-gray-900">{title}</h1>
      {subtitle ? (
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}
