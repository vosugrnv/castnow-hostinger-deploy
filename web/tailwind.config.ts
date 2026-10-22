import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff0f6",
          100: "#ffe0ee",
          200: "#ffc2dc",
          400: "#ff5c93",
          500: "#f0186f",
          600: "#d6136a",
          700: "#a3105a",
        },
        grape: "#a21caf",
        ink: "#1c1917",
      },
      fontFamily: {
        sans: ["var(--font-be)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        phone: "0 30px 70px -24px rgba(163, 16, 90, 0.45)",
      },
    },
  },
  plugins: [],
} satisfies Config;
