import { z } from "zod";

export const invoiceItemSchema = z.object({
  id: z.string().min(1, "Can't be blank"),
  invoiceId: z.string().min(1, "Can't be blank"),
  name: z.string().min(1, "The name field of all invoice items has to be populated"),
  quantity: z.number().min(1, "The quantity field of all invoice items must be at least 1"),
  price: z.number(),
});

export type InvoiceItemType = z.TypeOf<typeof invoiceItemSchema>;
