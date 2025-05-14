/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom color palette
        coral: {
          50: "#fef2ed",
          100: "#fde6db",
          200: "#fbcdb7",
          300: "#f9b493",
          400: "#f79b72", // Main coral color #F79B72
          500: "#f47e4d",
          600: "#e55f2a",
          700: "#c04a1f",
          800: "#9c3f1e",
          900: "#7e381e",
          950: "#441a0d",
        },
        navy: {
          50: "#f0f5f8",
          100: "#dce7ee",
          200: "#c0d3e0",
          300: "#96b7ca",
          400: "#6694af",
          500: "#477a96",
          600: "#3a647f",
          700: "#2a4759", // Main navy color #2A4759
          800: "#263e4d",
          900: "#233544",
          950: "#121f28",
        },
        lightgray: {
          50: "#f7f7f7",
          100: "#eeeeee", // Main light gray color #EEEEEE
          200: "#e2e2e2",
          300: "#dddddd", // Main gray color #DDDDDD
          400: "#b8b8b8",
          500: "#999999",
          600: "#7a7a7a",
          700: "#666666",
          800: "#515151",
          900: "#3b3b3b",
          950: "#262626",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-slow": "gradient-slow 8s ease infinite alternate",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "circuit-flow": "circuit-flow 4s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "gradient-slow": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        "pulse-glow": {
          "0%": { boxShadow: "0 0 5px rgba(247, 155, 114, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(247, 155, 114, 0.8), 0 0 30px rgba(247, 155, 114, 0.6)" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0px)" },
        },
        "circuit-flow": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    "text-coral-400",
    "text-coral-500",
    "text-navy-700",
    "text-navy-600",
    "text-lightgray-300",
    "text-lightgray-100",
    "from-coral-400",
    "from-navy-700",
    "from-lightgray-300",
    "from-lightgray-100",
    "bg-coral-400",
    "bg-navy-700",
    "bg-lightgray-300",
    "bg-lightgray-100",
  ],
}
