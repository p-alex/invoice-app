import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import InvoiceStatus from "./InvoiceStatus";
import { InvoiceType } from "../../../entities/Invoice";

describe("InvoiceStatus Component", () => {
  const renderComponent = (status: InvoiceType["status"]) => {
    return render(<InvoiceStatus status={status} />);
  };

  it('renders the correct status for "pending"', () => {
    const { getByText } = renderComponent("pending");

    const statusText = getByText(/pending/i);
    expect(statusText).toBeInTheDocument();
  });

  it('renders the correct status for "draft"', () => {
    const { getByText } = renderComponent("draft");

    const statusText = getByText(/draft/i);
    expect(statusText).toBeInTheDocument();
  });

  it('renders the correct status for "paid"', () => {
    const { getByText } = renderComponent("paid");

    const statusText = getByText(/paid/i);
    expect(statusText).toBeInTheDocument();
  });
});
