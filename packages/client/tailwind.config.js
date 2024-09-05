/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      borderRadius: {
        nav: "20px",
      },
      margin: {
        navMdOffset: "113px",
        navSmOffset: "80px",
      },
      left: {
        navMdOffset: "113px",
        navSmOffset: "80px",
      },
      top: {
        navMdOffset: "113px",
        navSmOffset: "80px",
      },
      width: {
        navWidthMd: "113px",
      },
      height: {
        fieldHeight: "48px",
        navHeightSm: "80px",
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
        modalBgDT: "#141625",
        modalBgLt: "#F8F8FB",
        textLT: "#0C0E16",
        textLTDarker: "#7E88C3",
        textDT: "#FFFFFF",
        textDTLighter: "#DFE3FA",
        uiBgLT: "#FFFFFF",
        uiBgLTDarker: "#F9FAFE",
        uiBgDT: "#1E2139",
        uiBgDTLighter: "#252945",
      },
    },
  },
  plugins: [],
};
