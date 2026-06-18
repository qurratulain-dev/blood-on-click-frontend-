import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/features/auth/api/login";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const { user, token } = response.data;
      setAuth(user, token);
      toast.success("Login successful!");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Invalid email or password!";
      toast.error(message);
    },
  });
}
