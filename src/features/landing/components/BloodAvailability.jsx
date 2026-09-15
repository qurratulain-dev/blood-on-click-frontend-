import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Building2,
  Check,
  ChevronRight,
  Droplet,
  MapPin,
  X,
} from "lucide-react";
import { BLOOD_GROUPS, GROUP_COLORS, ROLES } from "@/config/constants";
import { searchBanks } from "@/features/seeker/api/seeker";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Stock status thresholds mirror the backend logic in
// BloodBankController@dashboard: quantity < 10 is Critical,
// < 30 is Low, otherwise Adequate. A group with zero units
// across all banks is reported as Unavailable.
const STATUS = {
  UNAVAILABLE: { key: "unavailable", label: "Unavailable" },
  CRITICAL: { key: "critical", label: "Critical" },
  LOW: { key: "low", label: "Low" },
  ADEQUATE: { key: "adequate", label: "Adequate" },
};

function statusFor(quantity) {
  if (!quantity) return STATUS.UNAVAILABLE;
  if (quantity < 10) return STATUS.CRITICAL;
  if (quantity < 30) return STATUS.LOW;
  return STATUS.ADEQUATE;
}

function aggregateStock(banks) {
  const totals = Object.fromEntries(
    BLOOD_GROUPS.map((group) => [group, { quantity: 0, updatedAt: null }]),
  );
  for (const bank of Array.isArray(banks) ? banks : []) {
    for (const stock of bank.blood_stocks || []) {
      const total = totals[stock.blood_group];
      if (!total) continue;
      total.quantity += Number(stock.quantity) || 0;
      const ts = new Date(stock.updated_at);
      if (!Number.isNaN(ts.getTime()) && (!total.updatedAt || ts > total.updatedAt)) {
        total.updatedAt = ts;
      }
    }
  }
  return totals;
}

function freshnessLabel(updatedAt) {
  if (!updatedAt) return null;
  const minutes = Math.floor((Date.now() - updatedAt.getTime()) / 60000);
  if (minutes < 1) return "Updated just now";
  if (minutes < 60) return `Updated ${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Updated ${hours} hour${hours === 1 ? "" : "s"} ago`;
  return "Updated recently";
}

function stockGroupsWithQuantity(bank) {
  const quantities = new Map();
  for (const stock of bank.blood_stocks || []) {
    const qty = Number(stock.quantity) || 0;
    if (qty > 0) quantities.set(stock.blood_group, qty);
  }
  return BLOOD_GROUPS.filter((group) => quantities.has(group)).map((group) => ({
    group,
    quantity: quantities.get(group),
  }));
}

function StatusGlyph({ status }) {
  const styles = {
    adequate: "text-green-600",
    low: "text-amber-500",
    critical: "text-red-500",
    unavailable: "text-gray-400",
  };
  const Icon = status.key === "adequate" ? Check : status.key === "unavailable" ? X : AlertTriangle;
  return (
    <span className={cn("flex items-center gap-1 text-sm font-medium", styles[status.key])}>
      <Icon className="size-4" aria-hidden="true" />
      {status.label}
    </span>
  );
}

function SkeletonCard() {
  return (
    <li className="rounded-2xl border border-border/60 bg-white p-4 sm:p-5">
      <div className="size-11 animate-pulse rounded-xl bg-border/60 motion-reduce:animate-none" />
      <div className="mt-4 h-3 w-20 animate-pulse rounded bg-border/60 motion-reduce:animate-none" />
      <div className="mt-2 h-3 w-14 animate-pulse rounded bg-border/60 motion-reduce:animate-none" />
      <div className="mt-4 h-3 w-24 animate-pulse rounded bg-border/60 motion-reduce:animate-none" />
    </li>
  );
}

function SkeletonGrid() {
  return (
    <ul
      className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
      role="status"
    >
      <p className="sr-only">Loading blood availability</p>
      {BLOOD_GROUPS.map((group) => (
        <SkeletonCard key={group} />
      ))}
    </ul>
  );
}

