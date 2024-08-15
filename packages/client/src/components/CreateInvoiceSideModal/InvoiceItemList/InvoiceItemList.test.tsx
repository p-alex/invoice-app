import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InvoiceItemList from "./InvoiceItemList";

describe("InvoiceItemList.tsx", () => {
  it("should display items properly", () => {
    render(
      <InvoiceItemList>
        <li>test</li>
        <li>test</li>
      </InvoiceItemList>,
    );

    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(2);
  });
});
