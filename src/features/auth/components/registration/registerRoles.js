import { Building2, HeartHandshake, UserRound } from "lucide-react";

export const REGISTER_ROLES = [
  {
    id: "donor",
    icon: HeartHandshake,
    label: "Donor",
    description: "Donate blood and manage your donor profile.",
    heading: "Donor details",
    formDescription: "Tell us a little about your donor profile.",
    wide: false,
  },
  {
    id: "seeker",
    icon: UserRound,
    label: "Seeker",
    description: "Search for donors and blood banks.",
    heading: "Your details",
    formDescription: "Share your details to create your seeker account.",
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