function InfoPanel() {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className="mx-auto mt-12 max-w-2xl">
      <div className="rounded-2xl border border-dashed border-border bg-white/60 p-8 text-center sm:p-10">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <Droplet className="size-6" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight">Blood availability overview</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          See which blood groups are stocked across participating blood banks on Seeker accounts.
        </p>
        {!isAuthenticated && (
          <Button
            asChild
            className="mt-6 h-10 bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600"
          >
            <Link to="/login">Sign in to view availability</Link>
          </Button>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {BLOOD_GROUPS.map((group) => (
            <span
              key={group}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-semibold opacity-70",
                GROUP_COLORS[group],
              )}
            >
              {group}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyPanel() {
  return (
    <div className="mx-auto mt-12 max-w-xl">
      <div className="rounded-2xl border border-dashed border-border bg-white/60 p-8 text-center sm:p-10">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <Droplet className="size-6" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight">No blood availability data yet</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Availability will appear here as blood banks update their inventory.
        </p>
      </div>
    </div>
  );
}

function ErrorPanel({ onRetry }) {
  return (
    <div role="alert" className="mx-auto mt-12 max-w-xl">
      <div className="rounded-2xl border border-border bg-white p-8 text-center sm:p-10">
        <AlertTriangle className="mx-auto size-8 text-red-300" aria-hidden="true" />
        <h3 className="mt-4 text-lg font-semibold tracking-tight">Unable to load blood availability.</h3>
        <p className="mt-2 text-sm text-muted-foreground">Please try again.</p>
        <Button variant="outline" className="mt-6" onClick={onRetry}>
          Retry
        </Button>
      </div>
    </div>
  );
}

export function BloodAvailability() {
  const { isAuthenticated, role, loading: authLoading } = useAuthStore();
  const isSeeker = isAuthenticated && role === ROLES.SEEKER;

  const { data: banks, isPending, isError, refetch } = useQuery({
    queryKey: ["landing-blood-availability"],
    queryFn: async () => {
      const response = await searchBanks({});
      return response.data;
    },
    enabled: isSeeker,
    retry: false,
  });

  const totals = useMemo(() => aggregateStock(banks ?? []), [banks]);
  const latestUpdate = useMemo(
    () => BLOOD_GROUPS.reduce((latest, group) => {
      const updatedAt = totals[group].updatedAt;
      return updatedAt && (!latest || updatedAt > latest) ? updatedAt : latest;
    }, null),
    [totals],
  );
  const freshness = freshnessLabel(latestUpdate);

  const previewBanks = useMemo(() => {
    if (!Array.isArray(banks)) return [];
    return banks
      .filter((bank) => stockGroupsWithQuantity(bank).length > 0)
      .slice(0, 3);
  }, [banks]);

  const hasBanks = Array.isArray(banks) && banks.length > 0;

  let content;
  if (authLoading || (isSeeker && isPending)) {
    content = <SkeletonGrid />;
  } else if (isSeeker && isError) {
    content = <ErrorPanel onRetry={() => refetch()} />;
  } else if (isSeeker && !hasBanks) {
    content = <EmptyPanel />;
  } else if (isSeeker) {
    content = (
      <>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {BLOOD_GROUPS.map((group) => {
            const total = totals[group];
            const status = statusFor(total.quantity);
            return (
              <li
                key={group}
                className="flex flex-col rounded-2xl border border-border/70 bg-white p-4 shadow-sm shadow-black/[0.03] transition-colors hover:border-red-200 sm:p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-xl text-lg font-bold",
                      GROUP_COLORS[group],
                    )}
                  >
                    {group}
                  </span>
                  <StatusGlyph status={status} />
                </div>
                <p className="mt-4 text-sm font-medium text-foreground">{status.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {total.quantity} unit{total.quantity === 1 ? "" : "s"} in the network
                </p>
                <Link
                  to="/seeker/search-banks"
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-700 transition-colors hover:text-red-800"
                >
                  View blood banks
                  <ChevronRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {previewBanks.length > 0 && (
          <div className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Available nearby</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Blood banks in the network with current stock.
                </p>
              </div>
              <Link
                to="/seeker/search-banks"
                className="group inline-flex items-center gap-1 text-sm font-medium text-red-700 transition-colors hover:text-red-800"
              >
                View all blood banks
                <ChevronRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {previewBanks.map((bank) => (
                <li
                  key={bank.id}
                  className="flex flex-col rounded-2xl border border-border/70 bg-white p-4 shadow-sm shadow-black/[0.03]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <Building2 className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{bank.bank_name}</p>
                      <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                        <MapPin className="size-3 shrink-0" aria-hidden="true" />
                        {bank.address}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {stockGroupsWithQuantity(bank).map(({ group, quantity }) => (
                      <li
                        key={group}
                        className={cn(
                          "rounded-md px-1.5 py-0.5 text-[11px] font-semibold",
                          GROUP_COLORS[group],
                        )}
                      >
                        {group} {quantity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  } else {
    content = <InfoPanel />;
  }

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 lg:py-24">
      <div
        className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-red-100 opacity-60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-red-100 opacity-40 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            Network availability
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Blood availability at a glance
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore blood availability across participating blood banks.
          </p>
          {freshness && (
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-white px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-foreground/40" aria-hidden="true" />
              {freshness}
            </span>
          )}
        </div>
        {content}
      </div>
    </section>
  );
}