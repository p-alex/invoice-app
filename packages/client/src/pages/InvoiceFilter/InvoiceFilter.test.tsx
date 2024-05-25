import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import InvoiceFilter from "./InvoiceFilter";

describe("InvoiceFilter.tsx", () => {
  it("should toggle filter dropdown correctly", async () => {
    render(
      <InvoiceFilter
        invoiceFilters={{ draft: false, pending: false, paid: false }}
        handleSetInvoiceFilter={() => {}}
      >
        invoice filter
      </InvoiceFilter>,
    );

    const toggle = screen.getByText("invoice filter");

    await user.click(toggle);

    const dropdown = screen.getByRole("list");

    expect(dropdown).toBeInTheDocument();

    await user.click(toggle);

    expect(dropdown).not.toBeInTheDocument();
  });

  it("should call 'handleSetInvoiceFilter' correctly", async () => {
    const handleSetInvoiceFilterFn = jest.fn();

    render(
      <InvoiceFilter
        invoiceFilters={{ draft: false, pending: false, paid: false }}
        handleSetInvoiceFilter={handleSetInvoiceFilterFn}
      >
        invoice filter
      </InvoiceFilter>,
    );

    const toggle = screen.getByText("invoice filter");

    await user.click(toggle);

    const draftFilter = screen.getByLabelText("draft");

    await user.click(draftFilter);

    expect(handleSetInvoiceFilterFn).toHaveBeenCalledTimes(1);

    expect(handleSetInvoiceFilterFn).toHaveBeenCalledWith("draft", true);
  });
});
