import { Link } from "react-router-dom";
import {
  ClipboardList, HeartPulse, MapPin, Search, ShieldCheck, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmergencyHeroVisual } from "./EmergencyHeroVisual";

const ASSURANCE_POINTS = [
  { icon: ShieldCheck, label: "Verified donors & banks" },
  { icon: MapPin, label: "Matched to nearby supply" },
  { icon: Zap, label: "Fast urgent coordination" },
];

export function EmergencyHero() {
  return (
    <section
      aria-labelledby="emergency-hero-heading"
      className="relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -right-24 -top-24 size-[26rem] rounded-full bg-red-100/70 blur-3xl" />
        <div className="absolute -left-32 top-1/3 size-[22rem] rounded-full bg-rose-100/60 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-red-700 motion-safe:animate-fade-up">
            <HeartPulse className="size-3.5 text-red-600" aria-hidden="true" />
            Emergency blood assistance
          </span>

          <h1
            id="emergency-hero-heading"
            className="mt-5 text-4xl font-semibold leading-[1.12] tracking-tight motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-5xl sm:leading-[1.08] lg:text-[3.4rem] lg:leading-[1.06]"
          >
            Need blood
            <br className="hidden sm:block" />
            <span className="text-red-600">urgently?</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
            Blood on Click helps people find blood donors and blood banks when
            they need blood. Tell us what you need and get matched to the
            closest available help.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
            <Button
              asChild
              size="lg"
              className="group h-11 w-full gap-2 bg-red-600 px-6 text-base text-white shadow-sm shadow-red-600/30 hover:bg-red-700 sm:w-auto"
            >
              <Link to="/seeker/search-donors">
                Find Blood
                <Search className="size-4 transition-transform group-hover:scale-110" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 w-full gap-2 border-red-300 px-6 text-base text-red-700 hover:border-red-400 hover:bg-red-50 hover:text-red-800 sm:w-auto"
            >
              <Link to="/seeker/search-banks">
                <ClipboardList className="size-4" aria-hidden="true" />
                Request Blood
              </Link>
            </Button>
          </div>

          <ul className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-border/70 pt-6 motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]">
            {ASSURANCE_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="size-4 text-red-600" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <EmergencyHeroVisual />
      </div>
    </section>
  );
}