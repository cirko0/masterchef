/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        master: "0px 0px 15px rgba(0,0,0,0.12)",
      },
      colors: {
        white: "#fff",
        darkorange: "#f88d1d",
        gold: "#feca04",
        black: "#000",
        whitesmoke: "#ebebeb",
        slategray: "#71737e",
        gainsboro: "#d9d9d9",
      },
      fontFamily: {
        inter: "Inter",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
