import { z } from "zod";

export const loginSchema = z.object({
  role_type: z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
