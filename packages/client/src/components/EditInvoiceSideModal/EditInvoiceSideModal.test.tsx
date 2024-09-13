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
  const validTestInvoice = getValidTestInvoice("123");
  const validTestInvoiceItems = [getValidTestInvoiceItem("1", "123")];

  it("should handle a successfull submition correctly", async () => {
    const updateInvoiceMock = jest.fn();
    updateInvoiceMock.mockReturnValue({
      success: true,
      result: { updatedInvoice: validTestInvoice, updatedInvoiceItems: validTestInvoiceItems },
    });
    const closeModalMock = jest.fn();
    const displayPopupMock = jest.fn();
    const updateInvoiceStateMock = jest.fn();

    render(
      <EditInvoiceSideModal
        defaultValues={{
          invoice: validTestInvoice,
          invoiceItems: validTestInvoiceItems,
        }}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
        handleCloseModal={closeModalMock}
        handleDisplayPopup={displayPopupMock}
        handleUpdateInvoiceStateData={updateInvoiceStateMock}
        updateInvoiceRequest={updateInvoiceMock}
      />,
    );

    await submitForm();

    expect(updateInvoiceMock).toHaveBeenCalled();
    expect(displayPopupMock).toHaveBeenCalled();
    expect(closeModalMock).toHaveBeenCalled();
    expect(updateInvoiceStateMock).toHaveBeenCalledWith(validTestInvoice, validTestInvoiceItems);
  });

  it("should handle a failed submition correctly", async () => {
    const updateInvoiceMock = jest.fn();
    updateInvoiceMock.mockImplementation(() => {
      throw new Error("error");
    });
    const closeModalMock = jest.fn();
    const displayPopupMock = jest.fn();
    const updateInvoiceStateMock = jest.fn();

    render(
      <EditInvoiceSideModal
        defaultValues={{
          invoice: validTestInvoice,
          invoiceItems: validTestInvoiceItems,
        }}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
        handleCloseModal={closeModalMock}
        handleDisplayPopup={displayPopupMock}
        handleUpdateInvoiceStateData={updateInvoiceStateMock}
        updateInvoiceRequest={updateInvoiceMock}
      />,
    );

    await submitForm();

    expect(updateInvoiceMock).toThrow();
    expect(updateInvoiceStateMock).not.toHaveBeenCalled();
    expect(closeModalMock).not.toHaveBeenCalled();
    expect(displayPopupMock).toHaveBeenCalledWith("error");
  });

  it("should handle an invalid submittion correctly", async () => {
    const updateInvoiceMock = jest.fn();
    updateInvoiceMock.mockImplementation(() => {
      throw new Error("error");
    });
    const closeModalMock = jest.fn();
    const displayPopupMock = jest.fn();
    const updateInvoiceStateMock = jest.fn();

    render(
      <EditInvoiceSideModal
        defaultValues={{
          invoice: getInvalidTestInvoice("123"),
          invoiceItems: [],
        }}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
        handleCloseModal={closeModalMock}
        handleDisplayPopup={displayPopupMock}
        handleUpdateInvoiceStateData={updateInvoiceStateMock}
        updateInvoiceRequest={updateInvoiceMock}
      />,
    );

    await submitForm();

    expect(updateInvoiceMock).not.toHaveBeenCalled();
    expect(updateInvoiceStateMock).not.toHaveBeenCalled();
    expect(closeModalMock).not.toHaveBeenCalled();
    expect(displayPopupMock).not.toHaveBeenCalled();
  });
});
