import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import {
  AlertTriangle, Building2, Check, CheckCircle, ChevronRight,
  Droplet, Loader2, MapPin, Search, User,
} from "lucide-react";
import { BLOOD_GROUPS, GROUP_COLORS, ROLES } from "@/config/constants";
import { searchBanks, searchDonors } from "@/features/seeker/api/seeker";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const URGENCY_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "emergency", label: "Emergency" },
];

const TRUST_POINTS = [
  "Blood-group based matching",
  "Location-based discovery",
  "Urgency-aware requests",
];

function BloodGroupSelector({ value, onChange, hasError }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-muted-foreground">
        Blood Group <span className="text-red-600">*</span>
      </label>
      <div
        role="radiogroup"
        aria-label="Blood group"
        aria-describedby={hasError ? "blood-group-error" : undefined}
        className="grid grid-cols-4 gap-2"
      >
        {BLOOD_GROUPS.map((group) => {
          const selected = value === group;
          return (
            <button
              key={group}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(group)}
              className={cn(
                "flex h-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors",
                selected
                  ? "border-red-600 bg-red-600 text-white ring-2 ring-red-600 ring-offset-1"
                  : "border-border text-foreground hover:border-red-300",
                !selected && GROUP_COLORS[group]
              )}
            >
              {selected ? <Check className="mr-1 size-3.5" /> : null}
              {group}
            </button>
          );
        })}
      </div>
      {hasError && (
        <p
          id="blood-group-error"
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-xs text-red-600"
        >
          <AlertTriangle className="size-3.5" />
          Select a blood group to continue.
        </p>
      )}
    </div>
  );
}

