import { Building2, Droplet, HeartPulse, User } from "lucide-react";
import { GROUP_COLORS } from "@/config/constants";

function InfoChip({ icon: Icon, iconClass, title, subtitle, chip, className }) {
  return (
    <div className={`absolute z-10 flex items-center gap-2.5 rounded-2xl border border-border/70 bg-white px-3 py-2.5 shadow-sm shadow-black/[0.05] ${className}`}>
      <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium leading-tight">{title}</p>
        <div className="mt-1 flex items-center gap-1.5">
          {chip && (
            <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${GROUP_COLORS[chip] || "bg-gray-100 text-gray-800"}`}>
              {chip}
            </span>
          )}
          <span className="truncate text-[11px] text-muted-foreground">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}

export function EmergencyHeroVisual() {
  return (
    <div className="mx-auto w-full max-w-[520px] motion-safe:animate-fade-up motion-safe:[animation-delay:280ms]">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-10 top-6 size-52 rounded-full bg-red-100/80 blur-3xl" />
          <div className="absolute -bottom-8 right-0 size-56 rounded-full bg-rose-100/70 blur-3xl" />
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-white shadow-[0_28px_70px_-32px_rgba(190,18,60,0.4)]">
          <div className="relative aspect-[10/9] w-full">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute inset-0 [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:18px_18px]" />
              <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-50" />
            </div>

            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex flex-col items-center">
                <div className="relative">
                  <span className="absolute -inset-3 rounded-full border border-red-200" aria-hidden="true" />
                  <span className="absolute -inset-6 rounded-full border border-red-100" aria-hidden="true" />
                  <span className="relative flex size-20 items-center justify-center rounded-[1.75rem] bg-red-600 text-white shadow-lg shadow-red-600/30">
                    <Droplet className="size-10" />
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold">Emergency matching</p>
                <p className="text-[11px] text-muted-foreground">Verified donors and stocked banks near you</p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                  <HeartPulse className="size-3" aria-hidden="true" />
                  Live coordination
                </span>
              </div>
            </div>

            <InfoChip
              icon={User}
              iconClass="bg-red-600 text-white"
              title="Compatible donor"
              subtitle="Matched nearby"
              chip="O-"
              className="left-[4%] top-[6%]"
            />
            <InfoChip
              icon={Building2}
              iconClass="bg-foreground text-background"
              title="Blood bank"
              subtitle="Stock available"
              chip="A+"
              className="bottom-[6%] right-[4%]"
            />

            <Droplet className="absolute bottom-[24%] left-[7%] size-4 rotate-12 text-red-200" aria-hidden="true" />
            <Droplet className="absolute right-[9%] top-[16%] size-3 -rotate-6 text-red-200" aria-hidden="true" />
            <Droplet className="absolute bottom-[9%] right-[24%] size-2.5 text-rose-200" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}