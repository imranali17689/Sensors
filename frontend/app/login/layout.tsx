import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in | OpenSpot Parking",
};

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
