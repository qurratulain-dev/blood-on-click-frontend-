import { Link } from "react-router-dom";
import {
  ArrowRight,
  CircleHelp,
  Droplet,
  HeartHandshake,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SUPPORT_CARDS = [
  {
    number: "01",
    icon: CircleHelp,
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about Blood on Click and how the platform works.",
    ctaLabel: "View FAQs",
    to: "/faqs",
  },
  {
    number: "02",
    icon: Droplet,
    title: "Looking for Blood?",
    description:
      "Start a blood search and explore available donor resources using the existing search flow.",
    ctaLabel: "Find Blood",
    to: "/seeker/search-donors",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Want to Become a Donor?",
    description:
      "Create a donor account and become part of the Blood on Click donor community.",
    ctaLabel: "Become a Donor",
    to: "/register?role=donor",
  },
];

const CARD_DELAYS = [
  "motion-safe:[animation-delay:160ms]",
  "motion-safe:[animation-delay:240ms]",
  "motion-safe:[animation-delay:320ms]",
];

export function ContactHelpSupport() {
  return (
    <section
      aria-labelledby="help-support-heading"
      className="bg-white py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center motion-safe:animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
            Help &amp; Support
          </span>
          <h2
            id="help-support-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Need help with something?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Find a useful starting point for common questions, blood searches,
            and getting involved with Blood on Click.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SUPPORT_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <article
                key={card.number}
                className={cn(
                  "flex h-full flex-col rounded-2xl border border-border/70 bg-white p-6 shadow-sm shadow-black/[0.04] motion-safe:animate-fade-up sm:p-7",
                  CARD_DELAYS[index]
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold tracking-[0.2em] text-red-600/80">
                    {card.number}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>

                <div className="mt-auto pt-6">
                  <Link
                    to={card.to}
                    className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-600/20"
                  >
                    {card.ctaLabel}
                    <ArrowRight
                      className="size-4 transition-transform group-hover/link:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}