import api from "@/services/api";

export function getUserDashboard() {
  return api.get("/user/dashboard");
}

export function getProfile() {
  return api.get("/user/profile");
}

export function updateProfile(data) {
  return api.put("/user/profile", data);
}

export function searchBanks(params) {
  return api.get("/user/banks", { params });
}

export function searchDonors(params) {
  return api.get("/user/donors", { params });
}

export function getDonorContact(userId) {
  return api.get(`/user/donors/${userId}/contact`);
}

export function getRequests() {
  return api.get("/user/requests");
}

export function createRequest(data) {
  return api.post("/user/requests", data);
}

export function getDonations() {
  return api.get("/user/donations");
}

export function getEligibility() {
  return api.get("/user/eligibility");
}

export function requestAssessment() {
  return api.post("/user/assessment-requests");
}

export function createDonation(data) {
  return api.post("/user/donations", data);
}

export function getMedicalReports() {
  return api.get("/user/medical-reports");
}

export function uploadMedicalReport(data) {
  return api.post("/user/medical-reports", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function uploadDonationReport(donationId, data) {
  return api.post(`/user/donations/${donationId}/upload-report`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function getNotifications() {
  return api.get("/user/notifications");
}

export function markNotificationRead(id) {
  return api.put(`/user/notifications/${id}/read`);
}

export function markAllNotificationsRead() {
  return api.put("/user/notifications/read-all");
}

export function deleteNotification(id) {
  return api.delete(`/user/notifications/${id}`);
}
