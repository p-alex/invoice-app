import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EditInvoiceSideModal from "./EditInvoiceSideModal";
import { getInvalidTestInvoice, getValidTestInvoice } from "../../testEntities/testInvoice";
import { getValidTestInvoiceItem } from "../../testEntities/testInvoiceItem";
import userEvent from "@testing-library/user-event";

async function submitForm() {
  const submitButton = screen.getByRole("button", { name: /save changes/i });
  await userEvent.click(submitButton);
}

describe("EditInvoiceSideModal.tsx", () => {
  const validTestInvoiceItems = [getValidTestInvoiceItem("1", "123")];
  const validTestInvoice = getValidTestInvoice("123", validTestInvoiceItems);

  it("should handle a successfull submition correctly", async () => {
    const updateInvoiceMock = jest.fn(() => Promise.resolve({ success: true }));
    const closeModalMock = jest.fn();

    render(
      <EditInvoiceSideModal
        defaultValues={{
          invoice: validTestInvoice,
          invoiceItems: validTestInvoiceItems,
        }}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
        handleCloseModal={closeModalMock}
        handleUpdateInvoice={updateInvoiceMock}
      />,
    );

    await submitForm();

    expect(updateInvoiceMock).toHaveBeenCalled();
    expect(closeModalMock).toHaveBeenCalled();
  });

  it("should handle a failed submition correctly", async () => {
    const updateInvoiceMock = jest.fn();
    updateInvoiceMock.mockImplementation(() => Promise.resolve({ success: false }));
    const closeModalMock = jest.fn();

    render(
      <EditInvoiceSideModal
        defaultValues={{
          invoice: validTestInvoice,
          invoiceItems: validTestInvoiceItems,
        }}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
        handleCloseModal={closeModalMock}
        handleUpdateInvoice={updateInvoiceMock}
      />,
    );

    await submitForm();

    expect(updateInvoiceMock).toHaveBeenCalled();
    expect(closeModalMock).not.toHaveBeenCalled();
  });

  it("should handle an invalid submittion correctly", async () => {
    const updateInvoiceMock = jest.fn();
    const closeModalMock = jest.fn();

    render(
      <EditInvoiceSideModal
        defaultValues={{
          invoice: getInvalidTestInvoice("123", []),
          invoiceItems: [],
        }}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
        handleCloseModal={closeModalMock}
        handleUpdateInvoice={updateInvoiceMock}
      />,
    );

    await submitForm();

    expect(updateInvoiceMock).not.toHaveBeenCalled();
    expect(closeModalMock).not.toHaveBeenCalled();
  });
});
