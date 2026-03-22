import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F2EE",
        foreground: "#7C6259",
        "foreground-soft": "rgba(124, 98, 89, 0.72)",
        "foreground-contrast": "#FFFDFB",
        surface: "rgba(255, 255, 255, 0.56)",
        border: "rgba(124, 98, 89, 0.16)",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(124, 98, 89, 0.14)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;