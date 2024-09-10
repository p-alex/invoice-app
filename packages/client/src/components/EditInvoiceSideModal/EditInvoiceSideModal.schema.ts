import { z } from "zod";
import { invoiceSchema } from "../../entities/Invoice";
import { invoiceItemSchema } from "../../entities/InvoiceItem";

export const editInvoiceSchema = z.object({
  invoice: invoiceSchema,
  invoiceItems: z.array(invoiceItemSchema).min(1, "No invoice item added"),
});

export type EditInvoiceType = z.TypeOf<typeof editInvoiceSchema>;
