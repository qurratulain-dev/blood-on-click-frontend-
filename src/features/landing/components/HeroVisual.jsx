import { Droplet, Hospital, User } from "lucide-react";
import { GROUP_COLORS } from "@/config/constants";

function NetworkNode({ icon: Icon, badgeClass, title, subtitle, chip, className }) {
  return (
    <div
      className={`z-10 flex items-center gap-2.5 rounded-2xl border border-border/70 bg-white px-3 py-2.5 shadow-sm shadow-black/[0.05] ${className}`}
    >
      <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${badgeClass}`}>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium leading-tight">{title}</p>
        <div className="mt-1 flex items-center gap-1.5">
          {chip && (
            <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${GROUP_COLORS[chip]}`}>
              {chip}
            </span>
          )}
          <span className="truncate text-[11px] text-muted-foreground">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="mx-auto w-full max-w-[520px] motion-safe:animate-fade-up motion-safe:[animation-delay:280ms]">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-white shadow-[0_28px_70px_-32px_rgba(190,18,60,0.4)]">
        <div className="relative aspect-[10/9] w-full">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-10 -top-10 size-56 rounded-full bg-red-100/80 blur-3xl" />
            <div className="absolute -bottom-12 right-0 size-48 rounded-full bg-rose-100/70 blur-3xl" />
            <div className="absolute inset-0 [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:18px_18px]" />
          </div>

          <svg
            className="absolute inset-0 h-full w-full text-red-400"
            viewBox="0 0 100 90"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="blood-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fca5a5" />
                <stop offset="1" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <path
              d="M16 11 C 28 22, 39 33, 50 45"
              stroke="url(#blood-line)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="2.5 3.5"
            />
            <path
              d="M50 45 C 61 57, 71 67, 84 79"
              stroke="url(#blood-line)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="2.5 3.5"
            />
          </svg>

          <NetworkNode
            icon={User}
            badgeClass="bg-red-600 text-white"
            title="Verified Donor"
            subtitle="On the network"
            chip="O+"
            className="absolute left-[3%] top-[4%]"
          />

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex flex-col items-center">
              <div className="relative">
                <span
                  className="absolute -inset-2 rounded-2xl bg-red-400/25 motion-safe:animate-ping motion-reduce:animate-none"
                  aria-hidden="true"
                />
                <span className="relative flex size-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30">
                  <Droplet className="size-7" />
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold">Blood on Click</p>
              <p className="text-[11px] text-muted-foreground">Smart matching</p>
            </div>
          </div>

          <NetworkNode
            icon={Hospital}
            badgeClass="bg-foreground text-background"
            title="Hospital"
            subtitle="Patient care unit"
            chip="A-"
            className="absolute bottom-[5%] right-[3%]"
          />
        </div>
      </div>
    </div>
  );
}