import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import InvoiceFilterDropdown from "./InvoiceFilterDropdown";
import { IInvoiceFilters } from "../../InvoicesPage";

describe("InvoiceFilterDropdown.ts", () => {
  const testFilters: IInvoiceFilters = { draft: false, paid: false, pending: false };

  it("should display filters correctly", () => {
    render(<InvoiceFilterDropdown invoiceFilters={testFilters} handleSetFilter={() => {}} />);

    const filters = screen.getAllByRole("checkbox");

    expect(filters).toHaveLength(3);

    expect(screen.getByLabelText("draft")).toBeInTheDocument();

    expect(screen.getByLabelText("paid")).toBeInTheDocument();

    expect(screen.getByLabelText("pending")).toBeInTheDocument();
  });

  it("should call 'handleSetFilter' function correctly", async () => {
    const setFilterFn = jest.fn();

    render(<InvoiceFilterDropdown invoiceFilters={testFilters} handleSetFilter={setFilterFn} />);

    const draftFilter = screen.getByLabelText("draft");

    await user.click(draftFilter);

    expect(setFilterFn).toHaveBeenCalled();

    expect(setFilterFn).toHaveBeenCalledTimes(1);

    expect(setFilterFn).toHaveBeenCalledWith("draft", true);
  });
});
