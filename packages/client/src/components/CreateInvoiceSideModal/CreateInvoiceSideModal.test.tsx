import "@testing-library/jest-dom";
import CreateInvoiceSideModal from "./CreateInvoiceSideModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

async function fillTextFields(fields: HTMLElement[]) {
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].getAttribute("type") === "email") {
      await userEvent.type(fields[i], "test@test.com");
      continue;
    }
    await userEvent.type(fields[i], "test");
  }
}

async function initialFormSetup() {
  const addNewInvoiceItemButton = screen.getByRole("button", { name: /\+ add new item/i });
  await userEvent.click(addNewInvoiceItemButton);
}

async function submitForm(submitType: "save & send" | "save as draft") {
  await initialFormSetup();
  const fields = screen.getAllByRole("textbox");
  await fillTextFields(fields);
  const submitButton = screen.getByRole("button", { name: new RegExp(submitType, "i") });
  await userEvent.click(submitButton);
}

describe("CreateInvoiceSideModal.tsx", () => {
  it("should call 'handleCloseModal', 'handleAddInvoiceToState', and show a feedback popup if invoice was saved and sent successfully!", async () => {
    const handleCloseModalMock = jest.fn();
    const handleSaveAndSendMock = jest.fn();
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    handleSaveAndSendMock.mockReturnValue({ success: true });

    render(
      <CreateInvoiceSideModal
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

    expect(handleDisplayPopupMock).toHaveBeenCalled();

    expect(handleAddInvoiceToStateMock).toHaveBeenCalled();
  });

  it("should call 'handleCloseModal', 'handleAddInvoiceToState', and show a feedback popup if invoice was saved as draft successfully!", async () => {
    const handleCloseModalMock = jest.fn();
    const handleSaveAsDraftMock = jest.fn();
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    handleSaveAsDraftMock.mockReturnValue({ success: true });

    render(
      <CreateInvoiceSideModal
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

    expect(handleDisplayPopupMock).toHaveBeenCalled();

    expect(handleAddInvoiceToStateMock).toHaveBeenCalled();
  });

  it("should display error if the 'save & send' form submittion fails", async () => {
    const handleCloseModalMock = jest.fn();
    const handleSaveAndSendMock = jest.fn();
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    handleSaveAndSendMock.mockReturnValue({ success: false });

    render(
      <CreateInvoiceSideModal
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

    expect(handleCloseModalMock).not.toHaveBeenCalled();
  });

  it("should display error if the 'save as draft' form submittion fails", async () => {
    const handleCloseModalMock = jest.fn();
    const handleSaveAsDraftMock = jest.fn();
    const handleDisplayPopupMock = jest.fn();
    const handleAddInvoiceToStateMock = jest.fn();

    handleSaveAsDraftMock.mockReturnValue({ success: false });

    render(
      <CreateInvoiceSideModal
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

    expect(handleAddInvoiceToStateMock).not.toHaveBeenCalled();
  });
});
