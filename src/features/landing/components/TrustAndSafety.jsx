import {
  Bell,
  Boxes,
  GitCommitHorizontal,
  Info,
  KeyRound,
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: KeyRound,
    title: "Role-aware access",
    caption:
      "Donors, seekers, blood banks, and admins each operate from a guarded, role-scoped account.",
  },
  {
    icon: GitCommitHorizontal,
    title: "Status-driven requests",
    caption:
      "Blood requests start as pending and move through approved and fulfilled, with rejections handled explicitly.",
  },
  {
    icon: Boxes,
    title: "Managed inventory",
    caption:
      "Blood banks track their stock by blood group and update it through the platform.",
  },
  {
    icon: Bell,
    title: "Updates at every step",
    caption:
      "Seekers, donors, and banks receive in-app notifications when requests or donations change status.",
  },
];

export function TrustAndSafety() {
  return (
    <section
      id="trust-and-safety"
      aria-labelledby="trust-and-safety-heading"
      className="relative overflow-hidden bg-gray-50 py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -right-24 top-1/4 size-96 rounded-full bg-red-100/50 blur-3xl" />
        <div className="absolute -left-24 bottom-0 size-80 rounded-full bg-rose-100/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-3 motion-safe:animate-fade-up">
              <span className="h-px w-8 bg-red-600" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Accountability built in
              </span>
            </div>

            <h2
              id="trust-and-safety-heading"
              className="text-3xl font-semibold leading-tight tracking-tight motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              How the platform stays accountable.
            </h2>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
              Every part of the process runs through signed-in accounts and
              defined steps, so donors, seekers, and blood banks always know
              where things stand.
            </p>

            <div className="mt-8 flex items-start gap-2.5 rounded-xl border border-border/60 bg-white p-4 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
              <Info className="mt-0.5 size-4 shrink-0 text-red-600" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Search is limited to signed-in Seeker accounts. Blood on Click
                does not make medical eligibility decisions — final suitability
                is confirmed by professionals during donation.
              </p>
            </div>
          </div>

          <ul className="divide-y divide-border/50 rounded-2xl border border-border/60 bg-white motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
            {CAPABILITIES.map((capability) => (
              <li
                key={capability.title}
                className="flex items-start gap-4 px-5 py-5 transition-colors duration-300 hover:bg-muted/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors duration-300">
                  <capability.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight">
                    {capability.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {capability.caption}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}