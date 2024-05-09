import { renderHook } from "@testing-library/react";
import useTheme, { DEFAULT_THEME } from "./useTheme";
import { act } from "react";

describe("useTheme.ts", () => {
  beforeAll(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("should set default theme if there is no theme set in localStorage", () => {
    renderHook(useTheme);

    const currentTheme = JSON.parse(window.localStorage.getItem("theme")!);

    expect(currentTheme).toEqual(DEFAULT_THEME);
  });

  it("should toggle theme correctly", () => {
    const { result } = renderHook(useTheme);

    const initialTheme = JSON.parse(window.localStorage.getItem("theme")!);

    expect(result.current.theme).toBe("light");
    expect(initialTheme).toBe("light");

    act(() => {
      result.current.handleToggleTheme();
    });

    const currentTheme = JSON.parse(window.localStorage.getItem("theme")!);

    expect(result.current.theme).toBe("dark");
    expect(currentTheme).toBe("dark");
  });
});
