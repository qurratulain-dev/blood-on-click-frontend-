import { Droplet, HeartHandshake, MessagesSquare, UserRound } from "lucide-react";

function ChatBubble({ icon: Icon, iconClass, title, subtitle, className }) {
  return (
    <div
      className={`absolute z-10 flex items-center gap-2.5 rounded-2xl border border-border/70 bg-white px-3 py-2.5 shadow-sm shadow-black/[0.05] ${className}`}
    >
      <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium leading-tight">{title}</p>
        <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

export function ContactHeroVisual() {
  return (
    <div className="mx-auto w-full max-w-[520px] motion-safe:animate-fade-up motion-safe:[animation-delay:280ms]">
      <div className="relative" aria-hidden="true">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/80 blur-3xl" />
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-white shadow-[0_28px_70px_-32px_rgba(190,18,60,0.4)]">
          <div className="relative aspect-[10/9] w-full">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:18px_18px]" />
              <div className="absolute -right-8 -top-8 size-44 rounded-full bg-rose-100/70 blur-3xl" />
              <div className="absolute -bottom-10 -left-8 size-48 rounded-full bg-red-100/70 blur-3xl" />
            </div>

            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex flex-col items-center">
                <span className="absolute -inset-3 rounded-full border border-red-200" aria-hidden="true" />
                <span className="relative flex size-20 items-center justify-center rounded-[1.75rem] bg-red-600 text-white shadow-lg shadow-red-600/30">
                  <MessagesSquare className="size-9" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm font-semibold">Reach out anytime</p>
                <p className="text-[11px] text-muted-foreground">
                  Questions, feedback, and platform inquiries
                </p>
              </div>
            </div>

            <ChatBubble
              icon={UserRound}
              iconClass="bg-red-600 text-white"
              title="A visitor asks"
              subtitle="Is Blood on Click free to use?"
              className="left-[4%] top-[10%]"
            />
            <ChatBubble
              icon={Droplet}
              iconClass="bg-foreground text-background"
              title="Blood on Click"
              subtitle="We're here to help you."
              className="bottom-[12%] right-[4%]"
            />
            <ChatBubble
              icon={HeartHandshake}
              iconClass="bg-red-50 text-red-600"
              title="Someone replies"
              subtitle="Thanks for the quick answer"
              className="bottom-[20%] left-[6%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}