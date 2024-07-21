// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          colors: {
            navbarPrimary: '#075985',
          },
        },
        dark: {
          // ...
          colors: {
            navbarPrimary: '#020617',
            background: {
              DEFAULT: "#030712", // mas oscruo: 030712
            },
          },
        },
        // ... custom themes
      },
    }),
  ],
};

