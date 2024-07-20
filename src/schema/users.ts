import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  email: z.string().email().trim(),
  password: z.string().min(6).max(255),
  birthDate: z.string().transform((str) => new Date(str)),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(3).max(255).optional(),
  lastName: z.string().min(3).max(255).optional(),
  defaultShippingAddress: z.number().optional(),
  defaultBillingAddress: z.number().optional(),
});
export const addressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string().nullable(),
  pinCode: z.string().length(6),
  city: z.string(),
  country: z.string(),
  user: z.number(),
});
