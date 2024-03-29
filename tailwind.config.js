/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
        lato: ["Lato"],
        montserrat: ["Montserrat"],
      },
    },
  },
  // plugins: [
  //   require('@tailwindcss/forms'),
  //   require("@tailwindcss/typography"),
  // ],
};
