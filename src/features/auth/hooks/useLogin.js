import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/features/auth/api/login";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";

const roleRoutes = {
  Admin: "/admin",
  "Blood Bank": "/blood-bank",
  Donor: "/donor",
  Seeker: "/seeker",
};

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const { user, role, token } = response.data;
      setAuth(user, token, role);
      toast.success("Login successful!");

      const route = roleRoutes[role] || "/";
      navigate(route);
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Invalid email or password!";
      toast.error(message);
    },
  });
}
