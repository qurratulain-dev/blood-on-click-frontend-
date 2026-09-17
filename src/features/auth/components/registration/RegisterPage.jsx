import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { REGISTER_ROLE_IDS } from "./registerRoles";
import { RegisterBrandPanel } from "./RegisterBrandPanel";
import { RegisterRoleSelector } from "./RegisterRoleSelector";
import { RegisterForm } from "./RegisterForm";

export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const requestedRole = searchParams.get("role");
  const [selectedRole, setSelectedRole] = useState(
    REGISTER_ROLE_IDS.includes(requestedRole) ? requestedRole : null
  );
  const { mutate, isPending } = useRegister();

  const onSubmit = (data) => {
    const payload =
      data.role_type === "blood_bank"
        ? data
        : { ...data, full_name: data.name };
    mutate(payload);
  };

  return (
    <section
      aria-labelledby="register-heading"
      className="relative px-4 py-8 sm:px-6 lg:py-12"
    >
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-white shadow-[0_28px_70px_-40px_rgba(190,18,60,0.4)] lg:grid-cols-[45fr_55fr]">
        <RegisterBrandPanel />

        <div className="px-6 py-10 sm:px-10 lg:py-12">
          <div className="mx-auto w-full max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-red-700 motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
              Create your account
            </span>
            <h1
              id="register-heading"
              className="mt-4 text-2xl font-semibold leading-tight tracking-tight motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] sm:text-3xl"
            >
              Join Blood on Click
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
              {selectedRole
                ? "Enter your details to create your account."
                : "Choose your role and enter your details to get started."}
            </p>

            <div className="mt-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
                Choose your role
              </h2>
              <RegisterRoleSelector
                selectedRole={selectedRole}
                onSelect={setSelectedRole}
                disabled={isPending}
              />
            </div>

            {selectedRole ? (
              <RegisterForm
                key={selectedRole}
                selectedRole={selectedRole}
                onSubmit={onSubmit}
                isPending={isPending}
              />
            ) : (
              <p className="mt-5 rounded-2xl border border-dashed border-border/70 bg-muted/30 px-4 py-5 text-center text-sm text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]">
                Select a role above to continue.
              </p>
            )}

            <div className="motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]">
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="rounded font-semibold text-red-600 underline-offset-2 transition-colors hover:text-red-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
                >
                  Sign in
                </Link>
              </p>

              <div className="mt-5 border-t border-border/70 pt-5 text-center">
                <Link
                  to="/emergency"
                  className="inline-flex items-center gap-1.5 rounded text-xs font-medium text-muted-foreground transition-colors hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
                >
                  <Search className="size-3.5" aria-hidden="true" />
                  Need blood urgently?{" "}
                  <span className="font-semibold text-red-600">
                    Emergency Blood Search
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
