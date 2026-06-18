import { z } from "zod";

const name = z.string().min(2, "Name must be at least 2 characters");
const username = z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores");
const email = z.string().email("Invalid email address");
const password = z.string().min(6, "Password must be at least 6 characters");
const phone = z.string().min(10, "Phone number must be at least 10 digits");
const address = z.string().min(1, "Address is required");

const donorSchema = z.object({
  role_type: z.string(),
  name,
  username,
  email,
  password,
  password_confirmation: z.string(),
  phone,
  blood_group: z.string().min(1, "Blood group is required"),
  address,
  age: z.coerce.number().min(18, "Must be at least 18 years old").max(100, "Invalid age"),
  weight: z.coerce.number().min(30, "Weight must be at least 30 kg").max(300, "Invalid weight"),
  gender: z.string().min(1, "Gender is required"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

const bloodBankSchema = z.object({
  role_type: z.string(),
  name,
  username,
  email,
  password,
  password_confirmation: z.string(),
  phone,
  bank_name: z.string().min(2, "Bank name must be at least 2 characters"),
  address,
  registration_number: z.string().min(1, "Registration number is required"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

const seekerSchema = z.object({
  role_type: z.string(),
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
