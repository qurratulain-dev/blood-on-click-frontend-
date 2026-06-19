import { create } from "zustand";
import api from "@/services/api";

const token = localStorage.getItem("auth_token");

const initialState = {
  user: null,
  role: null,
  token: token || null,
  isAuthenticated: false,
  loading: !!token,
};

export const useAuthStore = create((set, get) => ({
  ...initialState,

  setAuth: (user, token, role = null) => {
    localStorage.setItem("auth_token", token);
    set({ user, token, role, isAuthenticated: true, loading: false });
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    set({ user: null, role: null, token: null, isAuthenticated: false, loading: false });
  },

  restoreSession: async () => {
    const t = localStorage.getItem("auth_token");
    if (!t) {
      set({ loading: false });
      return;
    }
    try {
      const res = await api.get("/user");
      const { user, role } = res.data;
      set({ user, role, token: t, isAuthenticated: true, loading: false });
    } catch {
      localStorage.removeItem("auth_token");
      set({ user: null, role: null, token: null, isAuthenticated: false, loading: false });
    }
  },
}));
