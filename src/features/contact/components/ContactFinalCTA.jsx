import { Link } from "react-router-dom";
import { Droplet, HeartHandshake, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactFinalCTA() {
  return (
    <section
      aria-labelledby="contact-final-cta-heading"
      className="relative overflow-hidden py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/70 blur-3xl" />
        <div className="absolute -right-24 top-0 size-72 rounded-full bg-rose-100/60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-red-200 bg-red-50/70 px-6 py-12 text-center shadow-[0_28px_70px_-32px_rgba(190,18,60,0.4)] motion-safe:animate-fade-up sm:px-12 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div className="absolute inset-0 [background-image:radial-gradient(rgba(190,18,60,0.08)_1px,transparent_1px)] [background-size:20px_20px]" />
            <Droplet className="absolute -right-6 -top-6 size-28 rotate-12 text-red-100" />
            <Droplet className="absolute -bottom-8 -left-8 size-32 -rotate-12 text-red-100/80" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-red-700 motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
              <Droplet className="size-3.5 text-red-600" aria-hidden="true" />
              Stay Connected
            </span>

            <h2
              id="contact-final-cta-heading"
              className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] sm:text-4xl"
            >
              We&rsquo;re here
              <br className="hidden sm:block" />
              <span className="text-red-600">when you need us</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:240ms] sm:text-lg">
              Whether you need help finding blood or want to support someone in
              need, Blood on Click gives you a place to start.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]">
              <Button
                asChild
                size="lg"
                className="group h-11 w-full gap-2 bg-red-600 px-6 text-base text-white shadow-sm shadow-red-600/30 hover:bg-red-700 sm:w-auto"
              >
                <Link to="/emergency">
                  Emergency Blood Search
                  <Search
                    className="size-4 transition-transform group-hover:scale-110"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 w-full gap-2 border-red-300 bg-white/60 px-6 text-base text-red-700 hover:border-red-400 hover:bg-red-50 hover:text-red-800 sm:w-auto"
              >
                <Link to="/register?role=donor">
                  <HeartHandshake className="size-4" aria-hidden="true" />
                  Become a Donor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}