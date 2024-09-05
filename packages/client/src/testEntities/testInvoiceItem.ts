import { InvoiceItemType } from "../entities/InvoiceItem";

const getValidTestInvoiceItem = (id: string, invoice_id: string): InvoiceItemType => {
  return {
    id,
    invoice_id,
    name: "name" + id,
    price: 100,
    quantity: 2,
  };
};

const getInvalidTestInvoiceItem = (id: string, invoice_id: string): InvoiceItemType => {
  return {
    id,
    invoice_id,
    name: "",
    price: 100,
    quantity: 2,
  };
};

export { getValidTestInvoiceItem, getInvalidTestInvoiceItem };
