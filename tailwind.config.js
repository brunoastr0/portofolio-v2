/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FAFAF9",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#1C1917",
          muted: "#57534E",
          faint: "#78716C",
        },
        line: "#E7E5E4",
        accent: {
          DEFAULT: "#B45309",
          gold: "#FFD700",
        },
      },
      fontFamily: {
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        sans: ["var(--font-grotesk)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "72rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
