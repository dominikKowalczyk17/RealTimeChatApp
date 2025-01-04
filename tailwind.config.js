/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      backgroundColor: {
        account: "#EEF0F2",
      },
      borderColor: {
        customGray: "#777777",
        customPink: "#B79595",
      },
    },
  },
  plugins: [],
};
