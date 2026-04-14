import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | OpenSpot Parking",
};

export default function SignupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
