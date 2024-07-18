import { z } from "zod";
import { invoiceItemSchema } from "./InvoiceItem";

export const invoiceSchema = z.object({
  id: z.string().min(1, "Can't be blank"),
  from_streetAddress: z.string().min(1, "Can't be blank"),
  from_city: z.string().min(1, "Can't be blank"),
  from_postCode: z.string().min(1, "Can't be blank"),
  from_country: z.string().min(1, "Can't be blank"),
  to_clientName: z.string().min(1, "Can't be blank"),
  to_clientEmail: z.string().min(1, "Can't be blank").email(),
  to_streetAddress: z.string().min(1, "Can't be blank"),
  to_city: z.string().min(1, "Can't be blank"),
  to_postCode: z.string().min(1, "Can't be blank"),
  to_country: z.string().min(1, "Can't be blank"),
  invoiceDate: z.string().min(1, "Can't be blank"),
  paymentTerms: z.enum(["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"]),
  projectDescription: z.string().min(1, "Can't be blank"),
  invoiceItemList: z.array(invoiceItemSchema).min(1, "No invoice item added"),
});

export type InvoiceType = z.TypeOf<typeof invoiceSchema>;
