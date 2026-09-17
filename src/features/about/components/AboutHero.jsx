import { Link } from "react-router-dom";
import { HeartHandshake, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AboutHeroVisual } from "./AboutHeroVisual";

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
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
              About Blood on Click
            </span>
          </div>

          <h1
            id="about-hero-heading"
            className="mt-5 text-4xl font-semibold leading-[1.12] tracking-tight motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-5xl sm:leading-[1.08] lg:text-[3.1rem] lg:leading-[1.06]"
          >
            Connecting people
            <br className="hidden sm:block" />
            when <span className="text-red-600">blood is needed</span> most
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
            Blood on Click brings blood donors, people looking for blood, and
            blood banks together through one platform, so the right help can be
            found faster.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
            <Button
              asChild
              size="lg"
              className="group h-11 w-full gap-2 bg-red-600 px-6 text-base text-white shadow-sm shadow-red-600/30 hover:bg-red-700 sm:w-auto"
            >
              <Link to="/seeker/search-donors">
                Find Blood
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
              className="h-11 w-full gap-2 border-red-300 px-6 text-base text-red-700 hover:border-red-400 hover:bg-red-50 hover:text-red-800 sm:w-auto"
            >
              <Link to="/register?role=donor">
                <HeartHandshake className="size-4" aria-hidden="true" />
                Become a Donor
              </Link>
            </Button>
          </div>

          <p className="mt-7 max-w-lg text-sm leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]">
            Donors, blood banks, and communities come together here to make
            blood discovery and donation coordination more straightforward.
          </p>
        </div>

        <AboutHeroVisual />
      </div>
    </section>
  );
}