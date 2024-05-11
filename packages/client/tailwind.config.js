/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      borderRadius: {
        nav: "20px",
      },
      height: {
        fieldHeight: "48px",
      },
      colors: {
        primary: "#7C5DFA",
        primaryLight: "#9277FF",
        danger: "#EC5757",
        dangerLight: "#FF9797",
        muted: "#7E88C3",
        borderLT: "#DFE3FA",
        borderDT: "#252945",
        siteBgDT: "#141625",
        siteBgLT: "#F8F8FB",
        textLT: "#0C0E16",
        textDT: "#FFFFFF",
        uiBgLT: "#FFFFFF",
        uiBgDT: "#1E2139",
      },
    },
  },
  plugins: [],
};
