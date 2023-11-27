/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        
        pop: "Poppins",
      },
      boxShadow: {
        'right': '0px 0 15px 0px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
