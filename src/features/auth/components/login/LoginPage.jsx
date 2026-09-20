import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/auth/schemas/login";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { LoginBrandPanel } from "./LoginBrandPanel";
import { LoginForm } from "./LoginForm";

export function LoginPage() {
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => mutate(data);

  return (
    <section
      aria-labelledby="login-heading"
      className="relative px-4 py-8 sm:px-6 lg:py-12"
    >
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-white shadow-[0_28px_70px_-40px_rgba(190,18,60,0.4)] lg:min-h-150 lg:grid-cols-[45fr_55fr]">
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
              Enter your details to continue to your account.
            </p>

            <LoginForm
              register={register}
              errors={errors}
              onSubmit={handleSubmit(onSubmit)}
              isPending={isPending}
            />
          </div>
        </div>
      </div>
    </section>
  );
}