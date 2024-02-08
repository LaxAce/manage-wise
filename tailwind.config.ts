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
    },
    colors: {
      violet: {
        "635FC7": "#635FC7",
        "A8A4FF": "#A8A4FF",
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
      },
      white: {
        "F4F7FD": "#F4F7FD",
        "FFFFFF": "#FFFFFF",
      },
      red: {
        "EA5555": "#EA5555",
        "FF9898": "#FF9898",
      }
    },
  },
  plugins: [],
};
export default config;
