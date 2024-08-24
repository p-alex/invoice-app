import { InvoiceType } from "../entities/Invoice";

const validTestInvoice: InvoiceType = {
  id: "testId",
  client_name: "test",
  client_email: "test@test.com",
  sender_address: { street: "test", city: "test", post_code: "test", country: "test" },
  receiver_address: { street: "test", city: "test", post_code: "test", country: "test" },
  payment_terms: "Net 1 Day",
  created_at: new Date().toISOString(),
  due_at: new Date().toISOString(),
  status: "pending",
  project_description: "test",
  total_price: 0,
};

const invalidTestInvoice: InvoiceType = {
  id: "testId",
  client_name: "",
  client_email: "",
  sender_address: { street: "", city: "", post_code: "", country: "" },
  receiver_address: { street: "", city: "", post_code: "", country: "" },
  payment_terms: "Net 1 Day",
  created_at: new Date().toISOString(),
  due_at: new Date().toISOString(),
  status: "pending",
  project_description: "",
  total_price: 0,
};

export { validTestInvoice, invalidTestInvoice };
