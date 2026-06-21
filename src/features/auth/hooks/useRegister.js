import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/features/auth/api/register";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration successful! Please login.");
      navigate("/login");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message);
    },
  });
}
