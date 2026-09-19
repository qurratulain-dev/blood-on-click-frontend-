import { useDonorDashboard } from "@/features/donor/hooks/useDonorDashboard";
import { useAuthStore } from "@/stores/authStore";
import { DonorDashboardOverview } from "@/features/donor/components/dashboard/DonorDashboardOverview";
import { DonorDashboardSkeleton } from "@/features/donor/components/dashboard/DonorDashboardSkeleton";
import { DonorDashboardError } from "@/features/donor/components/dashboard/DonorDashboardError";

export function DonorDashboard() {
  const { data, isPending, isError, refetch } = useDonorDashboard();
  const user = useAuthStore((s) => s.user);

  if (isError) {
    return <DonorDashboardError onRetry={() => refetch()} />;
  }

  if (isPending) {
    return <DonorDashboardSkeleton />;
  }

  const name = data?.profile?.full_name || user?.name || "Donor";

  return <DonorDashboardOverview data={data} name={name} />;
}