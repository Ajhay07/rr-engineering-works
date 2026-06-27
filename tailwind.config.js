/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0B4F9C",
          50: "#EFF5FC",
          100: "#DCE9F8",
          200: "#B3D0EF",
          300: "#80B2E3",
          400: "#4A8FD3",
          500: "#0B4F9C",
          600: "#094582",
          700: "#073868",
          800: "#052A4E",
          900: "#031C34",
        },
        navy: {
          DEFAULT: "#0A1F33",
          50: "#101F33",
          100: "#0D1B2B",
          900: "#061321",
          950: "#03080E",
        },
        accent: {
          DEFAULT: "#F2730A",
          hover: "#D9650A",
          50: "#FEF1E4",
          600: "#D9650A",
          700: "#B85208",
          800: "#944005",
          900: "#703003",
        },
        steel: {
          DEFAULT: "#64748B",
          light: "#94A3B8",
          dark: "#475569",
        },
        line: "#E2E8F0",
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "12px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(10,31,51,0.08)",
        card: "0 2px 8px rgba(10,31,51,0.06), 0 1px 2px rgba(10,31,51,0.04)",
        "card-hover": "0 16px 32px -8px rgba(11,79,156,0.18)",
        glow: "0 0 0 1px rgba(11,79,156,0.08), 0 8px 24px -4px rgba(11,79,156,0.15)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(11,79,156,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(11,79,156,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        scanline: "scanline 1.4s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
