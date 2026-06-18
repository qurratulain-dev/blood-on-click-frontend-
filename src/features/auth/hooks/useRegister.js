import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/features/auth/api/register";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      const { user, token } = response.data;
      setAuth(user, token);
      toast.success("Registration successful!");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message);
    },
  });
}
