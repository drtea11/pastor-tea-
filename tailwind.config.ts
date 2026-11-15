import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0394d7",
          green: "#a5cd39",
          ink: "#0b0d10",
          muted: "#66707c",
          soft: "#f5f6f4",
          line: "#e6e8ea"
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"]
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      },
      boxShadow: {
        premium: "0 30px 90px rgba(0, 0, 0, 0.14)",
        soft: "0 20px 60px rgba(12, 16, 20, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