function UrgencySelector({ value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-muted-foreground">
        Urgency
      </label>
      <div
        role="radiogroup"
        aria-label="Urgency"
        className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1"
      >
        {URGENCY_OPTIONS.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                selected
                  ? option.value === "emergency"
                    ? "bg-white text-red-700 shadow-sm"
                    : "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.value === "emergency" && (
                <span
                  className={cn(
                    "mr-1.5 size-1.5 rounded-full",
                    selected ? "bg-red-600" : "bg-red-400"
                  )}
                  aria-hidden="true"
                />
              )}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SearchLoading() {
  return (
    <div className="space-y-2.5" aria-hidden="true">
      <div className="flex items-center gap-2 pb-1 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin text-red-600" />
        Searching available blood...
      </div>
      <div className="h-3 w-3/4 animate-pulse rounded bg-border/70 motion-reduce:animate-none" />
      <div className="h-3 w-full animate-pulse rounded bg-border/70 motion-reduce:animate-none" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-border/70 motion-reduce:animate-none" />
    </div>
  );
}

function noStockFor(bank, bloodGroup) {
  return bank.blood_stocks?.find((stock) => stock.blood_group === bloodGroup)?.quantity || 0;
}

export function EmergencyBloodSearch() {
  const { isAuthenticated, role } = useAuthStore();
  const navigate = useNavigate();

  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [validationError, setValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const isSeeker = isAuthenticated && role === ROLES.SEEKER;

  const results = useQueries({
    queries: [
      {
        queryKey: ["landing-donors", submitted?.bloodGroup, submitted?.location],
        queryFn: async () => {
          const params = { blood_group: submitted.bloodGroup };
          if (submitted.location) params.city = submitted.location;
          const res = await searchDonors(params);
          return res.data;
        },
        enabled: Boolean(submitted),
        retry: false,
      },
      {
        queryKey: ["landing-banks", submitted?.bloodGroup, submitted?.location],
        queryFn: async () => {
          const params = { blood_group: submitted.bloodGroup };
          if (submitted.location) params.city = submitted.location;
          const res = await searchBanks(params);
          return res.data;
        },
        enabled: Boolean(submitted),
        retry: false,
      },
    ],
  });

  const [donorResult, bankResult] = results;
  const isSearching = Boolean(submitted) && (donorResult.isPending || bankResult.isPending);
  const hasError = Boolean(submitted) && (donorResult.isError || bankResult.isError);

  const donors = donorResult?.data?.donors || [];
  const donorCount = donorResult?.data?.count;
  const banks = Array.isArray(bankResult?.data) ? bankResult.data : [];
  const totalOptions = (typeof donorCount === "number" ? donorCount : donors.length) + banks.length;

  const resetSearch = () => setSubmitted(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!bloodGroup) {
      setValidationError(true);
      return;
    }
    setValidationError(false);

    if (isSeeker) {
      setSubmitted({ bloodGroup, location: location.trim() });
      return;
    }

    if (isAuthenticated) {
      toast("Searching for blood is available on Seeker accounts.");
      return;
    }

    toast("Sign in as a Seeker to search for blood.");
    navigate("/login");
  };

  const handleRetry = () => {
    results[0].refetch();
    results[1].refetch();
  };

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -right-20 top-1/4 size-96 rounded-full bg-red-100/60 blur-3xl" />
        <div className="absolute -left-24 bottom-0 size-80 rounded-full bg-rose-100/50 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-red-600" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
              Fast blood discovery
            </span>
          </div>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Need blood for someone you care about?
          </h2>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Search available blood options and connect with the right donor or
            blood bank faster.
          </p>

          <ul className="mt-8 space-y-3">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-[15px] font-medium">
                <CheckCircle className="size-5 shrink-0 text-red-600" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:justify-self-end">
          <div className="w-full rounded-2xl border border-border/70 bg-white p-6 shadow-[0_24px_60px_-32px_rgba(190,18,60,0.35)] sm:p-7 lg:max-w-md">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Droplet className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">Find Blood</h3>
                <p className="text-sm text-muted-foreground">
                  Enter the blood requirement to get started.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">
                <BloodGroupSelector
                  value={bloodGroup}
                  onChange={(group) => {
                    setBloodGroup(group);
                    setValidationError(false);
                  }}
                  hasError={validationError}
                />

                <div>
                  <label htmlFor="blood-location" className="mb-2 block text-xs font-medium text-muted-foreground">
                    Location <span className="font-normal">(City / Area)</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id="blood-location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Lahore, Gulberg"
                      className="h-10 pl-9"
                      autoComplete="address-level2"
                    />
                  </div>
                </div>

                <UrgencySelector value={urgency} onChange={setUrgency} />

                <Button
                  type="submit"
                  size="lg"
                  className="h-11 w-full gap-2 bg-red-600 px-6 text-base text-white shadow-sm shadow-red-600/30 hover:bg-red-700"
                >
                  <Search className="size-4" />
                  Find Compatible Blood
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  {isSeeker
                    ? "Results appear below after you search."
                    : "Sign in as a Seeker to see available options."}
                </p>
              </div>
            </form>

            {submitted && (
              <div className="mt-5 border-t border-border/70 pt-5" aria-live="polite">
                {isSearching ? (
                  <SearchLoading />
                ) : hasError ? (
                  <div className="flex flex-col items-center gap-3 py-6 text-center">
                    <AlertTriangle className="size-8 text-red-300" />
                    <div>
                      <p className="text-sm font-medium">Something went wrong while searching.</p>
                      <p className="mt-1 text-xs text-muted-foreground">Please try again.</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleRetry}>
                      Retry
                    </Button>
                  </div>
                ) : totalOptions === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-6 text-center">
                    <Search className="size-8 text-gray-300" />
                    <p className="text-sm font-medium">No matching blood options found.</p>
                    <p className="text-xs text-muted-foreground">
                      Try another blood group or location.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle className="size-4 text-red-600" />
                      {totalOptions} compatible option{totalOptions === 1 ? "" : "s"} found
                      <span className="text-muted-foreground">
                        for <span className="font-semibold text-red-700">{submitted.bloodGroup}</span>
                        {submitted.location ? (
                          <>
                            {" "}in <span className="font-semibold">{submitted.location}</span>
                          </>
                        ) : null}
                      </span>
                    </div>

                    {donors.length > 0 && (
                      <div className="mt-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Nearby donors
                        </p>
                        <ul className="space-y-2">
                          {donors.slice(0, 3).map((donor) => (
                            <li
                              key={donor.id}
                              className="flex items-center gap-3 rounded-xl border border-border/70 bg-gray-50 px-3 py-2.5"
                            >
                              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-red-600 ring-1 ring-border/70">
                                <User className="size-4" />
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">{donor.full_name}</p>
                                <p className="truncate text-xs text-muted-foreground">
                                  {donor.address}
                                </p>
                              </div>
                              <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${GROUP_COLORS[donor.blood_group] || "bg-gray-100 text-gray-800"}`}>
                                {donor.blood_group}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {banks.length > 0 && (
                      <div className="mt-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Blood banks with stock
                        </p>
                        <ul className="space-y-2">
                          {banks.slice(0, 3).map((bank) => (
                            <li
                              key={bank.id}
                              className="flex items-center gap-3 rounded-xl border border-border/70 bg-gray-50 px-3 py-2.5"
                            >
                              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-red-600 ring-1 ring-border/70">
                                <Building2 className="size-4" />
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">{bank.bank_name}</p>
                                <p className="truncate text-xs text-muted-foreground">{bank.address}</p>
                              </div>
                              <span className="shrink-0 text-xs font-semibold text-green-700">
                                {noStockFor(bank, submitted.bloodGroup)} unit
                                {noStockFor(bank, submitted.bloodGroup) === 1 ? "" : "s"}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                      <Link
                        to="/seeker/search-donors"
                        className="inline-flex items-center gap-1 font-medium text-red-700 transition-colors hover:text-red-800"
                      >
                        All donors
                        <ChevronRight className="size-4" />
                      </Link>
                      <Link
                        to="/seeker/search-banks"
                        className="inline-flex items-center gap-1 font-medium text-red-700 transition-colors hover:text-red-800"
                      >
                        All banks
                        <ChevronRight className="size-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={resetSearch}
                        className="ml-auto text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Clear results
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}