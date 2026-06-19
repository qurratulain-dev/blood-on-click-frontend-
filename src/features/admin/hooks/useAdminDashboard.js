import { useQuery } from "@tanstack/react-query";
import { getAdminDashboard } from "@/features/admin/api/admin";

export function useAdminDashboard() {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await getAdminDashboard();
      return res.data;
    },
  });
}
