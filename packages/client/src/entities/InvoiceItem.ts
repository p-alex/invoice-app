import { z } from "zod";

export const invoiceItemSchema = z.object({
  id: z.string(),
  invoice_id: z.string().min(1, "Can't be blank"),
  name: z.string().min(1, "Can't be blank"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number(),
});

export function validateInvoiceItems(invoiceItems: InvoiceItemType[]) {
  const validation = z.array(invoiceItemSchema).safeParse(invoiceItems);
  return validation.success;
}

export type InvoiceItemType = z.TypeOf<typeof invoiceItemSchema>;
