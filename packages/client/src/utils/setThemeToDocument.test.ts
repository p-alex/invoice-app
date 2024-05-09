import setThemeToDocument from "./setThemeToDocument";

describe("setThemeToDocument.ts", () => {
  beforeAll(() => {
    document.documentElement.setAttribute("class", "");
  });

  it("should set the theme properly", () => {
    setThemeToDocument("light");

    const theme = document.documentElement.classList.contains("light");

    expect(theme).toBe(true);
  });

  it("should replace current theme with the new theme", () => {
    setThemeToDocument("light");

    setThemeToDocument("dark");

    const currentTheme = document.documentElement.classList.contains("dark");

    expect(currentTheme).toBe(true);

    expect(document.documentElement.classList.length).toBe(1);
  });
});
