import { Link } from "react-router-dom";
import {
  Bell,
  Building2,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  Droplet,
  HandHeart,
  HeartPulse,
  Search,
  Users,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Request",
    icon: ClipboardList,
    description: "Submit a blood request with the group, units and location you need.",
    detail: "New requests start with a pending status.",
  },
  {
    number: "02",
    title: "Find",
    icon: Search,
    description: "Discover compatible available donors and blood banks with matching stock.",
    detail: "Search filters by blood group, city and urgency.",
  },
  {
    number: "03",
    title: "Connect",
    icon: Bell,
    description: "Coordinate with the chosen blood bank or a compatible donor.",
    detail: "Blood banks get request notifications; donors can be reached directly.",
  },
  {
    number: "04",
    title: "Fulfill",
    icon: HeartPulse,
    description: "A blood bank provides stock or a donor completes a verified donation.",
    detail: "Approvals update available stock in the network.",
  },
  {
    number: "05",
    title: "Complete",
    icon: CheckCircle,
    description: "Confirm fulfillment and close the request as completed.",
    detail: "Requests are marked fulfilled; donations are recorded as completed.",
  },
];

const ROLE_PATHS = [
  {
    icon: Droplet,
    title: "I Need Blood",
    description: "Search available donors and blood banks for the blood group you need.",
    to: "/seeker/search-donors",
    linkLabel: "Search donors",
  },
  {
    icon: HandHeart,
    title: "I Want to Donate",
    description: "Register as a donor, stay discoverable, and donate at a blood bank.",
    to: "/donor/search-banks",
    linkLabel: "Find a blood bank",
  },
  {
    icon: Building2,
    title: "I'm a Blood Bank",
    description: "Manage blood stock, review requests, and help fulfill local needs.",
    to: "/blood-bank/manage-stock",
    linkLabel: "Manage stock",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative overflow-hidden border-y border-border/60 bg-white py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center motion-safe:animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            How it works
          </span>
          <h2
            id="how-it-works-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            One platform. Three ways to make a difference.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Whether you need blood, want to donate, or manage blood inventory,
            Blood on Click keeps the process connected.
          </p>
        </div>

        {/* Workflow timeline */}
        <div className="relative mt-14 lg:mt-16 motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-4 lg:gap-y-0">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.number}
                  className="group relative flex items-start gap-4 sm:flex-col sm:items-center sm:text-center lg:items-center"
                >
                  <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-border/80 bg-white text-red-600 shadow-sm shadow-black/[0.04] transition-[transform,border-color,background-color] duration-300 group-hover:border-red-200 group-hover:bg-red-50 motion-safe:group-hover:-translate-y-0.5">
                    <Icon className="size-5" aria-hidden="true" />
                    <span
                      className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-foreground/[0.06] text-[10px] font-semibold text-foreground/50 ring-1 ring-border/80 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white"
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                  </span>
                  <div className="pt-0.5 lg:pt-5">
                    <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                    <p className="mt-2 text-xs font-medium leading-relaxed text-red-700/90 transition-colors duration-300 group-hover:text-red-700">
                      {step.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <span
            className="absolute bottom-4 left-[21px] top-[22px] w-px bg-border/70 sm:hidden"
            aria-hidden="true"
          />
          <span
            className="absolute left-3 right-3 top-[22px] hidden h-px bg-border/70 lg:block"
            aria-hidden="true"
          />
        </div>

        {/* Fulfillment paths */}
        <div className="mt-16 lg:mt-24 motion-safe:animate-fade-up">
          <div className="mx-auto max-w-xl rounded-2xl border border-border/60 bg-gray-50/60 px-4 py-8 sm:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Fulfillment paths
            </p>
            <div
              role="group"
              aria-label="A blood request can be fulfilled by a donor or by a blood bank"
              className="relative mx-auto mt-6 max-w-sm text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold">
                <ClipboardList className="size-4 text-red-600" aria-hidden="true" />
                Blood request
              </div>

              <div className="mx-auto h-5 w-px bg-border" aria-hidden="true" />

              <div className="flex items-start gap-3">
                <div className="flex-1 text-center">
                  <div className="mx-auto h-[17px] w-px bg-border" aria-hidden="true" />
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-medium">
                    <Users className="size-4 text-blue-600" aria-hidden="true" />
                    Donors
                  </div>
                </div>
                <div className="flex-1 text-center">
                  <div className="mx-auto h-[17px] w-px bg-border" aria-hidden="true" />
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-medium">
                    <Building2 className="size-4 text-green-600" aria-hidden="true" />
                    Blood banks
                  </div>
                </div>
              </div>

              <div className="relative" aria-hidden="true">
                <div className="absolute left-[25%] right-[25%] h-px bg-border" />
                <div className="mx-auto h-5 w-px bg-border" />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                <HeartPulse className="size-4 text-red-600" aria-hidden="true" />
                Fulfillment
              </div>
            </div>
            <p className="mx-auto mt-5 max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
              A request has no single fixed path. It can be fulfilled by a blood
              bank releasing stock, or by a donor after a verified donation.
            </p>
          </div>
        </div>

        {/* Role paths */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 motion-safe:animate-fade-up">
          {ROLE_PATHS.map(({ icon: Icon, title, description, to, linkLabel }) => (
            <article
              key={title}
              className="flex flex-col rounded-2xl border border-border/70 bg-white p-6 transition-colors duration-300 hover:border-red-200"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <Link
                to={to}
                className="group/link mt-4 inline-flex items-center gap-1 self-start rounded font-medium text-red-700 transition-colors hover:text-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40 focus-visible:ring-offset-2"
              >
                {linkLabel}
                <ChevronRight
                  className="size-4 transition-transform group-hover/link:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}