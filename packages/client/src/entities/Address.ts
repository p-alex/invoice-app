import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(1, "Can't be blank"),
  city: z.string().min(1, "Can't be blank"),
  post_code: z.string().min(1, "Can't be blank"),
  country: z.string().min(1, "Can't be blank"),
});

export type AddressType = z.infer<typeof addressSchema>;
