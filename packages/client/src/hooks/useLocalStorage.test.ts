import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage";

describe("useLocalStorage.tsx", () => {
  beforeAll(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("getItem should return null if there is no key in localstorage", () => {
    const { result } = renderHook(useLocalStorage);

    act(() => {
      const item = result.current.getItem("test");

      expect(item).toBe(null);
    });
  });

  it("setItem should set data into localStorage properly", () => {
    const { result } = renderHook(useLocalStorage);

    act(() => {
      result.current.setItem("test", { test: "test" });

      const item = result.current.getItem("test");

      expect(item).toEqual({ test: "test" });
    });
  });

  it("removeItem should remove an item properly", () => {
    const { result } = renderHook(useLocalStorage);

    act(() => {
      result.current.setItem("test", { test: "test" });

      result.current.removeItem("test");

      const item = result.current.getItem("test");

      expect(item).toBe(null);
    });
  });

  it("clear should remove all items from localStorage", () => {
    const { result } = renderHook(useLocalStorage);

    act(() => {
      result.current.setItem("test", { test: "test" });

      result.current.setItem("test2", { test: "test" });

      result.current.clear();

      const item1 = result.current.getItem("test");

      const item2 = result.current.getItem("test2");

      expect(item1).toBe(null);

      expect(item2).toBe(null);
    });
  });
});
