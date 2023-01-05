/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["black"],
    styled: true,
    themes: true,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
  },
}