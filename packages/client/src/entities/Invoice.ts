import * as z from "zod";
import { addressSchema } from "./Address";

export const invoiceSchema = z.object({
  id: z.string().min(1, "Can't be blank"),
  sender_address: addressSchema,
  receiver_address: addressSchema,
  client_name: z.string().min(1, "Can't be blank"),
  client_email: z.string().min(1, "Can't be blank").email(),
  created_at: z.string().datetime(),
  payment_terms: z.enum(["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"]),
  due_at: z.string().datetime(),
  status: z.enum(["pending", "paid", "draft"]).default("pending"),
  project_description: z.string().min(1, "Can't be blank"),
  total_price: z.number(),
});

export type InvoiceType = z.TypeOf<typeof invoiceSchema>;

export type PaymentTermsType = InvoiceType["payment_terms"];
