import { UserStatusCard } from "@/features/user/components/dashboard/UserStatusCard";
import { UserSummaryCards } from "@/features/user/components/dashboard/UserSummaryCards";
import { UserQuickActions } from "@/features/user/components/dashboard/UserQuickActions";
import { UserAvailabilityEligibility } from "@/features/user/components/dashboard/UserAvailabilityEligibility";
import { UserDonationHistory } from "@/features/user/components/dashboard/UserDonationHistory";
import { UserBloodRequests } from "@/features/user/components/dashboard/UserBloodRequests";
import { UserNotifications } from "@/features/user/components/dashboard/UserNotifications";
import { UserProfileSnapshot } from "@/features/user/components/dashboard/UserProfileSnapshot";
import { UserFindBloodBanks } from "@/features/user/components/dashboard/UserFindBloodBanks";

export function UserDashboardOverview({ data, name }) {
  const profile = data?.profile;

  return (
    <div className="mx-auto max-w-6xl">
      <header className="motion-safe:animate-fade-up">
        <p className="text-sm font-medium tracking-wide text-red-600">User Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Good to see you, {name}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
          Here's a quick overview of your profile, blood requests, and donation activity.
        </p>
      </header>

      <div className="mt-8 space-y-8">
        <UserQuickActions />
        <UserStatusCard profile={profile} />
        <UserSummaryCards data={data} profile={profile} />
        <div className="grid gap-8 lg:grid-cols-2">
          <UserBloodRequests data={data} />
          <UserDonationHistory />
        </div>
        <UserAvailabilityEligibility data={data} />
        <UserNotifications />
        <UserProfileSnapshot profile={profile} />
        <UserFindBloodBanks />
      </div>
    </div>
  );
}