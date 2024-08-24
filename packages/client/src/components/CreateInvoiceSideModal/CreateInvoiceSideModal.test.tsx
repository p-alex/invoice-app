import "@testing-library/jest-dom";
import CreateInvoiceSideModal from "./CreateInvoiceSideModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HTTPResponse from "../../api/HTTPResponse";
import { validTestInvoice } from "../../testEntities/testInvoice";
import { validTestInvoiceItem } from "../../testEntities/testInvoiceItem";
import {
  createInvoiceSideModal_draftSuccessMessage,
  createInvoiceSideModal_pendingSuccessMessage,
} from "./useCreateInvoiceSideModal";

async function submitForm(submitType: "save & send" | "save as draft") {
  const submitButton = screen.getByRole("button", { name: new RegExp(submitType, "i") });
  await userEvent.click(submitButton);
}

describe("CreateInvoiceSideModal.tsx", () => {
  it("should call 'handleCloseModal', 'handleAddInvoiceToState', and show a feedback popup if invoice was saved and sent successfully!", async () => {
    const handleCloseModalMock = jest.fn();
    const handleSaveAndSendMock = jest.fn();
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    handleSaveAndSendMock.mockReturnValue(HTTPResponse.success({ invoice: validTestInvoice }));

    render(
      <CreateInvoiceSideModal
        defaultValues={{ invoice: validTestInvoice, invoiceItems: [validTestInvoiceItem] }}
        handleCloseModal={handleCloseModalMock}
        handleAddInvoiceToState={handleAddInvoiceToStateMock}
        handleSaveAndSend={handleSaveAndSendMock}
        handleSaveAsDraft={jest.fn()}
        displayPopup={handleDisplayPopupMock}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
      />,
    );

    await submitForm("save & send");

    expect(handleSaveAndSendMock).toHaveBeenCalled();

    expect(handleCloseModalMock).toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalledWith(
      createInvoiceSideModal_pendingSuccessMessage,
    );

    expect(handleAddInvoiceToStateMock).toHaveBeenCalled();
  });

  it("should call 'handleCloseModal', 'handleAddInvoiceToState', and show a feedback popup if invoice was saved as draft successfully!", async () => {
    const handleCloseModalMock = jest.fn();
    const handleSaveAsDraftMock = jest.fn();
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    handleSaveAsDraftMock.mockReturnValue(HTTPResponse.success({ invoice: validTestInvoice }));

    render(
      <CreateInvoiceSideModal
        defaultValues={{ invoice: validTestInvoice, invoiceItems: [validTestInvoiceItem] }}
        handleCloseModal={handleCloseModalMock}
        handleAddInvoiceToState={handleAddInvoiceToStateMock}
        handleSaveAndSend={jest.fn()}
        handleSaveAsDraft={handleSaveAsDraftMock}
        displayPopup={handleDisplayPopupMock}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
      />,
    );

    await submitForm("save as draft");

    expect(handleSaveAsDraftMock).toHaveBeenCalled();

    expect(handleCloseModalMock).toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalledWith(createInvoiceSideModal_draftSuccessMessage);

    expect(handleAddInvoiceToStateMock).toHaveBeenCalled();
  });

  it("should display error if the 'save & send' form submittion fails", async () => {
    const handleCloseModalMock = jest.fn();
    const handleSaveAndSendMock = jest.fn();
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    handleSaveAndSendMock.mockReturnValue(HTTPResponse.error("request error"));

    render(
      <CreateInvoiceSideModal
        defaultValues={{ invoice: validTestInvoice, invoiceItems: [validTestInvoiceItem] }}
        handleCloseModal={handleCloseModalMock}
        handleAddInvoiceToState={handleAddInvoiceToStateMock}
        handleSaveAndSend={handleSaveAndSendMock}
        handleSaveAsDraft={jest.fn()}
        displayPopup={handleDisplayPopupMock}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
      />,
    );

    await submitForm("save & send");

    expect(handleSaveAndSendMock).toHaveBeenCalled();

    expect(handleCloseModalMock).not.toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalledWith("request error");

    expect(handleCloseModalMock).not.toHaveBeenCalled();
  });

  it("should display error if the 'save as draft' form submittion request fails", async () => {
    const handleCloseModalMock = jest.fn();
    const handleSaveAsDraftMock = jest.fn();
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    handleSaveAsDraftMock.mockReturnValue(HTTPResponse.error("request error"));

    render(
      <CreateInvoiceSideModal
        defaultValues={{ invoice: validTestInvoice, invoiceItems: [validTestInvoiceItem] }}
        handleCloseModal={handleCloseModalMock}
        handleAddInvoiceToState={handleAddInvoiceToStateMock}
        handleSaveAndSend={jest.fn()}
        handleSaveAsDraft={handleSaveAsDraftMock}
        displayPopup={handleDisplayPopupMock}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
      />,
    );

    await submitForm("save as draft");

    expect(handleSaveAsDraftMock).toHaveBeenCalled();

    expect(handleCloseModalMock).not.toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalledWith("request error");

    expect(handleAddInvoiceToStateMock).not.toHaveBeenCalled();
  });

  it("should display a feedback popup if 'handleSaveAndSendInvoice' function throws an error", async () => {
    const handleCloseModalMock = jest.fn();
    const handleSaveAndSendMock = jest.fn(() => {
      throw new Error("save and send error");
    });
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    render(
      <CreateInvoiceSideModal
        defaultValues={{ invoice: validTestInvoice, invoiceItems: [validTestInvoiceItem] }}
        handleCloseModal={handleCloseModalMock}
        handleAddInvoiceToState={handleAddInvoiceToStateMock}
        handleSaveAndSend={handleSaveAndSendMock}
        handleSaveAsDraft={jest.fn()}
        displayPopup={handleDisplayPopupMock}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
      />,
    );

    await submitForm("save & send");

    expect(handleSaveAndSendMock).toThrow();

    expect(handleCloseModalMock).not.toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalledWith("save and send error");

    expect(handleAddInvoiceToStateMock).not.toHaveBeenCalled();
  });

  it("should display a feedback popup if 'handleSaveInvoiceAsDraft' function throws an error", async () => {
    const handleCloseModalMock = jest.fn();
    const handleSaveAsDraftMock = jest.fn(() => {
      throw new Error("save as draft error");
    });
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    render(
      <CreateInvoiceSideModal
        defaultValues={{ invoice: validTestInvoice, invoiceItems: [validTestInvoiceItem] }}
        handleCloseModal={handleCloseModalMock}
        handleAddInvoiceToState={handleAddInvoiceToStateMock}
        handleSaveAndSend={jest.fn()}
        handleSaveAsDraft={handleSaveAsDraftMock}
        displayPopup={handleDisplayPopupMock}
        firstFocusableButtonRef={{ current: null }}
        lastFocusableButtonRef={{ current: null }}
      />,
    );

    await submitForm("save as draft");

    expect(handleSaveAsDraftMock).toThrow();

    expect(handleCloseModalMock).not.toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalled();

    expect(handleDisplayPopupMock).toHaveBeenCalledWith("save as draft error");

    expect(handleAddInvoiceToStateMock).not.toHaveBeenCalled();
  });
});
