import { Link } from "react-router-dom";
import { Droplet, ArrowRight, Building2 } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { GROUP_COLORS } from "@/config/constants";

function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

function RequestItem({ request }) {
  const dateLabel = request.requested_date ? formatDate(request.requested_date) : "—";
  const bankName = request.bank_name && request.bank_name !== "N/A" ? request.bank_name : "Direct donor request";

  return (
    <li className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex items-center gap-3 sm:w-36 sm:shrink-0">
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
            <span className="truncate">{bankName}</span>
          </p>
          {request.reason && (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{request.reason}</p>
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
    </li>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-gray-200 bg-white px-5 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-red-50">
        <Droplet className="size-6 text-red-600" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-gray-900">No active blood requests</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        When you need blood, create a request and matching donors and blood banks can respond.
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

export function UserBloodRequests({ data }) {
  const requests = data?.recent_requests || [];
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <section className="motion-safe:animate-fade-up [animation-delay:300ms]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-wide text-red-600">Blood Requests</p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900">
            Your blood requests
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            {pendingCount > 0
              ? `You have ${pendingCount} pending request${pendingCount > 1 ? "s" : ""}.`
              : "Recent requests you've submitted and their current status."}
          </p>
        </div>
        {requests.length > 0 && (
          <Link
            to="/user/requests"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-red-600 transition hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            View all requests
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        )}
      </div>

      <div className="mt-5">
        {requests.length > 0 ? (
          <ul className="space-y-3">
            {requests.map((request) => (
              <RequestItem key={request.id} request={request} />
            ))}
          </ul>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}