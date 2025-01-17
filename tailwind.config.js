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
        customGrayHover: "#202c33",
      },
      borderColor: {
        customGray: "rgba(134, 150, 160, 0.15)",
        customPink: "#B79595",
      },
      textColor: {
        customGray: "#777777",
      },
    },
  },
  plugins: [],
};
