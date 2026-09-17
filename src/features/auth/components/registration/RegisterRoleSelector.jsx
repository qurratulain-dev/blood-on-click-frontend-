import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { REGISTER_ROLES } from "./registerRoles";

export function RegisterRoleSelector({ selectedRole, onSelect, disabled }) {
  return (
    <div
      role="group"
      aria-label="Choose your role"
      className="mt-3 grid gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms] sm:grid-cols-2"
    >
      {REGISTER_ROLES.map(({ id, icon: Icon, label, description, wide }) => {
        const isSelected = selectedRole === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            disabled={disabled}
            aria-pressed={isSelected}
            className={cn(
              "group relative flex min-h-[88px] items-start gap-3 rounded-2xl border p-4 text-left shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 disabled:cursor-not-allowed disabled:opacity-60",
              isSelected
                ? "border-red-600 bg-red-50 ring-1 ring-red-600"
                : "border-border/70 bg-white hover:-translate-y-0.5 hover:border-red-300 hover:shadow-md",
              wide && "sm:col-span-2"
            )}
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl text-red-600 transition-colors",
                isSelected ? "bg-white" : "bg-red-50 group-hover:bg-red-100"
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-foreground">{label}</span>
              <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                {description}
              </span>
            </span>
            <span
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                isSelected
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-border text-transparent"
              )}
              aria-hidden="true"
            >
              <Check className="size-3" />
            </span>
          </button>
        );
      })}
    </div>
  );
}
