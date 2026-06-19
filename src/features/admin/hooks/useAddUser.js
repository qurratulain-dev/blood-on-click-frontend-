import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDonor, addBloodBank, addSeeker } from "@/features/admin/api/admin";
import toast from "react-hot-toast";

export function useAddUser() {
  const queryClient = useQueryClient();

  const apiMap = {
    donor: addDonor,
    blood_bank: addBloodBank,
    seeker: addSeeker,
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
