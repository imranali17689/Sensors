import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OpenSpot Parking | University of Tampa",
  description: "Real-time parking availability at University of Tampa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSans.variable}>
      <body className={`${sourceSans.className} antialiased text-ut-navy`}>
        {children}
      </body>
    </html>
  );
}
