import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import InvoiceItem from "./InvoiceItem";

describe("InvoiceItemList.tsx", () => {
  it("should display correctly", () => {
    render(
      <InvoiceItem
        handleRemoveInvoiceItem={() => {}}
        invoiceItemIndex={0}
        nameField={<p>name</p>}
        quantityField={<p>quantity</p>}
        priceField={<p>price</p>}
        totalPrice="100"
      />,
    );

    const itemNameField = screen.getByText("name");

    const quanitityField = screen.getByText("quantity");

    const priceField = screen.getByText("price");

    const totalPrice = screen.getByText("100");

    expect(itemNameField).toBeInTheDocument();

    expect(quanitityField).toBeInTheDocument();

    expect(priceField).toBeInTheDocument();

    expect(totalPrice).toBeInTheDocument();
  });

  it("delete button should call 'handleDeleteInvoiceItem' and delete the item", async () => {
    const deleteFunc = jest.fn();

    render(
      <InvoiceItem
        handleRemoveInvoiceItem={deleteFunc}
        invoiceItemIndex={0}
        nameField={<p>name</p>}
        quantityField={<p>quantity</p>}
        priceField={<p>price</p>}
        totalPrice="100"
      />,
    );

    const deleteButton = screen.getByRole("button", { name: "delete invoice item" });

    await user.click(deleteButton);

    expect(deleteFunc).toHaveBeenCalled();

    expect(deleteFunc).toHaveBeenCalledWith(0);
  });
});
