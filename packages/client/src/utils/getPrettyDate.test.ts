import getPrettyDate from "./getPrettyDate";

describe("getPrettyDate.test.ts", () => {
  it("should return a string with a correct format: 1 Jan 2024", () => {
    const result = getPrettyDate(2024, 1, 1);

    expect(result).toBe("1 Jan 2024");
  });
});
