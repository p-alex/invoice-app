import { InvoiceType } from "../entities/Invoice";
import { InvoiceItemType } from "../entities/InvoiceItem";
import calculateInvoiceTotalPrice from "../utils/calculateInvoiceTotalPrice";
import getInvoiceDueDate from "../utils/getInvoiceDueDate";

const getValidTestInvoice = (id: string, invoiceItems: InvoiceItemType[]): InvoiceType => {
  return {
    id,
    client_name: "clientName" + id,
    client_email: `client@email${id}.com`,
    sender_address: {
      street: "senderStreet" + id,
      city: "senderCity" + id,
      post_code: "senderPostCode" + id,
      country: "senderCountry" + id,
    },
    receiver_address: {
      street: "receiverStreet" + id,
      city: "receiverCity" + id,
      post_code: "receiverPostCode" + id,
      country: "receiverCountry" + id,
    },
    payment_terms: "Net 1 Day",
    created_at: new Date(2024, 0, 1).toISOString(),
    due_at: getInvoiceDueDate(new Date(2024, 0, 1), "Net 1 Day").toISOString(),
    status: "pending",
    project_description: "projectDescription" + id,
    total_price: calculateInvoiceTotalPrice(invoiceItems),
  };
};

const getInvalidTestInvoice = (id: string, invoiceItems: InvoiceItemType[]): InvoiceType => {
  return {
    id,
    client_name: "",
    client_email: "",
    sender_address: { street: "", city: "", post_code: "", country: "" },
    receiver_address: { street: "", city: "", post_code: "", country: "" },
    payment_terms: "Net 1 Day",
    created_at: new Date().toISOString(),
    due_at: getInvoiceDueDate(new Date(2024, 0, 1), "Net 1 Day").toISOString(),
    status: "pending",
    project_description: "",
    total_price: calculateInvoiceTotalPrice(invoiceItems),
  };
};

export { getValidTestInvoice, getInvalidTestInvoice };
