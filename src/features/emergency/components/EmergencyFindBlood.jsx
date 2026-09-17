import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle, Building2, Check, ChevronDown, MapPin, Search, UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BLOOD_GROUPS } from "@/config/constants";
import { cn } from "@/lib/utils";

const POPULAR_GROUPS = ["O+", "A+", "B+", "AB+"];

const SUPPORT_POINTS = [
  { icon: UserCheck, label: "Donor availability" },
  { icon: Building2, label: "Blood bank availability" },
  { icon: MapPin, label: "Location-based matching" },
];

export function EmergencyFindBlood() {
  const navigate = useNavigate();
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [hasError, setHasError] = useState(false);

  const selectGroup = (group) => {
    setBloodGroup(group);
    setHasError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!bloodGroup) {
      setHasError(true);
      return;
    }
    const params = new URLSearchParams({ blood_group: bloodGroup });
    if (location.trim()) params.set("city", location.trim());
    navigate(`/seeker/search-donors?${params.toString()}`);
  };

  return (
    <section
      id="find-blood"
      aria-labelledby="find-blood-heading"
      className="border-y border-border/60 bg-white py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center motion-safe:animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            Find Blood
          </span>
          <h2
            id="find-blood-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Find the blood you need
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Search for available blood by group and location, then connect with
            the donors and blood banks closest to you.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border/70 bg-white p-6 shadow-[0_24px_60px_-32px_rgba(190,18,60,0.35)] motion-safe:animate-fade-up motion-safe:[animation-delay:120ms] sm:p-8">
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="emergency-blood-group" className="mb-2 block text-xs font-medium text-muted-foreground">
                  Blood Group <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <select
                    id="emergency-blood-group"
                    value={bloodGroup}
                    onChange={(e) => selectGroup(e.target.value)}
                    required
                    aria-invalid={hasError ? "true" : undefined}
                    aria-describedby={hasError ? "blood-group-error" : undefined}
                    className={cn(
                      "h-11 w-full appearance-none rounded-lg border bg-white pl-3 pr-9 text-sm font-medium text-foreground transition-colors focus:outline-none focus:ring-2",
                      hasError
                        ? "border-red-500 ring-red-500/20"
                        : "border-input focus:border-red-500 focus:ring-red-600/20"
                    )}
                  >
                    <option value="">Select blood group</option>
                    {BLOOD_GROUPS.map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                {hasError && (
                  <p id="blood-group-error" role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
                    <AlertTriangle className="size-3.5" aria-hidden="true" />
                    Select a blood group to continue.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="emergency-location" className="mb-2 block text-xs font-medium text-muted-foreground">
                  Location <span className="font-normal">(City / Area)</span>
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="emergency-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city or area"
                    autoComplete="address-level2"
                    className="h-11 border-border pl-9 focus-visible:border-red-500 focus-visible:ring-3 focus-visible:ring-red-600/20"
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 flex justify-center sm:mt-5">
              <Button
                type="submit"
                size="lg"
                className="h-11 w-full gap-2 px-6 text-base text-white shadow-sm shadow-red-600/30 hover:bg-red-700 sm:w-auto"
              >
                <Search className="size-4" aria-hidden="true" />
                Find Blood
              </Button>
            </div>
          </form>

          <div className="mt-6 border-t border-border/60 pt-5">
            <p className="mb-2.5 text-xs font-medium text-muted-foreground">Popular blood groups</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_GROUPS.map((group) => {
                const selected = bloodGroup === group;
                return (
                  <button
                    key={group}
                    type="button"
                    onClick={() => selectGroup(group)}
                    aria-pressed={selected}
                    className={cn(
                      "inline-flex h-9 items-center gap-1.5 rounded-lg border px-4 text-sm font-semibold transition-colors",
                      selected
                        ? "border-red-600 bg-red-600 text-white shadow-sm shadow-red-600/20"
                        : "border-border bg-white text-muted-foreground hover:border-red-300 hover:text-foreground"
                    )}
                  >
                    {selected && <Check className="size-3.5" aria-hidden="true" />}
                    {group}
                  </button>
                );
              })}
            </div>
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-border/60 pt-5">
            {SUPPORT_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}