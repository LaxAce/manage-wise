import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          "635FC7": "#635FC7",
          "A8A4FF": "#A8A4FF",
          "635FC740": "#635FC740",
        },
        black: {
          "000112": "#000112",
          "20212C": "#20212C",
        },
        gray: {
          "2B2C37": "#2B2C37",
          "3E3F4E": "#3E3F4E",
          "828FA3": "#828FA3",
          "E4EBFA": "#E4EBFA",
          "2B2C3720": "#2B2C3720",
          "364E7E1A": "#364E7E1A",
          "828FA33F": "#828FA33F",
          "828FA340": "#828FA340",
        },
        white: {
          "F4F7FD": "#F4F7FD",
          "FFFFFF": "#FFFFFF",
        },
        red: {
          "EA5555": "#EA5555",
          "FF9898": "#FF9898",
        },
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "word-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
        "word-in": "word-in 0.4s ease forwards",
        "pulse-slow": "pulse-slow 2s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;