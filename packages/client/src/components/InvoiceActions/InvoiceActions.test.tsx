import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InvoiceActions from "./InvoiceActions";
import { getInvalidTestInvoice, getValidTestInvoice } from "../../testEntities/testInvoice";
import { getValidTestInvoiceItem } from "../../testEntities/testInvoiceItem";
import userEvent from "@testing-library/user-event";

describe("InvoiceActions.ts", () => {
  const validInvoiceItems = [
    getValidTestInvoiceItem("1", "123"),
    getValidTestInvoiceItem("2", "123"),
  ];
  const validInvoice = getValidTestInvoice("123", validInvoiceItems);
  const invalidInvoice = getInvalidTestInvoice("123", []);
  it("should display only the edit and delete buttons if the invoice's status is 'draft' and invoice is invalid", () => {
    render(
      <InvoiceActions
        invoiceData={{
          invoice: { ...invalidInvoice, status: "draft" },
          invoiceItems: validInvoiceItems,
        }}
        handleUpdateInvoice={jest.fn()}
        handleDeleteInvoice={jest.fn()}
        handleMarkInvoiceAsPaid={jest.fn()}
        handleSendInvoice={jest.fn()}
      />,
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    const sendButton = screen.queryByRole("button", { name: /send/i });
    const markAsPaidButton = screen.queryByRole("button", { name: /mark as paid/i });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(sendButton).not.toBeInTheDocument();
    expect(markAsPaidButton).not.toBeInTheDocument();
  });
  it("should display only the edit, delete and send buttons if the invoice's status is 'draft' and invoice is valid", () => {
    render(
      <InvoiceActions
        invoiceData={{
          invoice: { ...validInvoice, status: "draft" },
          invoiceItems: validInvoiceItems,
        }}
        handleUpdateInvoice={jest.fn()}
        handleDeleteInvoice={jest.fn()}
        handleMarkInvoiceAsPaid={jest.fn()}
        handleSendInvoice={jest.fn()}
      />,
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    const sendButton = screen.queryByRole("button", { name: /send/i });
    const markAsPaidButton = screen.queryByRole("button", { name: /mark as paid/i });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
    expect(markAsPaidButton).not.toBeInTheDocument();
  });
  it("should display only the edit, delete and mark as paid buttons if the invoice's status is 'pending' and invoice is valid", () => {
    render(
      <InvoiceActions
        invoiceData={{
          invoice: { ...validInvoice, status: "pending" },
          invoiceItems: validInvoiceItems,
        }}
        handleUpdateInvoice={jest.fn()}
        handleDeleteInvoice={jest.fn()}
        handleMarkInvoiceAsPaid={jest.fn()}
        handleSendInvoice={jest.fn()}
      />,
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    const sendButton = screen.queryByRole("button", { name: /send/i });
    const markAsPaidButton = screen.queryByRole("button", { name: /mark as paid/i });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(sendButton).not.toBeInTheDocument();
    expect(markAsPaidButton).toBeInTheDocument();
  });
  it("should display only the delete button if the invoice's status is 'paid' and invoice is valid", () => {
    render(
      <InvoiceActions
        invoiceData={{
          invoice: { ...validInvoice, status: "paid" },
          invoiceItems: validInvoiceItems,
        }}
        handleUpdateInvoice={jest.fn()}
        handleDeleteInvoice={jest.fn()}
        handleMarkInvoiceAsPaid={jest.fn()}
        handleSendInvoice={jest.fn()}
      />,
    );

    const editButton = screen.queryByRole("button", { name: /edit/i });
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    const sendButton = screen.queryByRole("button", { name: /send/i });
    const markAsPaidButton = screen.queryByRole("button", { name: /mark as paid/i });

    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(sendButton).not.toBeInTheDocument();
    expect(markAsPaidButton).not.toBeInTheDocument();
  });

  it("clicking on delete button should display a confirmation dialog", async () => {
    render(
      <InvoiceActions
        invoiceData={{
          invoice: { ...validInvoice, status: "paid" },
          invoiceItems: validInvoiceItems,
        }}
        handleUpdateInvoice={jest.fn()}
        handleDeleteInvoice={jest.fn()}
        handleMarkInvoiceAsPaid={jest.fn()}
        handleSendInvoice={jest.fn()}
      />,
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });

    await userEvent.click(deleteButton);

    const dialog = screen.getByRole("dialog");

    expect(dialog).toBeInTheDocument();
  });

  it("clicking on mark as paid button should display a confirmation dialog", async () => {
    render(
      <InvoiceActions
        invoiceData={{
          invoice: { ...validInvoice, status: "pending" },
          invoiceItems: validInvoiceItems,
        }}
        handleUpdateInvoice={jest.fn()}
        handleDeleteInvoice={jest.fn()}
        handleMarkInvoiceAsPaid={jest.fn()}
        handleSendInvoice={jest.fn()}
      />,
    );

    const markAsPaidButton = screen.getByRole("button", { name: /mark as paid/i });

    await userEvent.click(markAsPaidButton);

    const dialog = screen.getByRole("dialog");

    expect(dialog).toBeInTheDocument();
  });

  it("clicking on edit button should display the edit invoice side modal", async () => {
    render(
      <InvoiceActions
        invoiceData={{
          invoice: { ...validInvoice, status: "pending" },
          invoiceItems: validInvoiceItems,
        }}
        handleUpdateInvoice={jest.fn()}
        handleDeleteInvoice={jest.fn()}
        handleMarkInvoiceAsPaid={jest.fn()}
        handleSendInvoice={jest.fn()}
      />,
    );

    const editButton = screen.getByRole("button", { name: /edit/i });

    await userEvent.click(editButton);

    const editInvoiceSideModalTitle = screen.getByRole("heading", {
      level: 2,
      name: /edit /i,
    });

    expect(editInvoiceSideModalTitle).toBeInTheDocument();
  });
});
