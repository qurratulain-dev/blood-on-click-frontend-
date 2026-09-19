import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";

const STATUS = {
  available: {
    label: "Available",
    dot: "bg-emerald-500",
    copy: "Your profile is included in blood donor searches.",
  },
  not_available: {
    label: "Not Available",
    dot: "bg-gray-400",
    copy: "Your profile is not appearing in blood donor searches right now.",
  },
  unknown: {
    label: "Unknown",
    dot: "bg-gray-300",
    copy: "Your current donor availability.",
  },
};

export function DonorStatusCard({ profile }) {
  const status = STATUS[profile?.status] ?? STATUS.unknown;

  return (
    <section className="motion-safe:animate-fade-up rounded-2xl border border-gray-200 bg-white p-5 shadow-sm [animation-delay:80ms] sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
            <Heart className="size-6 text-red-600" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-medium text-muted-foreground">Donor availability</h2>
            <p className="mt-1.5 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <span
                aria-hidden="true"
                className={`inline-block size-2.5 shrink-0 rounded-full ${status.dot}`}
              />
              {status.label}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{status.copy}</p>
          </div>
        </div>

        <Link
          to="/donor/edit-profile"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Manage Availability
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}