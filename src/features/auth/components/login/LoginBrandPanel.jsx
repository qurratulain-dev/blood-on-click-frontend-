import { Building2, Droplet, HeartHandshake, UserRound, Users } from "lucide-react";

const nodes = [
  { icon: UserRound, label: "People in Need" },
  { icon: Users, label: "Community" },
  { icon: Building2, label: "Blood Banks" },
];

export function LoginBrandPanel() {
  return (
    <aside className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-rose-700 px-6 py-8 text-white sm:px-10 sm:py-10 lg:py-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-20 -top-24 size-72 rounded-full bg-red-400/30 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 size-80 rounded-full bg-rose-400/25 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:22px_22px]" />
        <Droplet className="absolute -right-8 top-1/2 size-56 -translate-y-1/2 rotate-12 text-white/[0.07]" />
      </div>

      <div className="relative flex h-full flex-col">
        <span className="inline-flex w-fit items-center gap-2.5 motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
          <span className="flex size-9 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm shadow-red-900/20">
            <Droplet className="size-5" aria-hidden="true" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight">
            Blood<span className="text-red-100"> on Click</span>
          </span>
        </span>

        <div className="mt-8 motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] lg:mt-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-100">
            Blood on Click
          </span>
          <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            Welcome back to a connected blood community.
          </h2>
          <p className="mt-4 hidden max-w-sm text-sm leading-relaxed text-red-100/90 sm:text-base lg:block">
            Sign in to continue managing your blood-related requests, donor profile, or resources.
          </p>
        </div>

        <div
          className="mt-10 hidden motion-safe:animate-fade-up motion-safe:[animation-delay:240ms] lg:block"
          aria-hidden="true"
        >
          <div className="mx-auto w-full max-w-xs">
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <HeartHandshake className="size-4 text-white" />
              <span className="text-sm font-medium">Donor</span>
            </div>
            <div className="mx-auto h-6 w-px border-l border-dashed border-white/30" />
            <div className="mx-auto flex w-fit flex-col items-center gap-2">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-red-600 shadow-lg shadow-red-900/30">
                <Droplet className="size-7" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
                Blood on Click
              </span>
            </div>
            <div className="mx-auto h-6 w-px border-l border-dashed border-white/30" />
            <div className="grid grid-cols-3 gap-2">
              {nodes.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-2 py-3 text-center backdrop-blur-sm"
                >
                  <Icon className="size-4 text-white" />
                  <span className="text-[11px] font-medium leading-tight text-red-50">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
