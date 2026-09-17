import {
  CircleHelp,
  Lightbulb,
  UserRoundCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactForm } from "./ContactForm";

const TOPICS = [
  {
    number: "01",
    icon: CircleHelp,
    title: "Platform Questions",
    description:
      "Questions about using Blood on Click, finding blood resources, or understanding how the platform works.",
  },
  {
    number: "02",
    icon: UserRoundCheck,
    title: "Account & Donor Support",
    description:
      "Help related to donor profiles, registration, availability, or account-related questions.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Feedback & Suggestions",
    description:
      "Share ideas, suggestions, or feedback that could help improve the Blood on Click experience.",
  },
];

const CARD_DELAYS = [
  "motion-safe:[animation-delay:160ms]",
  "motion-safe:[animation-delay:240ms]",
  "motion-safe:[animation-delay:320ms]",
];

export function ContactInfoAndForm() {
  return (
    <section
      aria-labelledby="get-in-touch-heading"
      className="bg-gray-50 py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <div className="flex items-center gap-3 motion-safe:animate-fade-up">
              <span className="h-px w-8 bg-red-600" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Get in Touch
              </span>
            </div>

            <h2
              id="get-in-touch-heading"
              className="mt-5 text-3xl font-semibold tracking-tight motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-4xl"
            >
              How can we help?
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
              Reach out with questions about the platform, account-related
              concerns, feedback, or any general inquiry.
            </p>

            <ul className="mt-9 grid gap-4">
              {TOPICS.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <li
                    key={topic.number}
                    className={cn(
                      "flex items-start gap-4 rounded-2xl border border-border/70 bg-white p-5 shadow-sm shadow-black/[0.04] motion-safe:animate-fade-up",
                      CARD_DELAYS[index]
                    )}
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-semibold tracking-[0.2em] text-red-600/80">
                          {topic.number}
                        </span>
                        <h3 className="text-base font-semibold tracking-tight">
                          {topic.title}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {topic.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}