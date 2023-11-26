/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        
        pop: "Poppins",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
