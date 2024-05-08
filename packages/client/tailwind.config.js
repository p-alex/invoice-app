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
        muted: "#888EB0",
        borderDark: "#494E6E",
        siteBgDark: "#141625",
        siteBgLight: "#F8F8FB",
        uiBgDark: "#1E2139",
      },
    },
  },
  plugins: [],
};
