import { Link } from "react-router-dom";
import { Droplet, HeartHandshake, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmergencyFinalCTA() {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-0 size-[30rem] -translate-x-1/2 rounded-full bg-red-100/70 blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-72 rounded-full bg-rose-100/60 blur-3xl" />
        <div className="absolute -left-24 bottom-1/4 size-64 rounded-full bg-red-50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-red-600 px-6 py-14 text-center shadow-[0_28px_70px_-32px_rgba(190,18,60,0.55)] motion-safe:animate-fade-up sm:px-12 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-16 -top-20 size-72 rounded-full bg-red-500/50 blur-3xl" />
            <div className="absolute -bottom-28 -right-20 size-80 rounded-full bg-rose-500/40 blur-3xl" />
            <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:22px_22px]" />
            <Droplet className="absolute left-[8%] top-[16%] size-6 rotate-12 text-white/15" />
            <Droplet className="absolute right-[10%] top-[24%] size-8 -rotate-6 text-white/10" />
            <Droplet className="absolute bottom-[14%] left-[18%] size-4 text-white/10" />
            <Droplet className="absolute bottom-[22%] right-[16%] size-5 rotate-45 text-white/15" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
              <Droplet className="size-3.5 text-white/90" aria-hidden="true" />
              Need Help?
            </span>

            <h2
              id="final-cta-heading"
              className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]"
            >
              Start your blood search today
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-red-100 sm:text-lg motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
              Search for relevant blood availability near you, or join as a
              donor so you can help when someone in your community needs it.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]">
              <Button
                asChild
                size="lg"
                className="group h-11 w-full gap-2 bg-white px-6 text-base text-red-700 shadow-sm shadow-red-900/20 hover:bg-red-50 hover:text-red-800 sm:w-auto"
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
                className="h-11 w-full gap-2 border-white/40 bg-transparent px-6 text-base text-white hover:border-white/60 hover:bg-white/10 hover:text-white sm:w-auto"
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