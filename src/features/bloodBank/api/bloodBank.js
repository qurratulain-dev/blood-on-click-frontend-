import api from "@/services/api";

export function getBloodBankDashboard() {
  return api.get("/blood-bank/dashboard");
}

export function getProfile() {
  return api.get("/blood-bank/profile");
}

export function updateProfile(data) {
  return api.put("/blood-bank/profile", data);
}

export function getStock() {
  return api.get("/blood-bank/stock");
}

export function updateStock(id, data) {
  return api.put(`/blood-bank/stock/${id}`, data);
}

export function getRequests() {
  return api.get("/blood-bank/requests");
}

export function updateRequestStatus(id, status) {
  return api.put(`/blood-bank/requests/${id}/status`, { status });
}

export function getNotifications() {
  return api.get("/blood-bank/notifications");
}

export function markNotificationRead(id) {
  return api.put(`/blood-bank/notifications/${id}/read`);
}

export function getReports() {
  return api.get("/blood-bank/reports");
}
