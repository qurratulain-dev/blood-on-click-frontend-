import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "@/features/admin/api/admin";
import toast from "react-hot-toast";

export function useAddUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success("User added successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to add user";
      toast.error(message);
    },
  });
}
