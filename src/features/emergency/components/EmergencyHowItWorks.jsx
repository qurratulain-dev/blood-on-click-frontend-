import { HandHeart, Search, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Search for blood",
    description:
      "Select the blood group and location you need to find relevant blood availability near you.",
  },
  {
    number: "02",
    icon: Users,
    title: "Connect with donors",
    description:
      "Discover relevant donors or blood banks based on what is available on the platform.",
  },
  {
    number: "03",
    icon: HandHeart,
    title: "Get the help you need",
    description:
      "Follow up with the donor or blood bank you connected with and take your blood request forward.",
  },
];

const STEP_DELAYS = [
  "motion-safe:[animation-delay:100ms]",
  "motion-safe:[animation-delay:200ms]",
  "motion-safe:[animation-delay:300ms]",
];

export function EmergencyHowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="bg-gray-50 py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center motion-safe:animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            How It Works
          </span>
          <h2
            id="how-it-works-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Getting help starts with three simple steps
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Blood on Click makes it easier to find and connect with the blood
            resources available near you.
          </p>
        </div>

        <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-16 right-16 top-[86px] hidden border-t border-dashed border-border/80 lg:block"
          />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.number}
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border border-border/70 bg-white p-6 shadow-sm shadow-black/[0.04] motion-safe:animate-fade-up sm:p-7",
                  STEP_DELAYS[index],
                  index === 2 && "sm:col-span-2 lg:col-span-1"
                )}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                  Step {step.number}
                </span>
                <span className="mt-4 flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}