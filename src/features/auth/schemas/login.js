import { z } from "zod";

export const loginSchema = z.object({
  role_type: z.enum(["donor", "blood_bank", "seeker", "admin"], {
    errorMap: () => ({ message: "Invalid role selected" }),
  }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
