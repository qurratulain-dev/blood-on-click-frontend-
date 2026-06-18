import api from "@/services/api";

export function addUser(data) {
  return api.post("/admin/users", data);
}

export function getStats() {
  return api.get("/admin/stats");
}
