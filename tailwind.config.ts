import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens driven by CSS variables (see globals.css)
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        "surface-2": "hsl(var(--surface-2) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        ink: "hsl(var(--ink) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        ember: {
          DEFAULT: "hsl(var(--ember) / <alpha-value>)",
          soft: "hsl(var(--ember-soft) / <alpha-value>)",
          deep: "hsl(var(--ember-deep) / <alpha-value>)",
        },
        // Pathway accents
        dev: "hsl(200 88% 55% / <alpha-value>)",
        gov: "hsl(9 83% 62% / <alpha-value>)",
        inst: "hsl(258 60% 62% / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        glow: "0 0 60px -12px hsl(var(--ember) / 0.5)",
        "glow-sm": "0 0 30px -10px hsl(var(--ember) / 0.45)",
        lift: "0 24px 60px -24px hsl(var(--shadow) / 0.5)",
      },
      backgroundImage: {
        "mesh-radial":
          "radial-gradient(60% 60% at 70% 20%, hsl(var(--ember) / 0.18) 0%, transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-node": {
          "0%,100%": { opacity: "0.35", r: "3" },
          "50%": { opacity: "1", r: "4.5" },
        },
        dash: {
          to: { strokeDashoffset: "-16" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-node": "pulse-node 3s ease-in-out infinite",
        dash: "dash 1.2s linear infinite",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
