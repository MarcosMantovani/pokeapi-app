/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      fontSize: {
        nano: "0.5rem", // 8px - menor que micro
        micro: "0.58rem", // 10px - menor que xs (12px)
      },
      borderWidth: {
        "hairline": "0.1px",
        "thin": "0.5px",
        1: "1px",
        3: "3px",
        4: "4px",
        5: "5px",
        6: "6px",
      },
      colors: {
        "radical-red": "#FF2A6D",
      },
    },
  },
  plugins: [],
  corePlugins: { preflight: false },
};
