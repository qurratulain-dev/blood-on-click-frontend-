import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, addBloodBank } from "@/features/admin/api/admin";
import toast from "react-hot-toast";

export function useAddUser() {
  const queryClient = useQueryClient();

  const apiMap = {
    user: addUser,
    blood_bank: addBloodBank,
  };

  return useMutation({
    mutationFn: (data) => apiMap[data.role](data),
    onSuccess: () => {
      toast.success("User added successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to add user";
      toast.error(message);
    },
  });
}