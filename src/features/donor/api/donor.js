import api from "@/services/api";

export function getDonorDashboard() {
  return api.get("/donor/dashboard");
}

export function getProfile() {
  return api.get("/donor/profile");
}

export function updateProfile(data) {
  return api.put("/donor/profile", data);
}

export function searchBanks(params) {
  return api.get("/donor/banks", { params });
}

export function getDonations() {
  return api.get("/donor/donations");
}

export function createDonation(data) {
  return api.post("/donor/donations", data);
}

export function getMedicalReports() {
  return api.get("/donor/medical-reports");
}

export function uploadMedicalReport(data) {
  return api.post("/donor/medical-reports", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function uploadDonationReport(donationId, data) {
  return api.post(`/donor/donations/${donationId}/upload-report`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function getNotifications() {
  return api.get("/donor/notifications");
}

export function markNotificationRead(id) {
  return api.put(`/donor/notifications/${id}/read`);
}

export function markAllNotificationsRead() {
  return api.put("/donor/notifications/read-all");
}

export function deleteNotification(id) {
  return api.delete(`/donor/notifications/${id}`);
}
