import { useUserDashboard } from "@/features/user/hooks/useUserDashboard";
import { useAuthStore } from "@/stores/authStore";
import { UserDashboardOverview } from "@/features/user/components/dashboard/UserDashboardOverview";
import { UserDashboardSkeleton } from "@/features/user/components/dashboard/UserDashboardSkeleton";
import { UserDashboardError } from "@/features/user/components/dashboard/UserDashboardError";

export function UserDashboard() {
  const { data, isPending, isError, refetch } = useUserDashboard();
  const user = useAuthStore((s) => s.user);

  if (isError) {
    return <UserDashboardError onRetry={() => refetch()} />;
  }

  if (isPending) {
    return <UserDashboardSkeleton />;
  }

  const name = data?.profile?.full_name || user?.name || "User";

  return <UserDashboardOverview data={data} name={name} />;
}