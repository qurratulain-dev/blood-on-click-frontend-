import {
  Building2,
  Compass,
  Droplet,
  HeartPulse,
  Hospital,
  Link2,
  Phone,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CHALLENGES = [
  {
    number: "01",
    icon: Compass,
    title: "Information can be spread across different sources",
    description:
      "People may need to search through different channels when looking for relevant blood availability.",
  },
  {
    number: "02",
    icon: Link2,
    title: "Coordination matters when time is important",
    description:
      "Identifying the right donor or blood bank is only part of the process; users may also need to coordinate with the relevant resource.",
  },
  {
    number: "03",
    icon: Phone,
    title: "It is not always clear where to begin",
    description:
      "A centralized starting point can make the discovery process easier to navigate.",
  },
];

const SOURCES = [
  { icon: Droplet, label: "Blood Donor" },
  { icon: Building2, label: "Blood Bank" },
  { icon: Hospital, label: "Hospital" },
  { icon: Users, label: "Personal Contacts" },
];

const CHALLENGE_DELAYS = [
  "motion-safe:[animation-delay:120ms]",
  "motion-safe:[animation-delay:220ms]",
  "motion-safe:[animation-delay:320ms]",
];

function ChallengeVisual() {
  return (
    <div className="relative motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-white shadow-sm shadow-black/[0.04]">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute inset-0 [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:18px_18px]" />
        </div>

        <div className="relative px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Many separate resources
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SOURCES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-white px-2 py-3.5 shadow-sm shadow-black/[0.04]"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-gray-100 text-muted-foreground">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-center text-[11px] font-medium leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="relative my-4 flex h-8 items-center justify-center" aria-hidden="true">
            <span className="absolute left-1/2 top-0 h-full w-px border-l border-dashed border-red-300" />
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-red-400"
                style={{ left: `${22 + i * 28}%` }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30">
              <Droplet className="size-6" aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-semibold">Blood on Click</p>
            <p className="text-[11px] text-muted-foreground">
              One connected starting point
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50/70 p-4">
        <HeartPulse
          className="mt-0.5 size-4 shrink-0 text-red-600"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed text-muted-foreground">
          One place to start can make the search easier.
        </p>
      </div>
    </div>
  );
}

export function AboutChallenge() {
  return (
    <section
      aria-labelledby="about-challenge-heading"
      className="bg-white py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <ChallengeVisual />

          <div>
            <div className="flex items-center gap-3 motion-safe:animate-fade-up">
              <span className="h-px w-8 bg-red-600" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                The Challenge
              </span>
            </div>

            <h2
              id="about-challenge-heading"
              className="mt-5 text-3xl font-semibold tracking-tight motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-4xl"
            >
              Finding the right blood resource can be difficult
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
              During a blood requirement, people may need to search across
              different sources and coordinate with donors or blood banks to
              move a request forward.
            </p>

            <ul className="mt-9 grid gap-4">
              {CHALLENGES.map((challenge, index) => {
                const Icon = challenge.icon;
                return (
                  <li
                    key={challenge.number}
                    className={cn(
                      "flex items-start gap-4 rounded-2xl border border-border/70 bg-white p-5 shadow-sm shadow-black/[0.04] motion-safe:animate-fade-up",
                      CHALLENGE_DELAYS[index]
                    )}
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-semibold tracking-[0.2em] text-red-600/80">
                          {challenge.number}
                        </span>
                        <h3 className="text-base font-semibold tracking-tight">
                          {challenge.title}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {challenge.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}