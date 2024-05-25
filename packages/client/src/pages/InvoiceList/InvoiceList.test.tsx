import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InvoiceList from "./InvoiceList";

describe("InvoiceList.tsx", () => {
  it("should display invoices correctly", () => {
    render(<InvoiceList invoices={[1, 2, 3, 4]} />);

    const invoices = screen.getAllByRole("listitem");

    expect(invoices).toHaveLength(4);
  });

  it("should display a 'no invoices' message if the invoices array is empty, instead of the list", () => {
    render(<InvoiceList invoices={[]} />);

    const invoiceList = screen.queryByRole("list");

    const noInvoceMessage = screen.getByRole("heading", { level: 2 });

    expect(invoiceList).not.toBeInTheDocument();

    expect(noInvoceMessage).toBeInTheDocument();
  });
});
