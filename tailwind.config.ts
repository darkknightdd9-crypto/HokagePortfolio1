import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Film Noir Gold Palette ── */
        base: {
          DEFAULT:  "#0B0B0C",
          elevated: "#131314",
          card:     "#1A1A1C",
          subtle:   "#202022",
        },
        sand: {
          DEFAULT:  "#EDEAE3",
          muted:    "#8A8680",
          faint:    "rgba(237, 234, 227, 0.35)",
        },
        gold: {
          DEFAULT: "#D4AF6A",
          deep:    "#8A6030",
          sand:    "#B8965A",
          light:   "#EDD99A",
          dim:     "rgba(212, 175, 106, 0.15)",
          glow:    "rgba(212, 175, 106, 0.25)",
          border:  "rgba(212, 175, 106, 0.22)",
        },
        rec: {
          DEFAULT: "#E5484D",
        },
        /* ── Legacy aliases so old classes don't hard-break ── */
        ivory: {
          DEFAULT: "#EDEAE3",
          soft:    "rgba(237, 234, 227, 0.88)",
          muted:   "#8A8680",
          faint:   "rgba(237, 234, 227, 0.35)",
        },
        orange: {
          accent: "#D4AF6A",
          deep:   "#8A6030",
          glow:   "rgba(212, 175, 106, 0.15)",
        },
        yellow: {
          accent: "#EDD99A",
          glow:   "rgba(237, 217, 154, 0.15)",
        },
      },
      fontFamily: {
        display: ["var(--font-satoshi)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans:    ["var(--font-satoshi)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        satoshi: ["var(--font-satoshi)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.065em",
        tight:   "-0.04em",
        wide:    "0.08em",
        wider:   "0.16em",
        widest:  "0.24em",
      },
      lineHeight: {
        hero:    "0.88",
        display: "0.96",
      },
      boxShadow: {
        "gold-glow":  "0 0 32px -6px rgba(212, 175, 106, 0.30)",
        "orange-glow":"0 0 32px -6px rgba(212, 175, 106, 0.30)", /* alias */
        "card-depth": "0 25px 50px -12px rgba(0, 0, 0, 0.80)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "ping-slow": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%":      { transform: "scale(1.15)", opacity: "0.4" },
        },
        glitch: {
          "0%":   { transform: "translate(0)" },
          "20%":  { transform: "translate(-4px, 1px)" },
          "40%":  { transform: "translate(4px, -1px)" },
          "60%":  { transform: "translate(-2px, 0)" },
          "80%":  { transform: "translate(2px, 1px)" },
          "100%": { transform: "translate(0)" },
        },
      },
      animation: {
        marquee:     "marquee 28s linear infinite",
        "ping-slow": "ping-slow 2.5s ease-in-out infinite",
        glitch:      "glitch 0.25s steps(1) 1",
      },
    },
  },
  plugins: [],
};

export default config;
