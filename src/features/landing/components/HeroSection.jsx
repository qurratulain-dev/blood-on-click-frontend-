import { Link } from "react-router-dom";
import { ArrowRight, HeartPulse, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "./HeroVisual";

const trustIndicators = [
  { icon: ShieldCheck, label: "Verified profiles" },
  { icon: Zap, label: "Fast donor discovery" },
  { icon: HeartPulse, label: "Trusted blood coordination" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -right-24 -top-24 size-[26rem] rounded-full bg-red-100/70 blur-3xl" />
        <div className="absolute -left-32 top-1/3 size-[22rem] rounded-full bg-rose-100/60 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-24">
        <div>
          <div className="mb-5 flex items-center gap-3 motion-safe:animate-fade-up">
            <span className="h-px w-8 bg-red-600" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
              Blood coordination platform
            </span>
          </div>

          <h1 className="text-4xl font-semibold leading-[1.12] tracking-tight motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-5xl sm:leading-[1.08] lg:text-[3.4rem] lg:leading-[1.06]">
            Find the right blood.
            <br className="hidden sm:block" />
            <span className="text-red-600">When every second matters.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
            Connect with blood donors and blood banks faster through a trusted
            platform built for urgent blood needs.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
            <Button
              asChild
              size="lg"
              className="group h-11 w-full gap-2 bg-red-600 px-6 text-base text-white shadow-sm shadow-red-600/30 hover:bg-red-700 sm:w-auto"
            >
              <Link to="/login">
                Need Blood
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 w-full px-6 text-base sm:w-auto"
            >
              <Link to="/register">Become a Donor</Link>
            </Button>
          </div>

          <ul className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-border/70 pt-6 motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]">
            {trustIndicators.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="size-4 text-red-600" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}