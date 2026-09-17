import { Link } from "react-router-dom";
import { Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactHeroVisual } from "./ContactHeroVisual";

export function ContactHero() {
  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -right-24 -top-24 size-[26rem] rounded-full bg-red-100/70 blur-3xl" />
        <div className="absolute -left-32 top-1/3 size-[22rem] rounded-full bg-rose-100/60 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pb-20 lg:pt-16">
        <div>
          <div className="flex items-center gap-3 motion-safe:animate-fade-up">
            <span className="h-px w-8 bg-red-600" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
              Contact Us
            </span>
          </div>

          <h1
            id="contact-hero-heading"
            className="mt-5 text-4xl font-semibold leading-[1.12] tracking-tight motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-5xl sm:leading-[1.08]"
          >
            We&rsquo;re here
            <br className="hidden sm:block" />
            <span className="text-red-600">to help</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
            Reach out to Blood on Click with any question, feedback, or
            platform-related inquiry. We&rsquo;re glad to hear from you.
          </p>

          <div className="mt-8 flex flex-col gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group h-11 w-full gap-2 border-red-300 bg-white/60 px-6 text-base text-red-700 hover:border-red-400 hover:bg-red-50 hover:text-red-800 sm:w-auto"
            >
              <Link to="/emergency">
                <Siren className="size-4 text-red-600" aria-hidden="true" />
                Emergency Blood Search
              </Link>
            </Button>
          </div>
        </div>

        <ContactHeroVisual />
      </div>
    </section>
  );
}