import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InvoiceDetails from "./InvoiceDetails";
import { InvoiceType } from "../../entities/Invoice";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import getPrettyDate from "../../utils/getPrettyDate";
import { getValidTestInvoice } from "../../testEntities/testInvoice";
import { getValidTestInvoiceItem } from "../../testEntities/testInvoiceItem";

describe("InvoiceDetails Component", () => {
  const testInvoice: InvoiceType = getValidTestInvoice("123abc");

  const testInvoiceItems: InvoiceItemType[] = [
    getValidTestInvoiceItem("1", "123abc"),
    getValidTestInvoiceItem("2", "123abc"),
  ];

  test("renders the invoice ID and project description", () => {
    render(<InvoiceDetails invoice={testInvoice} invoiceItems={testInvoiceItems} />);

    const invoiceIdElement = screen.getByText(`${testInvoice.id}`);

    const projectDescriptionElement = screen.getByText(testInvoice.project_description);

    expect(invoiceIdElement).toBeInTheDocument();

    expect(projectDescriptionElement).toBeInTheDocument();
  });

  test("renders the invoice creation and due dates", () => {
    render(<InvoiceDetails invoice={testInvoice} invoiceItems={testInvoiceItems} />);

    const createdAtDate = new Date(testInvoice.created_at);

    const dueAtDate = new Date(testInvoice.due_at);

    const createdAtDateElement = screen.getByText(
      getPrettyDate(createdAtDate.getFullYear(), createdAtDate.getMonth(), createdAtDate.getDate()),
    );

    const dueAtDateElement = screen.getByText(
      getPrettyDate(dueAtDate.getFullYear(), dueAtDate.getMonth(), dueAtDate.getDate()),
    );

    expect(createdAtDateElement).toBeInTheDocument();

    expect(dueAtDateElement).toBeInTheDocument();
  });

  test("renders the sender address correctly", () => {
    render(<InvoiceDetails invoice={testInvoice} invoiceItems={testInvoiceItems} />);

    const senderStreetElement = screen.getByText(testInvoice.sender_address.street);

    const senderCityElement = screen.getByText(testInvoice.sender_address.city);

    const senderPostCodeElement = screen.getByText(testInvoice.sender_address.post_code);

    const senderCountryElement = screen.getByText(testInvoice.sender_address.country);

    expect(senderStreetElement).toBeInTheDocument();

    expect(senderCityElement).toBeInTheDocument();

    expect(senderPostCodeElement).toBeInTheDocument();

    expect(senderCountryElement).toBeInTheDocument();
  });

  test("renders the receiver address correctly", () => {
    render(<InvoiceDetails invoice={testInvoice} invoiceItems={testInvoiceItems} />);

    const receiverStreetElement = screen.getByText(testInvoice.receiver_address.street);

    const receiverCityElement = screen.getByText(testInvoice.receiver_address.city);

    const receiverPostCodeElement = screen.getByText(testInvoice.receiver_address.post_code);

    const receiverCountryElement = screen.getByText(testInvoice.receiver_address.country);

    expect(receiverStreetElement).toBeInTheDocument();

    expect(receiverCityElement).toBeInTheDocument();

    expect(receiverPostCodeElement).toBeInTheDocument();

    expect(receiverCountryElement).toBeInTheDocument();
  });

  test("renders the client email", () => {
    render(<InvoiceDetails invoice={testInvoice} invoiceItems={testInvoiceItems} />);

    const clientEmailElement = screen.getByText(testInvoice.client_email);

    expect(clientEmailElement).toBeInTheDocument();
  });
});
