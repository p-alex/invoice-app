import createRandomId from "../../utils/createRandomId";

jest.mock("../../utils/createRandomId");

/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import CreateInvoiceSideModal from "./CreateInvoiceSideModal";
import { InvoiceType } from "../../entities/Invoice";
import { InvoiceItemType } from "../../entities/InvoiceItem";

describe("CreateInvoiceSideModal.tsx", () => {
  const testUTCString = new Date().toUTCString();

  beforeAll(() => {
    const mockDate = new Date(testUTCString);

    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
  });

  function createTestInvoice({
    id,
    textFieldValue,
    invoiceItemList,
    invoiceUTCDate,
  }: {
    id: string;
    textFieldValue: string;
    invoiceItemList: InvoiceItemType[];
    invoiceUTCDate: string;
  }): InvoiceType {
    return {
      id: id,
      from_streetAddress: textFieldValue,
      from_city: textFieldValue,
      from_postCode: textFieldValue,
      from_country: textFieldValue,
      to_clientName: textFieldValue,
      to_clientEmail: `${textFieldValue ? `${textFieldValue}@${textFieldValue}.com` : ""}`,
      to_streetAddress: textFieldValue,
      to_city: textFieldValue,
      to_postCode: textFieldValue,
      to_country: textFieldValue,
      invoiceDate: invoiceUTCDate,
      paymentTerms: "Net 1 Day",
      projectDescription: textFieldValue,
      invoiceItemList: invoiceItemList,
    };
  }

  const validTestInvoice = createTestInvoice({
    id: "testId",
    textFieldValue: "test",
    invoiceItemList: [{ id: "testId", invoiceId: "testId", name: "test", quantity: 1, price: 0 }],
    invoiceUTCDate: testUTCString,
  });

  const invalidTestInvoice = createTestInvoice({
    id: "testId",
    textFieldValue: "",
    invoiceItemList: [],
    invoiceUTCDate: testUTCString,
  });

  it("should call 'createInvoice', 'handleCloseModal' and 'handleRemoveDraft' functions if form is valid", async () => {
    (createRandomId as jest.Mock).mockImplementation(() => "testId");

    const createInvoiceMock = jest.fn(() =>
      Promise.resolve({ success: true, result: validTestInvoice, error: "" }),
    );

    const handleCloseModalMock = jest.fn();

    const handleRemoveDraftMock = jest.fn();

    render(
      <CreateInvoiceSideModal
        handleCloseModal={handleCloseModalMock}
        handleCreateInvoice={createInvoiceMock}
        handleSaveDraft={() => {}}
        handleRemoveDraft={handleRemoveDraftMock}
        firstFocusableButtonRef={{ current: null } as any}
        lastFocusableButtonRef={{ current: null } as any}
      />,
    );

    const invoiceItemAddButton = screen.getByRole("button", { name: "+ Add New Item" });

    await user.click(invoiceItemAddButton);

    const allTextInputs = screen.getAllByRole("textbox");

    for (let i = 0; i < allTextInputs.length; i++) {
      const textInput = allTextInputs[i];

      await user.type(
        textInput,
        textInput.getAttribute("type") === "email" ? "test@test.com" : "test",
      );
    }

    const submitButton = screen.getByRole("button", { name: "Save & Send" });

    await user.click(submitButton);

    expect(createInvoiceMock).toHaveBeenCalledWith(validTestInvoice);

    expect(handleCloseModalMock).toHaveBeenCalled();

    expect(handleRemoveDraftMock).toHaveBeenCalled();
  });

  it("should not call 'createInvoice' function if form is invalid", async () => {
    (createRandomId as jest.Mock).mockImplementation(() => "testId");

    const createInvoiceMock = jest.fn();

    render(
      <CreateInvoiceSideModal
        handleCloseModal={() => {}}
        handleCreateInvoice={createInvoiceMock}
        handleSaveDraft={() => {}}
        handleRemoveDraft={() => {}}
        firstFocusableButtonRef={{ current: null } as any}
        lastFocusableButtonRef={{ current: null } as any}
      />,
    );

    const submitButton = screen.getByRole("button", { name: "Save & Send" });

    await user.click(submitButton);

    expect(createInvoiceMock).not.toHaveBeenCalled();
  });

  it("should call 'handleSaveDraft' correctly if save as draft button is being clicked", async () => {
    (createRandomId as jest.Mock).mockImplementation(() => "testId");

    const handleSaveDraftMock = jest.fn();

    render(
      <CreateInvoiceSideModal
        handleCloseModal={() => {}}
        handleCreateInvoice={(() => {}) as any}
        handleSaveDraft={handleSaveDraftMock}
        handleRemoveDraft={() => {}}
        firstFocusableButtonRef={{ current: null } as any}
        lastFocusableButtonRef={{ current: null } as any}
      />,
    );

    const saveAsDraftButton = screen.getByRole("button", { name: "Save Draft" });

    await user.click(saveAsDraftButton);

    expect(handleSaveDraftMock).toHaveBeenCalledWith(invalidTestInvoice);
  });
});
