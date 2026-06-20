import { useQuery } from "@tanstack/react-query";
import { getSeekerDashboard } from "@/features/seeker/api/seeker";

export function useSeekerDashboard() {
  return useQuery({
    queryKey: ["seeker-dashboard"],
    queryFn: async () => {
      const res = await getSeekerDashboard();
      return res.data;
    },
  });
}
