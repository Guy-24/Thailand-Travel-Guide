/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sarabun", "Noto Sans Thai", "sans-serif"],
      },
    },
  },
  plugins: [],
};
