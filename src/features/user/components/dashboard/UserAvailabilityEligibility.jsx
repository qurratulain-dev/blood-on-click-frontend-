import { Link } from "react-router-dom";
import { Heart, CalendarCheck, ArrowRight } from "lucide-react";

const STATUS = {
  available: {
    label: "Available",
    dot: "bg-emerald-500",
    copy: "You're listed as available and may appear in blood donor searches.",
  },
  not_available: {
    label: "Not Available",
    dot: "bg-gray-400",
    copy: "You're marked unavailable, so you won't appear in blood donor searches.",
  },
  unknown: {
    label: "Unknown",
    dot: "bg-gray-300",
    copy: "Your current donor availability.",
  },
};

function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function UserAvailabilityEligibility({ data }) {
  const profile = data?.profile;
  const status = STATUS[profile?.status] ?? STATUS.unknown;
  const nextEligible = data?.next_eligible_date ?? null;

  return (
    <section className="motion-safe:animate-fade-up rounded-2xl border border-gray-200 bg-white p-5 shadow-sm [animation-delay:280ms] sm:p-6">
      <p className="text-sm font-medium tracking-wide text-red-600">Donation Availability</p>
      <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900">Your donation status</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        Here's where your availability and donation eligibility stand, based on your profile.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
              <Heart className="size-5 text-red-600" aria-hidden="true" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Current status</p>
          </div>
          <p className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <span
              aria-hidden="true"
              className={`inline-block size-2.5 shrink-0 rounded-full ${status.dot}`}
            />
            {status.label}
          </p>
          <p className="max-w-md text-sm text-muted-foreground">{status.copy}</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
              <CalendarCheck className="size-5 text-red-600" aria-hidden="true" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Next eligible donation</p>
          </div>
          {nextEligible ? (
            <>
              <p className="text-lg font-semibold text-gray-900">{formatDate(nextEligible)}</p>
              <p className="max-w-md text-sm text-muted-foreground">
                Based on your recorded donation history.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold text-gray-500">Eligibility date not available</p>
              <p className="max-w-md text-sm text-muted-foreground">
                Your eligibility date will appear here once a completed donation is recorded.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-5">
        <Link
          to="/user/edit-profile"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Update availability
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <p className="text-xs text-muted-foreground">
          Availability and profile details are managed on the profile page.
        </p>
      </div>
    </section>
  );
}