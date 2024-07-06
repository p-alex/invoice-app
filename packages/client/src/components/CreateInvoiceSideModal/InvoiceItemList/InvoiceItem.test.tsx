import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import InvoiceItem from "./InvoiceItem";
import { IInvoiceItem } from "../../../entities/InvoiceItem";

const testInvoiceItem: IInvoiceItem = {
  id: "testId",
  invoiceId: "testInvoiceId",
  name: "testName",
  price: 10,
  quantity: 10,
};

describe("InvoiceItemList.tsx", () => {
  it("should display 'Item Name', 'Quantity' and 'Price' fields", () => {
    render(
      <InvoiceItem
        invoiceItem={testInvoiceItem}
        handleChangeInvoiceItem={() => {}}
        handleDeleteInvoiceItem={() => {}}
        invoiceItemIndex={0}
      />,
    );

    const itemNameField = screen.getByLabelText(/item name/i);

    const quanitityField = screen.getByLabelText(/qty/i);

    const priceField = screen.getByLabelText(/price/i);

    expect(itemNameField).toBeInTheDocument();

    expect(quanitityField).toBeInTheDocument();

    expect(priceField).toBeInTheDocument();
  });

  it("delete button should call 'handleDeleteInvoiceItem' and delete the item", async () => {
    const deleteFunc = jest.fn();

    render(
      <InvoiceItem
        invoiceItem={testInvoiceItem}
        handleChangeInvoiceItem={() => {}}
        handleDeleteInvoiceItem={deleteFunc}
        invoiceItemIndex={0}
      />,
    );

    const deleteButton = screen.getByRole("button", { name: "delete invoice item" });

    await user.click(deleteButton);

    expect(deleteFunc).toHaveBeenCalled();
  });

  it("should call 'handleChangeInvoiceItem' correctly for each of the fields after typing", async () => {
    const changeFunc = jest.fn();

    render(
      <InvoiceItem
        invoiceItem={testInvoiceItem}
        handleChangeInvoiceItem={changeFunc}
        handleDeleteInvoiceItem={() => {}}
        invoiceItemIndex={0}
      />,
    );

    const itemNameField = screen.getByLabelText(/item name/i);

    await user.type(itemNameField, "name");

    expect(changeFunc).toHaveBeenCalledWith("name", testInvoiceItem.id, "name");

    const quantityField = screen.getByLabelText(/qty/i);

    await user.type(quantityField, "2");

    expect(changeFunc).toHaveBeenCalledWith(Number("2"), testInvoiceItem.id, "quantity");

    const priceField = screen.getByLabelText(/price/i);

    await user.type(priceField, "2");

    expect(changeFunc).toHaveBeenCalledWith(Number("2"), testInvoiceItem.id, "price");
  });
});
