/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      borderRadius: {
        nav: "20px",
      },
      colors: {
        primary: "#7C5DFA",
        primaryLight: "#9277FF",
        danger: "#EC5757",
        dangerLight: "#FF9797",
        textLT: "#0C0E16",
        textDT: "#FFFFFF",
        btnBgLT: "#F9FAFE",
        btnBgDT: "#252945",
        btnBgHoverLT: "#DFE3FA",
        btnBgHoverDT: "#FFFFFF",
        btnTextLT: "#7E88C3",
        btnTextDT: "#DFE3FA",
        btnTextHoverLT: "#7E88C3",
        btnTextHoverDT: "#252945",
        muted: "#888EB0",
        borderDT: "#494E6E",
        siteBgDT: "#141625",
        siteBgLT: "#F8F8FB",
        uiBgDT: "#1E2139",
      },
    },
  },
  plugins: [],
};
