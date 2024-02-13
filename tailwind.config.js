/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  darkMode: "class", // Enable dark mode based on class
  theme: {
    extend: {
      colors: {
        dark: {
          "primary-100": "#673ab7",
          "primary-200": "#7a4fbf",
          "primary-300": "#8c64c8",
          "primary-400": "#9d79d0",
          "primary-500": "#ae8fd8",
          "primary-600": "#bfa5e0",
          "surface-100": "#121212",
          "surface-200": "#282828",
          "surface-300": "#3f3f3f",
          "surface-400": "#575757",
          "surface-500": "#717171",
          "surface-600": "#8b8b8b",
        },
      },
    },
  }, // <--- Add a comma here
  variants: {
    extend: {
      backgroundColor: ["dark"], // Enable dark mode variants for background color
      textColor: ["dark"], // Enable dark mode variants for text color
    },
  }, // <--- Add a comma here
  plugins: [require("flowbite/plugin")], // <--- Add a semicolon here
};
