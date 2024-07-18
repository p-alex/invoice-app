import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import InvoiceItemList from "./InvoiceItemList";
import { InvoiceItemType } from "../../../entities/InvoiceItem";

const testInvoiceItem = (id: string): InvoiceItemType => ({
  id,
  invoiceId: "testInvoiceId",
  name: "testName",
  price: 10,
  quantity: 10,
});

describe("InvoiceItemList.tsx", () => {
  it("should display items properly", () => {
    render(
      <InvoiceItemList
        list={[testInvoiceItem("id1"), testInvoiceItem("id2")]}
        currentInvoiceId="testInvoiceId"
        onChange={() => {}}
      />,
    );

    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(2);
  });

  it("should add a new item after pressing the 'Add item' button", async () => {
    render(
      <InvoiceItemList
        list={[testInvoiceItem("id1"), testInvoiceItem("id2")]}
        currentInvoiceId="testInvoiceId"
        onChange={() => {}}
      />,
    );

    const addItemButton = screen.getByRole("button", { name: /\+ Add New Item/ });

    await user.click(addItemButton);

    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(3);
  });

  it("should call 'onChange' function after adding an item", async () => {
    const itemsList = [testInvoiceItem("id1"), testInvoiceItem("id2")];

    const onChangeFunc = jest.fn();

    render(
      <InvoiceItemList list={itemsList} currentInvoiceId="testInvoiceId" onChange={onChangeFunc} />,
    );

    const toggle = screen.getByRole("button", { name: /\+ add new item/i });

    await user.click(toggle);

    expect(onChangeFunc).toHaveBeenCalled();
  });

  it("should remove item from list if you click on the 'delete item button' of an item", async () => {
    render(<InvoiceItemList list={[]} currentInvoiceId="testInvoiceId" onChange={() => {}} />);

    const toggle = screen.getByRole("button", { name: /\+ add new item/i });

    await user.click(toggle);

    const firstItemRemoveButton = screen.getAllByRole("button", {
      name: /delete invoice item/i,
    })[0];

    await user.click(firstItemRemoveButton);

    expect(firstItemRemoveButton).not.toBeInTheDocument();
  });

  it("should update list when typing in the inputs", async () => {
    const changeFunc = jest.fn();

    render(<InvoiceItemList list={[]} currentInvoiceId="testInvoiceId" onChange={changeFunc} />);

    const addNewItemBtn = screen.getByRole("button", { name: /\+ add new item/i });

    await user.click(addNewItemBtn);

    const itemNameField = screen.getByLabelText(/item name/i);

    const quantityField = screen.getByLabelText(/qty/i);

    const priceField = screen.getByLabelText(/price/i);

    await user.type(itemNameField, "n");

    await user.type(quantityField, "2");

    await user.type(priceField, "2");

    const initialCallWhenInvoiceItemIsAdded = 1;

    expect(changeFunc).toHaveBeenCalledTimes(3 + initialCallWhenInvoiceItemIsAdded);
  });
});
