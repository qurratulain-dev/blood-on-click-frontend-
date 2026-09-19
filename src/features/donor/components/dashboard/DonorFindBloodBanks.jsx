import { Link } from "react-router-dom";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";

const CAPABILITIES = [
  "Search active blood banks by name or location",
  "Check stock availability for your blood group",
  "Contact a bank or get directions",
];

export function DonorFindBloodBanks() {
  return (
    <section className="motion-safe:animate-fade-up [animation-delay:440ms]">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
              <Building2 className="size-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium tracking-wide text-red-600">Blood Banks</p>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900">
                Find a blood bank
              </h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Explore active blood banks and check stock availability for your blood group
                through the existing Search Blood Banks page.
              </p>
            </div>
          </div>

          <Link
            to="/donor/search-banks"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Find blood banks
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="border-t border-gray-100 px-5 py-4 sm:px-6">
          {CAPABILITIES.map((capability) => (
            <li key={capability} className="flex items-center gap-2 py-1 text-sm text-gray-700">
              <CheckCircle2 className="size-4 shrink-0 text-red-600" aria-hidden="true" />
              {capability}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}