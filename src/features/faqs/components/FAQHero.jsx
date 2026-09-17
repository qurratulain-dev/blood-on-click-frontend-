import { CircleHelp } from "lucide-react";

export function FAQHero() {
  return (
    <section
      aria-labelledby="faq-hero-heading"
      className="relative overflow-hidden bg-white"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-0 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex flex-col items-center motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
            <span
              className="relative flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100"
              aria-hidden="true"
            >
              <CircleHelp className="size-7" />
              <span className="absolute inset-0 [background-image:radial-gradient(rgba(190,18,60,0.1)_1px,transparent_1px)] [background-size:14px_14px]" />
            </span>
            <span className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
              FAQs
            </span>
          </div>

          <h1
            id="faq-hero-heading"
            className="mt-5 text-4xl font-semibold leading-[1.12] tracking-tight motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] sm:text-5xl sm:leading-[1.08]"
          >
            Frequently asked questions
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
            Find answers to common questions about Blood on Click, blood
            searches, donor registration, and how the platform works.
          </p>
        </div>
      </div>
    </section>
  );
}