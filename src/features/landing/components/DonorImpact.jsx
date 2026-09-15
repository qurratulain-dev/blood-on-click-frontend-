import { Link } from "react-router-dom";
import {
  Bell,
  ClipboardList,
  Droplet,
  ShieldCheck,
  User,
} from "lucide-react";
import { GROUP_COLORS } from "@/config/constants";
import { Button } from "@/components/ui/button";

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Register",
    description: "Create your donor profile with your blood group and location.",
  },
  {
    number: "02",
    title: "Set availability",
    description: "Let the network know when you're available to donate.",
  },
  {
    number: "03",
    title: "Respond",
    description:
      "When a seeker finds you, coordinate directly to arrange the donation.",
  },
];

function AvailabilityDot() {
  return (
    <span className="relative flex size-1.5 shrink-0" aria-hidden="true">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" />
      <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
    </span>
  );
}

function DonorNetworkVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-white shadow-[0_28px_70px_-32px_rgba(190,18,60,0.4)]">
      <div className="relative aspect-[10/9] w-full">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-10 -top-10 size-56 rounded-full bg-red-100/80 blur-3xl" />
          <div className="absolute -bottom-12 right-0 size-48 rounded-full bg-rose-100/70 blur-3xl" />
        </div>

        <Droplet
          strokeWidth={0.75}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 size-[72%] -translate-x-1/2 -translate-y-1/2 text-red-600/15"
        />

        <svg
          className="absolute inset-0 h-full w-full text-red-400"
          viewBox="0 0 100 90"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="donor-request-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fca5a5" />
              <stop offset="1" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path
            d="M50 6 C 38 16, 38 30, 50 40"
            stroke="url(#donor-request-line)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="2.5 3.5"
          />
          <path
            d="M50 54 C 62 64, 62 76, 50 86"
            stroke="url(#donor-request-line)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="2.5 3.5"
          />
        </svg>

        <div className="absolute left-1/2 top-[4%] z-10 -translate-x-1/2">
          <div className="flex items-center gap-2.5 rounded-2xl border border-border/70 bg-white px-3 py-2.5 shadow-sm shadow-black/[0.05]">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <User className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-tight">Donor</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${GROUP_COLORS["O+"]}`}>
                  O+
                </span>
                <span className="flex items-center gap-1 truncate text-[11px] text-muted-foreground">
                  <AvailabilityDot />
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-[6%] top-[34%] z-10">
          <div className="flex items-center gap-2 rounded-full border border-border/70 bg-white px-3 py-1.5 shadow-sm shadow-black/[0.04]">
            <span className="relative flex size-4 items-center justify-center text-red-600" aria-hidden="true">
              <Bell className="size-4" />
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-red-500" />
            </span>
            <span className="text-[11px] font-medium text-foreground">
              Notified when needed
            </span>
          </div>
        </div>

        <div className="absolute left-1/2 top-[46%] z-10 -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="relative">
              <span
                className="absolute -inset-2 rounded-2xl bg-red-400/25 motion-safe:animate-ping motion-reduce:animate-none"
                aria-hidden="true"
              />
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30">
                <Droplet className="size-7" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold">Blood on Click</p>
            <p className="text-[11px] text-muted-foreground">Donor network</p>
          </div>
        </div>

        <div className="absolute bottom-[4%] left-1/2 z-10 -translate-x-1/2">
          <div className="flex items-center gap-2.5 rounded-2xl border border-border/70 bg-white px-3 py-2.5 shadow-sm shadow-black/[0.05]">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.05] text-foreground">
              <ClipboardList className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-tight">Blood request</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${GROUP_COLORS["A+"]}`}>
                  A+
                </span>
                <span className="truncate text-[11px] text-muted-foreground">
                  Group needed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DonorImpact() {
  return (
    <section
      id="become-a-donor"
      aria-labelledby="donor-impact-heading"
      className="relative overflow-hidden border-y border-border/60 bg-stone-50 py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -right-24 top-1/4 size-96 rounded-full bg-red-100/50 blur-3xl" />
        <div className="absolute -left-24 bottom-0 size-80 rounded-full bg-rose-100/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-16">
          <div className="lg:col-start-1 lg:row-start-1">
            <div className="mb-5 flex items-center gap-3 motion-safe:animate-fade-up">
              <span className="h-px w-8 bg-red-600" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Be the difference
              </span>
            </div>

            <h2
              id="donor-impact-heading"
              className="text-3xl font-semibold leading-tight tracking-tight motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              Your decision to donate can help someone get closer to{" "}
              <span className="text-red-600">the care they need.</span>
            </h2>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
              Join Blood on Click as a donor, keep your availability updated, and
              stay reachable when your blood group is needed.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[520px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
            <DonorNetworkVisual />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <ol className="grid gap-3 motion-safe:animate-fade-up">
              {JOURNEY_STEPS.map((step) => (
                <li
                  key={step.number}
                  className="group flex items-start gap-3.5 rounded-2xl border border-border/70 bg-white p-4 transition-[transform,border-color] duration-300 hover:border-red-200 motion-safe:group-hover:-translate-y-0.5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-xs font-bold text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
              <Button
                asChild
                size="lg"
                className="h-11 w-full gap-2 bg-red-600 px-6 text-base text-white shadow-sm shadow-red-600/30 hover:bg-red-700 sm:w-auto"
              >
                <Link to="/register?role=donor">
                  Become a Donor
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 w-full px-6 text-base sm:w-auto"
              >
                <Link to="/#how-it-works">Learn How It Works</Link>
              </Button>
            </div>

            <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground motion-safe:animate-fade-up">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-red-600" aria-hidden="true" />
              <span>
                Your donor profile is shared only with signed-in seekers searching
                for your blood group.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}