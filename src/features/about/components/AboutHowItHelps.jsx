import {
  Building2,
  Droplet,
  HeartHandshake,
  UserRoundSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PARTICIPANTS = [
  {
    number: "01",
    icon: UserRoundSearch,
    title: "People looking for blood",
    description:
      "People can use the platform to search for relevant blood resources and submit blood requests through the available application flow.",
  },
  {
    number: "02",
    icon: HeartHandshake,
    title: "Blood donors",
    description:
      "Donors can create a profile, provide their blood information and availability, and participate in the platform's donor network.",
  },
  {
    number: "03",
    icon: Building2,
    title: "Blood banks",
    description:
      "Blood banks can have a dedicated presence on the platform and provide relevant blood-stock and resource information where supported by the application.",
  },
];

const ECOSYSTEM_NODES = [
  { icon: UserRoundSearch, label: "People looking for blood", className: "sm:-ml-14 lg:ml-0" },
  { icon: HeartHandshake, label: "Blood donors", className: "sm:-mr-2 lg:mr-0" },
  { icon: Building2, label: "Blood banks", className: "sm:-ml-2 lg:ml-0" },
];

const CARD_DELAYS = [
  "motion-safe:[animation-delay:120ms]",
  "motion-safe:[animation-delay:220ms]",
  "motion-safe:[animation-delay:320ms]",
];

function EcosystemVisual() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-red-200 bg-white motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-10 -top-10 size-52 rounded-full bg-red-100/70 blur-3xl" />
        <div className="absolute -bottom-12 -left-8 size-48 rounded-full bg-rose-100/60 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex flex-col items-center">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30">
            <Droplet className="size-8" aria-hidden="true" />
          </span>
          <p className="mt-4 text-sm font-semibold">Blood on Click</p>
          <p className="text-xs text-muted-foreground">
            One connected platform
          </p>
        </div>

        <div className="relative mt-6 hidden items-start justify-between sm:flex">
          <span
            className="absolute left-[18%] right-[18%] top-[46px] border-t border-dashed border-red-300"
            aria-hidden="true"
          />
          {ECOSYSTEM_NODES.slice(0, 2).map(({ icon: Icon, label }, index) => (
            <div
              key={label}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-white px-5 py-4 shadow-sm shadow-black/[0.04]",
                ECOSYSTEM_NODES[index].className
              )}
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="whitespace-nowrap text-center text-xs font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="relative mt-4 hidden flex-col items-center sm:flex">
          <span
            className="border-l border-dashed border-red-300"
            style={{ height: "2.5rem" }}
            aria-hidden="true"
          />
          {ECOSYSTEM_NODES.slice(2, 3).map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-white px-5 py-4 shadow-sm shadow-black/[0.04]"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="whitespace-nowrap text-center text-xs font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:hidden" aria-hidden="true">
          {ECOSYSTEM_NODES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-2.5 rounded-2xl border border-border/70 bg-white px-4 py-3 shadow-sm shadow-black/[0.04]"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutHowItHelps() {
  return (
    <section
      aria-labelledby="about-how-it-helps-heading"
      className="bg-gray-50 py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center motion-safe:animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            How It Helps
          </span>
          <h2
            id="about-how-it-helps-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            One platform, three ways to connect
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Blood on Click provides different experiences for people looking
            for blood, blood donors, and blood banks.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <EcosystemVisual />
        </div>

        <ul className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-3 lg:gap-6">
          {PARTICIPANTS.map((participant, index) => {
            const Icon = participant.icon;
            return (
              <li
                key={participant.number}
                className={cn(
                  "flex flex-col rounded-2xl border border-border/70 bg-white p-6 shadow-sm shadow-black/[0.04] motion-safe:animate-fade-up sm:p-7",
                  CARD_DELAYS[index]
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold tracking-[0.2em] text-red-600/80">
                    {participant.number}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {participant.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {participant.description}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-10 flex max-w-md items-center justify-center motion-safe:animate-fade-up motion-safe:[animation-delay:360ms]">
          {["Discover", "Connect", "Coordinate"].map((step, index) => (
            <div key={step} className="flex items-center">
              {index > 0 && (
                <span className="mx-3 h-px w-6 bg-red-300 sm:mx-4" aria-hidden="true" />
              )}
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-red-50 text-[10px] font-bold text-red-600">
                  {index + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {step}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}