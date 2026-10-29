import { z } from "zod";

export const createProductSchema = z
  .object({
    product_name: z.string().trim().min(2).max(100),
    product_desc: z.string().trim().min(2).max(100),
  })
  .strict();
