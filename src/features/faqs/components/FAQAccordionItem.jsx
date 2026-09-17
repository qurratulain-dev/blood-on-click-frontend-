import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  buttonId,
  panelId,
}) {
  return (
    <div className="border-b border-border/60 last:border-b-0">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-3.5 text-left text-sm font-semibold tracking-tight transition-colors hover:bg-red-50/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-600/20 sm:px-6"
        >
          <span>{question}</span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-red-600 motion-safe:transition-transform motion-safe:duration-300",
              isOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid grid-rows-[0fr] opacity-0 motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-300",
          isOpen && "grid-rows-[1fr] opacity-100"
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}