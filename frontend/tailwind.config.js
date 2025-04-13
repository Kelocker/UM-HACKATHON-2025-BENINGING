/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff", // bg color -> white
        secondary: "#1a1a1a", // Text color -> dark
        // Add more color customizations as needed
      },
      fontFamily: {
        sans: ["Arial", "sans-serif"],
      },
      fontSize: {
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
      },
    },
  },
  plugins: [],
};
