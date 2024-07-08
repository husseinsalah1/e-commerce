import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  email: z.string().email().trim(),
  password: z.string().min(6).max(255),
  birthDate: z.string().transform((str) => new Date(str)),
});
