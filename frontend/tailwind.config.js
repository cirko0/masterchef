/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        darkorange: "#f88d1d",
        gold: {
          "100": "#feca04",
          "200": "rgba(254, 202, 4, 0.97)",
        },
        black: "#000",
        whitesmoke: "#ebebeb",
        slategray: "#71737e",
        gainsboro: "#d9d9d9",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
      },
      borderRadius: {
        xl: "20px",
        "3xs": "10px",
        "8xs": "5px",
      },
    },
    fontSize: {
      "5xl": "2.4rem",
      "21xl": "4rem",
      "13xl": "3.2rem",
      "7xl": "2.6rem",
      xl: "2rem",
      base: "1.6rem",
      sm: "1.4rem",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
