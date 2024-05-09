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
        textLightTheme: "#0C0E16",
        textDarkTheme: "#FFFFFF",
        buttonBgLightTheme: "#F9FAFE",
        buttonBgDarkTheme: "#252945",
        buttonBgHoverLightTheme: "#DFE3FA",
        buttonBgHoverDarkTheme: "#FFFFFF",
        buttonTextLightTheme: "#7E88C3",
        buttonTextDarkTheme: "#DFE3FA",
        buttonTextHoverLightTheme: "#7E88C3",
        buttonTextHoverDarkTheme: "#252945",
        muted: "#888EB0",
        borderDarkTheme: "#494E6E",
        siteBgDarkTheme: "#141625",
        siteBgLightTheme: "#F8F8FB",
        uiBgDarkTheme: "#1E2139",
      },
    },
  },
  plugins: [],
};
