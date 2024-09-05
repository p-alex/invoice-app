import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InvoiceList from "./InvoiceList";
import { MemoryRouter } from "react-router-dom";
import { getValidTestInvoice } from "../../../testEntities/testInvoice";

describe("InvoiceList.tsx", () => {
  const testInvoices = [
    getValidTestInvoice("1"),
    getValidTestInvoice("2"),
    getValidTestInvoice("3"),
    getValidTestInvoice("4"),
  ];

  it("should display invoices correctly", () => {
    render(
      <MemoryRouter>
        <InvoiceList invoices={testInvoices} />
      </MemoryRouter>,
    );

    const invoices = screen.getAllByRole("listitem");

    expect(invoices).toHaveLength(4);
  });

  it("should display a 'no invoices' message if the invoices array is empty, instead of the list", () => {
    render(
      <MemoryRouter>
        <InvoiceList invoices={[]} />
      </MemoryRouter>,
    );

    const invoiceList = screen.queryByRole("list");

    const noInvoceMessage = screen.getByRole("heading", { level: 2 });

    expect(invoiceList).not.toBeInTheDocument();

    expect(noInvoceMessage).toBeInTheDocument();
  });
});
