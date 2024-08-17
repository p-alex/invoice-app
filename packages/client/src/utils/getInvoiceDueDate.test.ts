import getInvoiceDueDate from "./getInvoiceDueDate";

describe("getInvoiceDueDate.ts", () => {
  it("should return the correct date", () => {
    const testDate = new Date(2024, 11, 1);

    const net1DayDate = getInvoiceDueDate(testDate, "Net 1 Day");

    const net7DayDate = getInvoiceDueDate(testDate, "Net 7 Days");

    const net14DayDate = getInvoiceDueDate(testDate, "Net 14 Days");

    const net30DayDate = getInvoiceDueDate(testDate, "Net 30 Days");

    expect(net1DayDate.getDate()).toBe(2);

    expect(net7DayDate.getDate()).toBe(8);

    expect(net14DayDate.getDate()).toBe(15);

    expect(net30DayDate.getDate()).toBe(31);
  });
});
