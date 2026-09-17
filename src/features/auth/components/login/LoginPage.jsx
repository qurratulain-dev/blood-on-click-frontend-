import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, ChevronRight, Search, Shield, User } from "lucide-react";
import { loginSchema } from "@/features/auth/schemas/login";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { LoginBrandPanel } from "./LoginBrandPanel";
import { LoginForm } from "./LoginForm";

const roleOptions = [
  {
    id: "donor",
    icon: User,
    label: "Donor",
    description: "Manage your donor profile and donations.",
  },
  {
    id: "seeker",
    icon: Search,
    label: "Seeker",
    description: "Search for donors and blood banks.",
  },
  {
    id: "blood_bank",
    icon: Building2,
    label: "Blood Bank",
    description: "Manage stock, requests, and reports.",
  },
  {
    id: "admin",
    icon: Shield,
    label: "Admin",
    description: "Access assessments and administration.",
  },
];

function RoleSelect({ onSelect }) {
  return (
    <div className="mt-8 grid gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms] sm:grid-cols-2">
      {roleOptions.map(({ id, icon: Icon, label, description }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className="group flex min-h-[72px] items-center gap-3 rounded-2xl border border-border bg-white p-3.5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-red-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-100">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-foreground">{label}</span>
            <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
              {description}
            </span>
          </span>
          <ChevronRight
            className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-red-500"
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}

export function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { role_type: selectedRole },
  });

  useEffect(() => {
    if (selectedRole) {
      setValue("role_type", selectedRole);
    }
  }, [selectedRole, setValue]);

  const onSubmit = (data) => mutate(data);

  return (
    <section
      aria-labelledby="login-heading"
      className="relative px-4 py-8 sm:px-6 lg:py-12"
    >
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-white shadow-[0_28px_70px_-40px_rgba(190,18,60,0.4)] lg:min-h-[600px] lg:grid-cols-[45fr_55fr]">
        <LoginBrandPanel />

        <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:py-12">
          <div className="w-full max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-red-700 motion-safe:animate-fade-up motion-safe:[animation-delay:80ms]">
              Welcome back
            </span>
            <h1
              id="login-heading"
              className="mt-4 text-2xl font-semibold leading-tight tracking-tight motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] sm:text-3xl"
            >
              Sign in to Blood on Click
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
              {selectedRole
                ? "Enter your details to continue to your account."
                : "Choose your account type to continue."}
            </p>

            {selectedRole ? (
              <LoginForm
                register={register}
                errors={errors}
                onSubmit={handleSubmit(onSubmit)}
                isPending={isPending}
                selectedRole={selectedRole}
                onChangeRole={() => setSelectedRole(null)}
              />
            ) : (
              <RoleSelect onSelect={setSelectedRole} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
