export const ROLES = {
  DONOR: "donor",
  BLOOD_BANK: "blood_bank",
  SEEKER: "seeker",
};

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const GENDERS = ["Male", "Female", "Other"];

export const ROUTES = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
};

export const NAV_LINKS = {
  public: [
    { to: "/", label: "Home" },
    { to: "/register", label: "Register" },
    { to: "/login", label: "Login" },
  ],
  admin: [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/users/add", label: "Add User" },
    { to: "/admin/users", label: "Manage Users" },
    { to: "/admin/donations", label: "Manage Donations" },
    { to: "/admin/assessments", label: "Assessments" },
    { to: "/admin/assessments/new", label: "New Assessment" },
    { to: "/admin/assessments", label: "View Assessments" },
    { to: "/admin/recommend-bank", label: "Recommend Bank" },
  ],
  donor: [
    { to: "/donor", label: "Dashboard" },
    { to: "/donor/edit-profile", label: "Edit Profile" },
    { to: "/donor/search-banks", label: "Search Banks" },
    { to: "/donor/medical-reports", label: "Medical Reports" },
    { to: "/donor/donation-history", label: "Donation History" },
    { to: "/donor/notifications", label: "Notifications" },
  ],
  seeker: [
    { to: "/seeker", label: "Dashboard" },
    { to: "/seeker/search-donors", label: "Search Donors" },
    { to: "/seeker/search-banks", label: "Search Banks" },
    { to: "/seeker/notifications", label: "Notifications" },
  ],
  blood_bank: [
    { to: "/blood-bank", label: "Dashboard" },
    { to: "/blood-bank/edit-profile", label: "Edit Profile" },
    { to: "/blood-bank/manage-stock", label: "Manage Stock" },
    { to: "/blood-bank/view-requests", label: "View Requests" },
    { to: "/blood-bank/notifications", label: "Notifications" },
    { to: "/blood-bank/reports", label: "Reports" },
  ],
};
