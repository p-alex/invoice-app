import "@testing-library/jest-dom";
import CreateInvoiceSideModal from "./CreateInvoiceSideModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HTTPResponse from "../../api/HTTPResponse";
import { getInvalidTestInvoice, getValidTestInvoice } from "../../testEntities/testInvoice";
import { getValidTestInvoiceItem } from "../../testEntities/testInvoiceItem";

async function submitForm(submitType: "save & send" | "save as draft") {
  const submitButton = screen.getByRole("button", { name: new RegExp(submitType, "i") });
  await userEvent.click(submitButton);
}

describe("CreateInvoiceSideModal.tsx", () => {
  const validTestInvoice = getValidTestInvoice("123", []);
  const invalidTestInvoice = getInvalidTestInvoice("123", []);

  const testInvoiceItems = [
    getValidTestInvoiceItem("1", "123"),
    getValidTestInvoiceItem("2", "123"),
  ];

  it("should call 'handleCloseModal', 'handleAddInvoiceToState', and show a feedback popup if invoice was saved and sent successfully!", async () => {
    const handleCloseModalMock = jest.fn();
    const saveAndSendRequestMock = jest.fn();
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    saveAndSendRequestMock.mockReturnValue(
      HTTPResponse.success("saved and sent", { invoice: validTestInvoice }),
    );

    render(
      <CreateInvoiceSideModal
        defaultValues={{ invoice: validTestInvoice, invoiceItems: testInvoiceItems }}
        handleCloseModal={handleCloseModalMock}
        handleAddInvoiceToState={handleAddInvoiceToStateMock}
        saveAndSendRequest={saveAndSendRequestMock}
        saveRequest={jest.fn()}
        handleDisplayPopup={handleDisplayPopupMock}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
      />,
    );

    await submitForm("save & send");

    expect(saveAndSendRequestMock).toHaveBeenCalled();

    expect(handleCloseModalMock).toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalledWith("saved and sent");

    expect(handleAddInvoiceToStateMock).toHaveBeenCalled();
  });

  it("should call 'handleCloseModal', 'handleAddInvoiceToState', and show a feedback popup if invoice was saved as draft successfully!", async () => {
    const handleCloseModalMock = jest.fn();
    const saveRequestMock = jest.fn();
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    saveRequestMock.mockReturnValue(
      HTTPResponse.success("saved as draft", { invoice: validTestInvoice }),
    );

    render(
      <CreateInvoiceSideModal
        defaultValues={{ invoice: validTestInvoice, invoiceItems: testInvoiceItems }}
        handleCloseModal={handleCloseModalMock}
        handleAddInvoiceToState={handleAddInvoiceToStateMock}
        saveAndSendRequest={jest.fn()}
        saveRequest={saveRequestMock}
        handleDisplayPopup={handleDisplayPopupMock}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
      />,
    );

    await submitForm("save as draft");

    expect(saveRequestMock).toHaveBeenCalled();

    expect(handleCloseModalMock).toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalledWith("saved as draft");

    expect(handleAddInvoiceToStateMock).toHaveBeenCalled();
  });

  it("should display error if the 'save & send' form submittion fails", async () => {
    const handleCloseModalMock = jest.fn();
    const saveAndSendRequestMock = jest.fn();
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    saveAndSendRequestMock.mockReturnValue(HTTPResponse.error("request error"));

    render(
      <CreateInvoiceSideModal
        defaultValues={{ invoice: validTestInvoice, invoiceItems: testInvoiceItems }}
        handleCloseModal={handleCloseModalMock}
        handleAddInvoiceToState={handleAddInvoiceToStateMock}
        saveAndSendRequest={saveAndSendRequestMock}
        saveRequest={jest.fn()}
        handleDisplayPopup={handleDisplayPopupMock}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
      />,
    );

    await submitForm("save & send");

    expect(saveAndSendRequestMock).toHaveBeenCalled();

    expect(handleCloseModalMock).not.toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalledWith("request error");

    expect(handleCloseModalMock).not.toHaveBeenCalled();
  });

  it("should display error if the 'save as draft' form submittion request fails", async () => {
    const handleCloseModalMock = jest.fn();
    const saveRequestMock = jest.fn();
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    saveRequestMock.mockReturnValue(HTTPResponse.error("request error"));

    render(
      <CreateInvoiceSideModal
        defaultValues={{ invoice: invalidTestInvoice, invoiceItems: testInvoiceItems }}
        handleCloseModal={handleCloseModalMock}
        handleAddInvoiceToState={handleAddInvoiceToStateMock}
        saveAndSendRequest={jest.fn()}
        saveRequest={saveRequestMock}
        handleDisplayPopup={handleDisplayPopupMock}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
      />,
    );

    await submitForm("save as draft");

    expect(saveRequestMock).toHaveBeenCalled();

    expect(handleCloseModalMock).not.toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalledWith("request error");

    expect(handleAddInvoiceToStateMock).not.toHaveBeenCalled();
  });

  it("should display a feedback popup if 'saveAndSendRequest' function throws an error", async () => {
    const handleCloseModalMock = jest.fn();
    const saveAndSendRequestMock = jest.fn(() => {
      throw new Error("save and send error");
    });
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    render(
      <CreateInvoiceSideModal
        defaultValues={{ invoice: validTestInvoice, invoiceItems: testInvoiceItems }}
        handleCloseModal={handleCloseModalMock}
        handleAddInvoiceToState={handleAddInvoiceToStateMock}
        saveAndSendRequest={saveAndSendRequestMock}
        saveRequest={jest.fn()}
        handleDisplayPopup={handleDisplayPopupMock}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
      />,
    );

    await submitForm("save & send");

    expect(saveAndSendRequestMock).toThrow();

    expect(handleCloseModalMock).not.toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalledWith("save and send error");

    expect(handleAddInvoiceToStateMock).not.toHaveBeenCalled();
  });

  it("should display a feedback popup if 'handleSaveInvoiceAsDraft' function throws an error", async () => {
    const handleCloseModalMock = jest.fn();
    const saveRequestMock = jest.fn(() => {
      throw new Error("save as draft error");
    });
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    render(
      <CreateInvoiceSideModal
        defaultValues={{ invoice: invalidTestInvoice, invoiceItems: testInvoiceItems }}
        handleCloseModal={handleCloseModalMock}
        handleAddInvoiceToState={handleAddInvoiceToStateMock}
        saveAndSendRequest={jest.fn()}
        saveRequest={saveRequestMock}
        handleDisplayPopup={handleDisplayPopupMock}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
      />,
    );

    await submitForm("save as draft");

    expect(saveRequestMock).toThrow();

    expect(handleCloseModalMock).not.toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalledWith("save as draft error");

    expect(handleAddInvoiceToStateMock).not.toHaveBeenCalled();
  });
});
