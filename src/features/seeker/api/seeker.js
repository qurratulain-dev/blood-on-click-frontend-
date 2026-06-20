import api from "@/services/api";

export function getSeekerDashboard() {
  return api.get("/seeker/dashboard");
}

export function getProfile() {
  return api.get("/seeker/profile");
}

export function updateProfile(data) {
  return api.put("/seeker/profile", data);
}

export function searchDonors(params) {
  return api.get("/seeker/donors", { params });
}

export function searchBanks(params) {
  return api.get("/seeker/banks", { params });
}

export function getRequests() {
  return api.get("/seeker/requests");
}

export function createRequest(data) {
  return api.post("/seeker/requests", data);
}

export function getNotifications() {
  return api.get("/seeker/notifications");
}

export function markNotificationRead(id) {
  return api.put(`/seeker/notifications/${id}/read`);
}

export function markAllNotificationsRead() {
  return api.put("/seeker/notifications/read-all");
}

export function deleteNotification(id) {
  return api.delete(`/seeker/notifications/${id}`);
}
