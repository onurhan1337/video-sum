import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      gradient: {
        "0%": { backgroundPosition: "0% 50%" },
        "50%": { backgroundPosition: "100% 50%" },
        "100%": { backgroundPosition: "0% 50%" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      gradient: "gradient 8s linear infinite",
    },
    extend: {
      fontFamily: {
        sans: ["var(--geist-sans)"],
        mono: ["var(--geist-mono)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(0, 0%, 10%)", // Near black
          foreground: "hsl(0, 0%, 98%)",
          50: "hsl(0, 0%, 98%)",
          100: "hsl(0, 0%, 90%)",
          200: "hsl(0, 0%, 80%)",
          300: "hsl(0, 0%, 60%)",
          400: "hsl(0, 0%, 40%)",
          500: "hsl(0, 0%, 25%)",
          600: "hsl(0, 0%, 15%)",
          700: "hsl(0, 0%, 10%)",
          800: "hsl(0, 0%, 5%)",
          900: "hsl(0, 0%, 0%)",
        },
        secondary: {
          DEFAULT: "hsl(160, 84%, 16%)", // Dark green
          foreground: "hsl(0, 0%, 98%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        muted: {
          DEFAULT: "hsl(160, 20%, 94%)",
          foreground: "hsl(0, 0%, 25%)",
        },
        accent: {
          DEFAULT: "hsl(130, 60%, 95%)",
          foreground: "hsl(0, 0%, 10%)",
        },
        green: {
          50: "hsl(160, 94%, 96%)",
          100: "hsl(160, 90%, 88%)",
          200: "hsl(160, 86%, 76%)",
          300: "hsl(160, 82%, 60%)",
          400: "hsl(160, 78%, 40%)",
          500: "hsl(160, 84%, 30%)",
          600: "hsl(160, 84%, 16%)",
          700: "hsl(160, 88%, 12%)",
          800: "hsl(160, 92%, 8%)",
          900: "hsl(160, 96%, 4%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(0, 0%, 10%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(0, 0%, 10%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;

export default config;
