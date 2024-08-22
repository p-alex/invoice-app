import { InvoiceItemType } from "../entities/InvoiceItem";

const validTestInvoiceItem: InvoiceItemType = {
  id: "testId1",
  invoice_id: "testId",
  name: "test",
  price: 100,
  quantity: 2,
};

const invalidTestInvoiceItem: InvoiceItemType = {
  id: "testId1",
  invoice_id: "testId",
  name: "",
  price: 100,
  quantity: 2,
};

export { validTestInvoiceItem, invalidTestInvoiceItem };
