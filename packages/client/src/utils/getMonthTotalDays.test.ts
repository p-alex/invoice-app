import getHowManyDaysAMonthHas from "./getMonthTotalDays";

describe("getMonthTotalDays.ts", () => {
  it("should return 28 days if month is febuary and the year is not a leap year", () => {
    const days = getHowManyDaysAMonthHas({ year: 2023, zeroBasedMonth: 1 });
    expect(days).toBe(28);
  });

  it("should return 29 days if month is febuary and the year is a leap year", () => {
    const days = getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: 1 });
    expect(days).toBe(29);
  });

  it("should return 30 days for April, June, September and November", () => {
    const april = getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: 3 });
    const june = getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: 5 });
    const september = getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: 8 });
    const november = getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: 10 });
    expect(april).toBe(30);
    expect(june).toBe(30);
    expect(september).toBe(30);
    expect(november).toBe(30);
  });

  it("should return 31 days for January, March, May, July, August, October and December", () => {
    const january = getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: 0 });
    const march = getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: 2 });
    const may = getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: 4 });
    const july = getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: 6 });
    const august = getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: 7 });
    const october = getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: 9 });
    const december = getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: 11 });
    expect(january).toBe(31);
    expect(march).toBe(31);
    expect(may).toBe(31);
    expect(july).toBe(31);
    expect(august).toBe(31);
    expect(october).toBe(31);
    expect(december).toBe(31);
  });

  it("should throw an error if the month provided is invalid", () => {
    expect(() => getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: 13 })).toThrow();
    expect(() => getHowManyDaysAMonthHas({ year: 2024, zeroBasedMonth: -1 })).toThrow();
  });
});
