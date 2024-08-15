import * as z from "zod";
import { invoiceItemSchema } from "./InvoiceItem";
import { addressSchema } from "./Address";

export const invoiceSchema = z.object({
  id: z.string().min(1, "Can't be blank"),
  sender_address: addressSchema,
  receiver_address: addressSchema,
  client_name: z.string().min(1, "Can't be blank"),
  client_email: z.string().min(1, "Can't be blank").email(),
  created_at: z.date(),
  payment_terms: z.enum(["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"]),
  due_at: z.date(),
  status: z.enum(["pending", "paid", "draft"]).default("pending"),
  project_description: z.string().min(1, "Can't be blank"),
});

export const createInvoiceSchema = z.object({
  invoice: invoiceSchema,
  invoice_item_list: z.array(invoiceItemSchema).min(1, "No invoice item added"),
});

export type InvoiceType = z.TypeOf<typeof invoiceSchema>;

export type CreateInvoiceType = z.TypeOf<typeof createInvoiceSchema>;
