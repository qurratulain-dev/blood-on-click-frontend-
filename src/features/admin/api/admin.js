import api from "@/services/api";

export function getAdminDashboard() {
  return api.get("/admin/dashboard");
}

export function getCounts() {
  return api.get("/admin/counts");
}

export function addUser(data) {
  return api.post("/admin/add-user", data);
}

export function addBloodBank(data) {
  return api.post("/admin/add-blood-bank", data);
}

export function getAssessments() {
  return api.get("/admin/assessments");
}

export function getAssessment(id) {
  return api.get(`/admin/assessments/${id}`);
}

export function createAssessment(data) {
  return api.post("/admin/assessments", data);
}

export function getAssessmentDonors() {
  return api.get("/admin/assessment-donors");
}

export function getDonationDetails(id) {
  return api.get(`/admin/donations/${id}`);
}

export function generateMedicalReport(data) {
  return api.post("/admin/donations/generate-report", data);
}

export function getDonations(status) {
  const params = status ? { status } : {};
  return api.get("/admin/donations", { params });
}

export function verifyDonation(id, admin_message = "") {
  return api.post(`/admin/donations/${id}/verify`, { admin_message });
}

export function rejectDonation(id, admin_message = "") {
  return api.post(`/admin/donations/${id}/reject`, { admin_message });
}

export function moveToPending(id) {
  return api.post(`/admin/donations/${id}/pending`);
}

export function uploadMedicalReport(formData) {
  return api.post("/admin/donations/upload-report", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function getUsers() {
  return api.get("/admin/users");
}

export function updateUser(id, data) {
  return api.put(`/admin/users/${id}`, data);
}

export function updateBloodBank(id, data) {
  return api.put(`/admin/blood-banks/${id}`, data);
}

export function deleteUser(type, id) {
  return api.delete(`/admin/users/${type}/${id}`);
}

export function getAllRequests() {
  return api.get("/admin/requests");
}

export function updateRequestStatus(id, status) {
  return api.put(`/admin/requests/${id}/status`, { status });
}

export function getRecommendationData() {
  return api.get("/admin/recommend-bank/data");
}

export function sendRecommendation(data) {
  return api.post("/admin/recommend-bank", data);
}

export function getDonorAssessmentHistory(userId) {
  return api.get(`/admin/assessments/user/${userId}`);
}
