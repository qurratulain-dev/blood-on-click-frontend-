import { useQuery } from "@tanstack/react-query";
import { getDonorDashboard } from "@/features/donor/api/donor";

export function useDonorDashboard() {
  return useQuery({
    queryKey: ["donor-dashboard"],
    queryFn: async () => {
      const res = await getDonorDashboard();
      return res.data;
    },
  });
}
