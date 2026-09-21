import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Droplet, ArrowRight, MapPin, CircleAlert, RefreshCw, Building2, Clock } from "lucide-react";
import { getRequests } from "@/features/user/api/User";
import { StatusBadge } from "@/components/ui/status-badge";
import { GROUP_COLORS } from "@/config/constants";

function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function RequestItem({ request }) {
  const dateLabel = request.requested_date ? formatDate(request.requested_date) : "—";
  const bank = request.bank;
  const hasReason = Boolean(request.reason);

  return (
    <li className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex items-center gap-3 sm:w-40 sm:shrink-0">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-50">
            <Droplet className="size-4 text-red-600" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">{dateLabel}</p>
            <p className="text-xs text-muted-foreground">Requested on</p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-gray-900">
            <Building2 className="size-3.5 shrink-0 text-gray-400" aria-hidden="true" />
            <span className="truncate">{bank?.bank_name || "Direct donor request"}</span>
          </p>
          {bank?.address && (
            <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
              <MapPin className="size-3 shrink-0" aria-hidden="true" />
              <span className="truncate">{bank.address}</span>
            </p>
          )}
          {(request.hospital_name || request.patient_name) && (
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              {request.patient_name && <span>Patient: {request.patient_name}</span>}
              {request.patient_age && <span>· {request.patient_age} yrs</span>}
              {request.hospital_name && <span>· {request.hospital_name}</span>}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              GROUP_COLORS[request.blood_group] || "bg-gray-100 text-gray-800"
            }`}
          >
            {request.blood_group}
          </span>
          <span className="text-sm text-gray-600">
            {request.quantity} unit{request.quantity > 1 ? "s" : ""}
          </span>
          {request.urgency === "emergency" && (
            <span className="inline-block rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
              Emergency
            </span>
          )}
        </div>

        <StatusBadge status={request.status} />
      </div>

      {hasReason && (
        <div className="mt-3 flex items-start gap-1.5 border-t border-gray-100 pt-3">
          <Clock className="mt-0.5 size-3.5 shrink-0 text-gray-400" aria-hidden="true" />
          <p className="text-xs text-muted-foreground">{request.reason}</p>
        </div>
      )}
    </li>
  );
}

function MyBloodRequestsEmpty() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-gray-200 bg-white px-5 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-red-50">
        <Droplet className="size-6 text-red-600" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-gray-900">No blood requests yet</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        When you need blood, you can request it from a blood bank or a matching donor.
      </p>
      <Link
        to="/user/request-blood"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Request blood
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

function MyBloodRequestsError({ onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-red-50">
        <CircleAlert className="size-6 text-red-600" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-gray-900">We couldn't load your blood requests</p>
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

export function BloodRequests() {
  const { data: requests, isPending, isError, refetch } = useQuery({
    queryKey: ["user-requests"],
    queryFn: async () => {
      const res = await getRequests();
      return res.data;
    },
  });

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-medium tracking-wide text-red-600">My Blood Requests</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Your blood requests</h2>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Every blood request you've submitted and its current status.
        </p>
      </div>
      <hr className="mb-6" />

      {isPending ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="size-8 animate-spin text-red-600" aria-hidden="true" />
        </div>
      ) : isError ? (
        <MyBloodRequestsError onRetry={() => refetch()} />
      ) : requests?.length > 0 ? (
        <ul className="space-y-3">
          {requests.map((request) => (
            <RequestItem key={request.id} request={request} />
          ))}
        </ul>
      ) : (
        <MyBloodRequestsEmpty />
      )}
    </section>
  );
}