import { ClipboardList, Droplet, HeartPulse, Hospital, Info, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const INFO_CARDS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Know the required blood group",
    description:
      "Have the required blood group and relevant request details available before you search.",
  },
  {
    number: "02",
    icon: MapPin,
    title: "Provide accurate information",
    description:
      "Accurate location and request information helps you identify the relevant donors or blood banks.",
  },
  {
    number: "03",
    icon: Hospital,
    title: "Follow up with the resource",
    description:
      "Once you identify a relevant donor or blood bank, coordinate directly through the platform's contact or request process.",
  },
];

const CARD_DELAYS = [
  "motion-safe:[animation-delay:150ms]",
  "motion-safe:[animation-delay:250ms]",
  "motion-safe:[animation-delay:350ms]",
];

export function EmergencyInformation() {
  return (
    <section
      aria-labelledby="emergency-info-heading"
      className="border-y border-border/60 bg-white py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center motion-safe:animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            Emergency Information
          </span>
          <h2
            id="emergency-info-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            What to do when blood is needed
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Use Blood on Click to search for relevant blood availability and
            coordinate with donors or blood banks.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-red-200 bg-red-50/70 p-6 motion-safe:animate-fade-up motion-safe:[animation-delay:100ms] sm:p-8">
            <Droplet
              className="pointer-events-none absolute -right-6 -top-6 size-32 rotate-12 text-red-100"
              aria-hidden="true"
            />
            <div className="relative">
              <span className="flex size-11 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm shadow-black/[0.04] ring-1 ring-red-100">
                <HeartPulse className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                Start with the essentials
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Start with the required blood group and a clear idea of the
                location, then use the platform to explore the available
                options.
              </p>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-white p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <Info className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">For urgent situations</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Use the Emergency search to quickly check relevant blood
                    availability. For medical emergencies, contact the
                    appropriate emergency medical service or healthcare provider.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {INFO_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.number}
                  className={cn(
                    "rounded-2xl border border-border/70 bg-white p-5 shadow-sm shadow-black/[0.04] motion-safe:animate-fade-up sm:p-6",
                    CARD_DELAYS[index]
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold tracking-[0.2em] text-red-600/80">
                      {card.number}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}