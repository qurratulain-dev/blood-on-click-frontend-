import api from "@/services/api";

export function registerUser(data) {
  return api.post("/register", data);
}
