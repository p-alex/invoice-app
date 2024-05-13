import getHowManyDaysAMonthHas from "./getMonthTotalDays";

describe("getMonthTotalDays.ts", () => {
  it("should return 28 days if month is febuary and the year is not a leap year", () => {
    const days = getHowManyDaysAMonthHas({ year: 2023, month: 2 });
    expect(days).toBe(28);
  });

  it("should return 29 days if month is febuary and the year is a leap year", () => {
    const days = getHowManyDaysAMonthHas({ year: 2024, month: 2 });
    expect(days).toBe(29);
  });

  it("should return 30 days if month is divisible by 2 and it is not febuary", () => {
    const days = getHowManyDaysAMonthHas({ year: 2024, month: 4 });
    expect(days).toBe(30);
  });

  it("should return 31 days if month is not divisible by 2", () => {
    const days = getHowManyDaysAMonthHas({ year: 2024, month: 3 });
    expect(days).toBe(31);
  });

  it("should throw an error if the month provided is invalid", () => {
    expect(() => getHowManyDaysAMonthHas({ year: 2024, month: 13 })).toThrow();
    expect(() => getHowManyDaysAMonthHas({ year: 2024, month: 0 })).toThrow();
  });
});
