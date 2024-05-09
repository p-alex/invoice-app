import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import setThemeToDocument from "../utils/setThemeToDocument";

export type Theme = "dark" | "light";

export const DEFAULT_THEME = "light";

function useTheme() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  const localStorage = useLocalStorage();

  const handleSetLightTheme = () => {
    setThemeToDocument("light");

    setTheme("light");

    localStorage.setItem("theme", "light");
  };

  const handleSetDarkTheme = () => {
    setThemeToDocument("dark");

    setTheme("dark");

    localStorage.setItem("theme", "dark");
  };

  const handleToggleTheme = () => {
    const isDarkMode = localStorage.getItem<Theme>("theme") === "dark";

    if (isDarkMode) {
      handleSetLightTheme();
    } else {
      handleSetDarkTheme();
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem<Theme>("theme");

    if (!theme) {
      localStorage.setItem("theme", DEFAULT_THEME);

      DEFAULT_THEME === "light" ? handleSetLightTheme() : handleSetDarkTheme();

      return;
    }

    setTheme(theme);

    setThemeToDocument(theme);
  }, []);

  return { theme, handleToggleTheme };
}

export default useTheme;
