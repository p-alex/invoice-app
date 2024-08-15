import { InvoiceType } from "../entities/Invoice";

const validTestInvoice: InvoiceType = {
  id: "testId",
  client_name: "test",
  client_email: "test@test.com",
  sender_address: { street: "test", city: "test", post_code: "test", country: "test" },
  receiver_address: { street: "test", city: "test", post_code: "test", country: "test" },
  payment_terms: "Net 1 Day",
  created_at: new Date(),
  due_at: new Date(),
  status: "pending",
  project_description: "test",
};

const invalidTestInvoice: InvoiceType = {
  id: "testId",
  client_name: "",
  client_email: "",
  sender_address: { street: "", city: "", post_code: "", country: "" },
  receiver_address: { street: "", city: "", post_code: "", country: "" },
  payment_terms: "Net 1 Day",
  created_at: new Date(),
  due_at: new Date(),
  status: "pending",
  project_description: "",
};

export { validTestInvoice, invalidTestInvoice };
