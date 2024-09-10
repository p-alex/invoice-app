import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import InvoiceFilter from "./InvoiceFilter";
import { IInvoiceFilters } from "../../../pages/InvoicesPage";

describe("InvoiceFilter.tsx", () => {
  const availableFilters: IInvoiceFilters = { draft: false, paid: false, pending: false };

  const filterList = Object.keys(availableFilters);

  it("should display filters correctly", async () => {
    render(
      <InvoiceFilter
        invoiceFilters={{ draft: false, pending: false, paid: false }}
        handleSetInvoiceFilter={() => {}}
      >
        invoice filter
      </InvoiceFilter>,
    );

    const toggle = screen.getByRole("button");

    await user.click(toggle);

    const filters = screen.getAllByRole("checkbox");

    expect(filters).toHaveLength(3);

    for (let i = 0; i < filterList.length; i++) {
      expect(screen.getByLabelText(filterList[i])).toBeInTheDocument();
    }
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
