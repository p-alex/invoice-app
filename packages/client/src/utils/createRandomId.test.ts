import createRandomId from "./createRandomId";

describe("createRandomId.ts", () => {
  it("should create a 6 characters long random string, starting with 2 uppercase letters and ending with 4 numbers", () => {
    const result = createRandomId();
    expect(result).toMatch(/^([A-Z]{2})([0-9]{4})$/);
  });
});
