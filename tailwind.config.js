/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        app: "url('/desktop.svg')",
      },
      boxShadow: {
        '3xl': '0 1px 50px -15px rgba(255, 255, 255, 1)',
      }
    },

  },
  plugins: [],
}
