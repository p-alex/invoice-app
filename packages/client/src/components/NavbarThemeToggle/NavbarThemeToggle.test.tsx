import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import NavbarThemeToggle from "./NavbarThemeToggle";

describe("NavbarThemeToggle.tsx", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.setAttribute("class", "");
  });

  it("show different svg icon based on current theme", async () => {
    render(<NavbarThemeToggle />);
    const themeToggleButton = screen.getByTestId("themeToggle");
    const initialSvg = themeToggleButton.innerHTML;
    await user.click(themeToggleButton);
    const currentSvg = themeToggleButton.innerHTML;
    expect(initialSvg.toString()).not.toEqual(currentSvg.toString());
  });

  it("show correct aria-label on theme toggle button for current theme", async () => {
    render(<NavbarThemeToggle />);
    const themeToggle = screen.getByTestId("themeToggle");
    expect(themeToggle.getAttribute("aria-label")).toEqual("switch to dark theme");
    await user.click(themeToggle);
    expect(themeToggle.getAttribute("aria-label")).toEqual("switch to light theme");
  });
});
