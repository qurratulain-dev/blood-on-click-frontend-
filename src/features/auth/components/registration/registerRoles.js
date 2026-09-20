import { Building2, HeartHandshake } from "lucide-react";

export const REGISTER_ROLES = [
  {
    id: "user",
    icon: HeartHandshake,
    label: "User",
    description: "Donate blood and make blood requests.",
    heading: "Your details",
    formDescription: "Tell us about yourself and your blood profile.",
    wide: false,
  },
  {
    id: "blood_bank",
    icon: Building2,
    label: "Blood Bank",
    description: "Manage stock, requests, and reports.",
    heading: "Blood bank details",
    formDescription: "Provide your blood bank's registration details.",
    wide: true,
  },
];

export const REGISTER_ROLE_IDS = REGISTER_ROLES.map((role) => role.id);