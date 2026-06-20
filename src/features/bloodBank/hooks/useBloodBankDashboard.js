import { useQuery } from "@tanstack/react-query";
import { getBloodBankDashboard } from "@/features/bloodBank/api/bloodBank";

export function useBloodBankDashboard() {
  return useQuery({
    queryKey: ["blood-bank-dashboard"],
    queryFn: async () => {
      const res = await getBloodBankDashboard();
      return res.data;
    },
  });
}
