import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(3).max(255),
  price: z.number().positive(),
  tags: z.string().array(),
  description: z.string().optional(),
  user: z.number(), // `user` is handled by TypeORM relations, no need to pass it in the payload
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;
