import api from "@/services/api";

export function getAdminDashboard() {
  return api.get("/admin/dashboard");
}

export function getCounts() {
  return api.get("/admin/counts");
}

export function addDonor(data) {
  return api.post("/admin/add-donor", data);
}

export function addBloodBank(data) {
  return api.post("/admin/add-blood-bank", data);
}

export function addSeeker(data) {
  return api.post("/admin/add-seeker", data);
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

export function verifyDonation(id) {
  return api.post(`/admin/donations/${id}/verify`);
}

export function rejectDonation(id) {
  return api.post(`/admin/donations/${id}/reject`);
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

export function updateDonor(id, data) {
  return api.put(`/admin/donors/${id}`, data);
}

export function updateBloodBank(id, data) {
  return api.put(`/admin/blood-banks/${id}`, data);
}

export function updateSeeker(id, data) {
  return api.put(`/admin/seekers/${id}`, data);
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

export function getDonorAssessmentHistory(donorId) {
  return api.get(`/admin/assessments/donor/${donorId}`);
}
