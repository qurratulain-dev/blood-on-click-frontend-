import {
  Building2,
  Droplet,
  HeartHandshake,
  MapPin,
  User,
} from "lucide-react";

function NodeChip({ icon: Icon, iconClass, title, subtitle, className }) {
  return (
    <div
      className={`absolute z-10 flex items-center gap-2.5 rounded-2xl border border-border/70 bg-white px-3 py-2.5 shadow-sm shadow-black/[0.05] ${className}`}
    >
      <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium leading-tight">{title}</p>
        <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-muted-foreground">
          <MapPin className="size-3 shrink-0" aria-hidden="true" />
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export function AboutHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] motion-safe:animate-fade-up motion-safe:[animation-delay:280ms]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/80 blur-3xl" />
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-white shadow-[0_28px_70px_-32px_rgba(190,18,60,0.4)]">
        <div className="relative aspect-[10/9] w-full">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div className="absolute inset-0 [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:18px_18px]" />
            <div className="absolute -bottom-12 -right-8 size-48 rounded-full bg-rose-100/70 blur-3xl" />
            <div className="absolute -left-8 -top-8 size-44 rounded-full bg-red-100/70 blur-3xl" />
          </div>

          <svg
            className="absolute inset-0 h-full w-full text-red-400"
            viewBox="0 0 100 90"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="about-connect-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fca5a5" />
                <stop offset="1" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <path
              d="M20 37 C 30 40, 38 43, 46 45"
              stroke="url(#about-connect-line)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="2.5 3.5"
            />
            <path
              d="M80 37 C 70 40, 62 43, 54 45"
              stroke="url(#about-connect-line)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="2.5 3.5"
            />
            <path
              d="M50 60 C 50 66, 50 70, 50 76"
              stroke="url(#about-connect-line)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="2.5 3.5"
            />
          </svg>

          <NodeChip
            icon={User}
            iconClass="bg-red-600 text-white"
            title="Blood Donor"
            subtitle="From the community"
            className="left-[4%] top-[36%]"
          />

          <NodeChip
            icon={HeartHandshake}
            iconClass="bg-foreground text-background"
            title="Person in Need"
            subtitle="Searching for blood"
            className="right-[4%] top-[36%]"
          />

          <div className="absolute left-1/2 top-[46%] z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex flex-col items-center">
              <span className="relative flex size-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30">
                <Droplet className="size-8" aria-hidden="true" />
              </span>
              <p className="mt-3 text-sm font-semibold">Blood on Click</p>
              <p className="text-[11px] text-muted-foreground">
                The connection in between
              </p>
            </div>
          </div>

          <NodeChip
            icon={Building2}
            iconClass="bg-red-50 text-red-600"
            title="Blood Bank"
            subtitle="Part of the network"
            className="bottom-[5%] left-1/2 -translate-x-1/2"
          />
        </div>
      </div>
    </div>
  );
}