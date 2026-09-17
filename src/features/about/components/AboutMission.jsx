import {
  Building2,
  Droplet,
  Handshake,
  HeartHandshake,
  Search,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRINCIPLES = [
  {
    number: "01",
    icon: Search,
    title: "Easier Discovery",
    description:
      "Blood on Click gives people a central place to search for relevant blood resources by group and location.",
  },
  {
    number: "02",
    icon: Handshake,
    title: "Better Coordination",
    description:
      "The platform helps connect people looking for blood with relevant donors and blood banks they can follow up with.",
  },
  {
    number: "03",
    icon: Users,
    title: "Community Participation",
    description:
      "Donors and blood banks can contribute to a connected blood-support ecosystem, so help can reach those who need it.",
  },
];

const ECOSYSTEM_NODES = [
  { icon: HeartHandshake, label: "People in need" },
  { icon: Droplet, label: "Blood donors" },
  { icon: Building2, label: "Blood banks" },
];

const PRINCIPLE_DELAYS = [
  "motion-safe:[animation-delay:100ms]",
  "motion-safe:[animation-delay:200ms]",
  "motion-safe:[animation-delay:300ms]",
];

function MissionVisual() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-red-200 bg-white motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 -top-10 size-52 rounded-full bg-red-100/70 blur-3xl" />
        <div className="absolute -bottom-12 -right-8 size-48 rounded-full bg-rose-100/60 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative flex min-h-[17rem] flex-col items-center justify-center px-6 py-10 sm:min-h-[20rem]">
        <div className="relative flex flex-col items-center">
          <span className="absolute -inset-4 rounded-full border border-red-200" aria-hidden="true" />
          <span className="relative flex size-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30">
            <Droplet className="size-8" aria-hidden="true" />
          </span>
          <p className="mt-4 text-base font-semibold">One connected platform</p>
          <p className="text-xs text-muted-foreground">
            For everyone involved in blood support
          </p>
        </div>

        <span
          aria-hidden="true"
          className="mt-6 h-10 w-px border-l border-dashed border-red-300"
        />

        <div className="grid grid-cols-3 gap-3">
          {ECOSYSTEM_NODES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-white px-3 py-3.5 shadow-sm shadow-black/[0.04]"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="text-center text-[11px] font-medium leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutMission() {
  return (
    <section
      aria-labelledby="about-mission-heading"
      className="bg-gray-50 py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <MissionVisual />

          <div>
            <div className="flex items-center gap-3 motion-safe:animate-fade-up">
              <span className="h-px w-8 bg-red-600" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Our Mission
              </span>
            </div>

            <h2
              id="about-mission-heading"
              className="mt-5 text-3xl font-semibold tracking-tight motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-4xl"
            >
              Making blood discovery simpler
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
              Blood on Click exists to make it easier to find relevant blood
              resources and to coordinate between people who need blood, blood
              donors, and blood banks through one connected platform.
            </p>

            <ul className="mt-9 grid gap-4">
              {PRINCIPLES.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <li
                    key={principle.number}
                    className={cn(
                      "flex items-start gap-4 rounded-2xl border border-border/70 bg-white p-5 shadow-sm shadow-black/[0.04] motion-safe:animate-fade-up",
                      PRINCIPLE_DELAYS[index]
                    )}
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-semibold tracking-[0.2em] text-red-600/80">
                          {principle.number}
                        </span>
                        <h3 className="text-base font-semibold tracking-tight">
                          {principle.title}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {principle.description}
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