import { Building2, Droplet, HeartHandshake, UserRound } from "lucide-react";

const roles = [
  { icon: HeartHandshake, label: "Donor" },
  { icon: UserRound, label: "Seeker" },
  { icon: Building2, label: "Blood Bank" },
];

export function RegisterBrandPanel() {
  return (
    <aside className="relative overflow-hidden bg-gradient-to-tr from-red-700 via-rose-700 to-red-600 px-6 py-8 text-white sm:px-10 sm:py-10 lg:py-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-16 -top-24 size-72 rounded-full bg-rose-400/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 size-80 rounded-full bg-red-400/30 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:22px_22px]" />
        <Droplet className="absolute -left-10 -top-10 size-52 rotate-12 text-white/[0.06]" />
        <Droplet className="absolute -bottom-12 right-6 size-40 -rotate-12 text-white/[0.05]" />
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

        <div className="mt-8 flex flex-1 flex-col justify-center">
          <div className="motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-100">
              Blood on Click
            </span>
            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              Join a community built around connection.
            </h2>
            <p className="mt-4 hidden max-w-sm text-sm leading-relaxed text-red-100/90 sm:text-base lg:block">
              Create an account to access the Blood on Click experience that matches your role.
            </p>
          </div>

          <div
            className="mt-10 hidden motion-safe:animate-fade-up motion-safe:[animation-delay:240ms] lg:block"
            aria-hidden="true"
          >
            <div className="mx-auto flex max-w-sm flex-col items-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-red-600 shadow-lg shadow-red-900/30">
                <Droplet className="size-7" />
              </span>
              <div className="h-5 w-px border-l border-dashed border-white/30" />
              <div className="grid w-full grid-cols-3 gap-2">
                {roles.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-2 py-3 text-center backdrop-blur-sm"
                  >
                    <Icon className="size-4 text-white" />
                    <span className="text-[11px] font-medium leading-tight text-red-50">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center text-xs font-medium uppercase tracking-[0.16em] text-red-100/70">
                One connected platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
