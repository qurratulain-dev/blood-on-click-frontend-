import api from "@/services/api";

export function loginUser(data) {
  return api.post("/login", data);
}
