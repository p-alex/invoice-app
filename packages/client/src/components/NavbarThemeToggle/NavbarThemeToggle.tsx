import useTheme from "../../hooks/useTheme";
import { MoonIcon, SunIcon } from "../../svgs";
import NavbarButton from "../NavbarButton";

function NavbarThemeToggle() {
  const { theme, handleToggleTheme } = useTheme();

  return (
    <NavbarButton
      aria-label={theme === "dark" ? "switch to light theme" : "switch to dark theme"}
      onClick={handleToggleTheme}
      data-testid="themeToggle"
    >
      {theme === "dark" ? <SunIcon className="text-xl" /> : <MoonIcon className="text-xl" />}
    </NavbarButton>
  );
}

export default NavbarThemeToggle;
