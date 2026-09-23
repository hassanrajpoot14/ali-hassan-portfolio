/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        accent: {
          50: "#f7fee7",
          100: "#ecfccb",
          200: "#d9f99d",
          300: "#bef264",
          400: "#a3e635",
          500: "#84cc16",
          600: "#65a30d",
          700: "#4d7c0f",
          800: "#3f6212",
          900: "#365314",
        },
        ink: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(at 20% 20%, rgba(6, 182, 212, 0.28) 0px, transparent 50%), radial-gradient(at 80% 10%, rgba(163, 230, 53, 0.22) 0px, transparent 45%), radial-gradient(at 70% 80%, rgba(14, 165, 233, 0.2) 0px, transparent 50%), radial-gradient(at 10% 70%, rgba(45, 212, 191, 0.18) 0px, transparent 40%)",
        "hero-mesh-dark":
          "radial-gradient(at 20% 20%, rgba(6, 182, 212, 0.18) 0px, transparent 50%), radial-gradient(at 80% 10%, rgba(163, 230, 53, 0.12) 0px, transparent 45%), radial-gradient(at 70% 80%, rgba(14, 165, 233, 0.14) 0px, transparent 50%)",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(8, 145, 178, 0.25)",
        glow: "0 0 0 1px rgba(6, 182, 212, 0.2), 0 12px 40px -10px rgba(6, 182, 212, 0.35)",
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(0.85)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
