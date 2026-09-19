import { DonorStatusCard } from "@/features/donor/components/dashboard/DonorStatusCard";
import { DonorSummaryCards } from "@/features/donor/components/dashboard/DonorSummaryCards";
import { DonorQuickActions } from "@/features/donor/components/dashboard/DonorQuickActions";
import { DonorAvailabilityEligibility } from "@/features/donor/components/dashboard/DonorAvailabilityEligibility";
import { DonorDonationHistory } from "@/features/donor/components/dashboard/DonorDonationHistory";
import { DonorNotifications } from "@/features/donor/components/dashboard/DonorNotifications";
import { DonorProfileSnapshot } from "@/features/donor/components/dashboard/DonorProfileSnapshot";
import { DonorFindBloodBanks } from "@/features/donor/components/dashboard/DonorFindBloodBanks";

export function DonorDashboardOverview({ data, name }) {
  const profile = data?.profile;

  return (
    <div className="mx-auto max-w-6xl">
      <header className="motion-safe:animate-fade-up">
        <p className="text-sm font-medium tracking-wide text-red-600">Donor Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Good to see you, {name}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
          Here's a quick overview of your donor profile and availability.
        </p>
      </header>

      <div className="mt-8 space-y-8">
        <DonorStatusCard profile={profile} />
        <DonorSummaryCards data={data} profile={profile} />
        <DonorQuickActions />
        <DonorAvailabilityEligibility data={data} />
        <DonorDonationHistory />
        <DonorNotifications />
        <DonorProfileSnapshot profile={profile} />
        <DonorFindBloodBanks />
      </div>
    </div>
  );
}