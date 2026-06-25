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
        caribbean: {
          50: "#eef6f8",
          100: "#d4e8ee",
          200: "#a9cfd9",
          300: "#7eb3c3",
          400: "#4d8fa6",
          500: "#2d7089",
          600: "#245a6f",
          700: "#1a4556",
          800: "#12303d",
          900: "#0a1f28",
        },
        turquoise: {
          DEFAULT: "#5eb8a8",
          light: "#8ed4c8",
          dark: "#3d9485",
        },
        tropical: {
          coral: "#c4705a",
          mango: "#d4a054",
          palm: "#2d5a4a",
          sand: "#e8e0d4",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #0a1f28 0%, #1a4556 42%, #2d7089 78%, #5eb8a8 100%)",
        "card-gradient":
          "linear-gradient(180deg, rgba(0,119,182,0.04) 0%, rgba(255,255,255,1) 55%)",
        "card-shine":
          "radial-gradient(ellipse at top right, rgba(64,224,208,0.08), transparent 55%)",
        "footer-depth":
          "linear-gradient(180deg, #043a5c 0%, #032f4a 40%, #021f33 100%)",
      },
      boxShadow: {
        premium: "0 4px 24px -4px rgba(0, 71, 112, 0.12), 0 2px 8px -2px rgba(0, 0, 0, 0.06)",
        "premium-hover":
          "0 12px 40px -8px rgba(0, 71, 112, 0.18), 0 4px 16px -4px rgba(0, 0, 0, 0.08)",
        editorial: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -6px rgba(0, 71, 112, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
