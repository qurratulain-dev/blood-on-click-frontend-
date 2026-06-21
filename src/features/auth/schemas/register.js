import { z } from "zod";

const role_type = z.enum(["donor", "blood_bank", "seeker"], {
  errorMap: () => ({ message: "Invalid role selected" }),
});
const name = z.string().min(2, "Name must be at least 2 characters").max(255, "Name must be at most 255 characters");
const username = z.string().min(3, "Username must be at least 3 characters").max(255, "Username must be at most 255 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores");
const email = z.string().email("Invalid email address").max(255, "Email must be at most 255 characters");
const password = z.string().min(8, "Password must be at least 8 characters");
const phone = z.string().min(10, "Phone number must be at least 10 digits").max(20, "Phone number must be at most 20 digits");
const address = z.string().min(1, "Address is required");
const blood_group = z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
  errorMap: () => ({ message: "Please select a valid blood group" }),
});
const gender = z.enum(["Male", "Female", "Other"], {
  errorMap: () => ({ message: "Please select a valid gender" }),
});

const donorSchema = z.object({
  role_type,
  name,
  username,
  email,
  password,
  password_confirmation: z.string(),
  phone,
  blood_group,
  address,
  age: z.coerce.number().min(18, "Must be at least 18 years old").max(100, "Invalid age"),
  weight: z.coerce.number().min(30, "Weight must be at least 30 kg").max(300, "Invalid weight"),
  gender,
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

const bloodBankSchema = z.object({
  role_type,
  name,
  username,
  email,
  password,
  password_confirmation: z.string(),
  phone,
  bank_name: z.string().min(2, "Bank name must be at least 2 characters").max(255, "Bank name must be at most 255 characters"),
  address,
  registration_number: z.string().min(1, "Registration number is required").max(255, "Registration number must be at most 255 characters"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

const seekerSchema = z.object({
  role_type,
  name,
  username,
  email,
  password,
  password_confirmation: z.string(),
  phone,
  address,
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

export { donorSchema, bloodBankSchema, seekerSchema };
