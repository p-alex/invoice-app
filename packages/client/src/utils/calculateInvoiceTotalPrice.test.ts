import calculateInvoiceTotalPrice from "./calculateInvoiceTotalPrice";

describe("calculateInvoiceTotalPrice.ts", () => {
  it("should calculate the total price correctly", () => {
    const totalPrice = calculateInvoiceTotalPrice([
      { id: "1", invoice_id: "2", name: "sa", price: 12, quantity: 2 },
      { id: "2", invoice_id: "2", name: "sa", price: 23, quantity: 5 },
    ]);

    expect(totalPrice).toBe(12 * 2 + 23 * 5);
  });
});
