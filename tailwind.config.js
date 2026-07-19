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
        border: "#E0E0E0",
        background: "#FFFFFF",
        foreground: "#1A1A1A",
        brand: {
          DEFAULT: "#86201B",
          dark: "#6A1A16",
          light: "#A83A35",
          50: "#FDF2F2",
          100: "#F9E0DF",
          200: "#F0B8B5",
          300: "#E58D88",
          400: "#D9605A",
          500: "#86201B",
          600: "#6A1A16",
          700: "#521411",
          800: "#3B0E0C",
          900: "#240807",
        },
        navy: {
          DEFAULT: "#1A1A1A",
          50: "#2A2A2A",
          100: "#252525",
          900: "#111111",
          950: "#0A0A0A",
        },
        accent: {
          DEFAULT: "#86201B",
          hover: "#6A1A16",
          50: "#FDF2F2",
          600: "#6A1A16",
          700: "#521411",
          800: "#3B0E0C",
          900: "#240807",
        },
        steel: {
          DEFAULT: "#5C5C5C",
          light: "#8A8A8A",
          dark: "#3D3D3D",
        },
        line: "#E0E0E0",
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
        soft: "0 4px 20px -4px rgba(26,26,26,0.08)",
        card: "0 2px 8px rgba(26,26,26,0.06), 0 1px 2px rgba(26,26,26,0.04)",
        "card-hover": "0 16px 32px -8px rgba(134,32,27,0.18)",
        glow: "0 0 0 1px rgba(134,32,27,0.08), 0 8px 24px -4px rgba(134,32,27,0.15)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(134,32,27,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(134,32,27,0.06) 1px, transparent 1px)",
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