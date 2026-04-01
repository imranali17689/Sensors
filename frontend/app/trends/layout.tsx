import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parking trends | OpenSpot",
  description: "Parking activity trends and predicted availability at University of Tampa",
};

export default function TrendsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
