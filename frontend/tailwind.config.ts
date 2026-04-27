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
        "ut-page": "#faf6f6",
        "ut-page-warm": "#fff7f7",
        "ut-border": "#e8e4e4",
        "ut-muted": "#6B7280",
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 20, 25, 0.05), 0 8px 28px rgba(15, 20, 25, 0.06)",
        "card-hover": "0 4px 12px rgba(15, 20, 25, 0.07), 0 16px 40px rgba(200, 16, 46, 0.06)",
        soft: "0 2px 8px rgba(15, 20, 25, 0.04)",
      },
      maxWidth: {
        /* Narrow app column — phone-first, centered on desktop */
        dashboard: "24rem",
        "dashboard-md": "26rem",
        "dashboard-lg": "28rem",
        "dashboard-xl": "30rem",
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
