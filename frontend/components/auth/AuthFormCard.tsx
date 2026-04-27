import type { ReactNode } from "react";

type AuthFormCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function AuthFormCard({
  title,
  subtitle,
  children,
}: AuthFormCardProps) {
  return (
    <div className="w-full max-w-md rounded-xl border border-ut-border bg-white p-6 shadow-card sm:p-8">
      <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-1.5 text-sm text-ut-muted sm:text-[0.9375rem]">
          {subtitle}
        </p>
      ) : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}
