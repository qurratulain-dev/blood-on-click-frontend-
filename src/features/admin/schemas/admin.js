import { z } from "zod";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const donorSchema = z.object({
  role: z.literal("donor"),
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  blood_group: z.enum(bloodGroups, { message: "Blood group is required" }),
  gender: z.enum(["Male", "Female", "Other"]),
  age: z.coerce.number().min(18, "Must be 18+").max(65, "Must be under 65"),
  weight: z.coerce.number().min(50, "Weight must be at least 50 kg"),
  status: z.enum(["available", "not_available"]),
  address: z.string().min(1, "Address is required"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

export const bloodBankSchema = z.object({
  role: z.literal("blood_bank"),
  bank_name: z.string().min(2, "Bank name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  registration_number: z.string().min(1, "Registration number is required"),
  license_number: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  address: z.string().min(1, "Address is required"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

export const seekerSchema = z.object({
  role: z.literal("seeker"),
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});
