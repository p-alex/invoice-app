import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InvoiceItemsSummary from "./InvoiceItemsSummary";
import { getValidTestInvoiceItem } from "../../../testEntities/testInvoiceItem";

describe("InvoiceItemsSummary.tsx", () => {
  const testInvoiceItems = [
    getValidTestInvoiceItem("1", "123"),
    getValidTestInvoiceItem("2", "123"),
  ];

  it("should display a message if no invoice items are passed", () => {
    render(<InvoiceItemsSummary invoiceItems={[]} />);

    const message = screen.getByText("No invoice items");
    const table = screen.queryByRole("table");

    expect(message).toBeInTheDocument();
    expect(table).not.toBeInTheDocument();
  });

  it("should display invoice items correctly", () => {
    render(<InvoiceItemsSummary invoiceItems={testInvoiceItems} />);

    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(3); // 2 + the th row

    for (let i = 1; i < rows.length; i++) {
      const tds = rows[i].querySelectorAll("td");

      const itemNameTd = tds[0];

      const quantityTd = tds[1];

      const priceTd = tds[2];

      const totalTd = tds[3];

      expect(itemNameTd).toHaveTextContent(testInvoiceItems[i - 1].name);

      expect(quantityTd).toHaveTextContent(testInvoiceItems[i - 1].quantity.toString());

      expect(priceTd).toHaveTextContent(testInvoiceItems[i - 1].price.toString());

      expect(totalTd).toHaveTextContent(
        (testInvoiceItems[i - 1].price * testInvoiceItems[i - 1].quantity).toString(),
      );

      expect(tds).toHaveLength(4);
    }
  });

  it("should display the total amount to pay", () => {
    render(<InvoiceItemsSummary invoiceItems={testInvoiceItems} />);

    let totalAmount = 0;

    for (let i = 0; i < testInvoiceItems.length; i++) {
      totalAmount = totalAmount + testInvoiceItems[i].price * testInvoiceItems[i].quantity;
    }

    expect(screen.getByText(new RegExp(totalAmount.toString(), "i"))).toBeInTheDocument();
  });
});
