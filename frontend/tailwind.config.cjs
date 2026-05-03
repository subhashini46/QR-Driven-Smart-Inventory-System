/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0C0420",
        secondary: "#5D3C64",
        accent: "#78466A",
        soft: "#9F6496",
        pink: "#D391B0",
        rose: "#BA6E8F",
      },
    },
  },
  plugins: [],
};