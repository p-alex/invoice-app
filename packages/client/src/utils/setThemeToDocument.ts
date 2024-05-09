import { Theme } from "../hooks/useTheme";

function setThemeToDocument(theme: Theme) {
  document.documentElement.setAttribute("class", "");

  document.documentElement.classList.add(theme);
}

export default setThemeToDocument;
