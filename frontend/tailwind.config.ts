import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ut-red": "#C8102E",
        "ut-red-dark": "#A00D26",
        "ut-navy": "#0F1419",
        "ut-page": "#F4F5F7",
        "ut-page-warm": "#F7F6F4",
        "ut-border": "#E5E7EB",
        "ut-muted": "#6B7280",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 20, 25, 0.06), 0 4px 12px rgba(15, 20, 25, 0.04)",
        "card-hover": "0 2px 4px rgba(15, 20, 25, 0.06), 0 8px 24px rgba(15, 20, 25, 0.06)",
      },
      maxWidth: {
        dashboard: "28rem",
        "dashboard-md": "30rem",
        "dashboard-lg": "34rem",
        "dashboard-xl": "38rem",
      },
      keyframes: {
        "page-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "page-in": "page-in 0.28s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
