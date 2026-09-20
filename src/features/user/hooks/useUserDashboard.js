import { useQuery } from "@tanstack/react-query";
import { getUserDashboard } from "@/features/user/api/User";

export function useUserDashboard() {
  return useQuery({
    queryKey: ["user-dashboard"],
    queryFn: async () => {
      const res = await getUserDashboard();
      return res.data;
    },
  });
}
