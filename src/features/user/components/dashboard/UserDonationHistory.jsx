import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Droplet, ArrowRight, FileText, MapPin, CircleAlert, RefreshCw } from "lucide-react";
import { getDonations } from "@/features/user/api/User";
import { StatusBadge } from "@/components/ui/status-badge";
import { GROUP_COLORS } from "@/config/constants";
import { UserDonationHistorySkeleton } from "@/features/user/components/dashboard/UserDonationHistorySkeleton";

function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function DonationItem({ donation }) {
  const hasNotes = Boolean(donation.notes);
  const hasReport = Boolean(donation.medical_report_url);
  const dateLabel =
    donation.donation_date_formatted ||
    (donation.donation_date ? formatDate(donation.donation_date) : "—");

  return (
    <li className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex items-center gap-3 sm:w-36 sm:shrink-0">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-50">
            <Droplet className="size-4 text-red-600" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">{dateLabel}</p>
            <p className="text-xs text-muted-foreground">Donation date</p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-900">{donation.bank_name}</p>
          {donation.bank_address && (
            <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
              <MapPin className="size-3 shrink-0" aria-hidden="true" />
              <span className="truncate">{donation.bank_address}</span>
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              GROUP_COLORS[donation.blood_group] || "bg-gray-100 text-gray-800"
            }`}
          >
            {donation.blood_group}
          </span>
          <span className="text-sm text-gray-600">
            {donation.quantity} unit{donation.quantity > 1 ? "s" : ""}
          </span>
        </div>

        <StatusBadge status={donation.status} />
      </div>

      {(hasNotes || hasReport) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-100 pt-3">
          {hasReport && (
            <a
              href={donation.medical_report_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-red-600 transition hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <FileText className="size-4" aria-hidden="true" />
              View report
            </a>
          )}
          {hasNotes && <p className="text-xs text-muted-foreground">{donation.notes}</p>}
        </div>
      )}
    </li>
  );
}

function UserDonationHistoryEmpty() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-gray-200 bg-white px-5 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-red-50">
        <Droplet className="size-6 text-red-600" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-gray-900">No donation history yet</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Your recorded donations will appear here once you make your first donation.
      </p>
      <Link
        to="/user/search-banks"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Find a blood bank to donate
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

function UserDonationHistoryError({ onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-red-50">
        <CircleAlert className="size-6 text-red-600" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-gray-900">We couldn't load your donation history</p>
      <p className="max-w-sm text-sm text-muted-foreground">Please try again in a moment.</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        <RefreshCw className="size-4" aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}

export function UserDonationHistory() {
  const { data: donations, isPending, isError, refetch } = useQuery({
    queryKey: ["user-donations"],
    queryFn: async () => {
      const res = await getDonations();
      return res.data;
    },
  });

  return (
    <section className="motion-safe:animate-fade-up [animation-delay:320ms]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-wide text-red-600">Donation Activity</p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900">
            Your donation history
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Every donation you've recorded with a blood bank, and its current status.
          </p>
        </div>
        <Link
          to="/user/donation-history"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-red-600 transition hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          View full history
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-5">
        {isPending ? (
          <UserDonationHistorySkeleton />
        ) : isError ? (
          <UserDonationHistoryError onRetry={() => refetch()} />
        ) : donations?.length > 0 ? (
          <ul className="space-y-3">
            {donations.map((donation) => (
              <DonationItem key={donation.id} donation={donation} />
            ))}
          </ul>
        ) : (
          <UserDonationHistoryEmpty />
        )}
      </div>
    </section>
  );
}