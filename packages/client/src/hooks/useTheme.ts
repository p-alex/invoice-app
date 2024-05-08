import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export const DEFAULT_THEME = "light";

function useTheme() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  const handleToggleTheme = () => {
    const isDarkMode = document.documentElement.classList.contains("dark");

    if (isDarkMode) {
      document.documentElement.classList.remove("dark");

      setTheme("light");

      window.localStorage.setItem("theme", JSON.stringify("light"));
    } else {
      document.documentElement.classList.add("dark");

      setTheme("dark");

      window.localStorage.setItem("theme", JSON.stringify("dark"));
    }
  };

  useEffect(() => {
    const theme = window.localStorage.getItem("theme");

    if (!theme) {
      window.localStorage.setItem("theme", JSON.stringify(DEFAULT_THEME));

      document.documentElement.classList.add(DEFAULT_THEME);
    } else {
      setTheme(JSON.parse(theme));

      document.documentElement.classList.add(JSON.parse(theme));
    }
  }, []);

  return { theme, handleToggleTheme };
}

export default useTheme;
