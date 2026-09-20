import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, LogIn, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm({
  register,
  errors,
  onSubmit,
  isPending,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="space-y-5 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
        <div className="space-y-2">
          <label
            htmlFor="login-email"
            className="block text-sm font-medium text-foreground"
          >
            Email Address
          </label>
          <Input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "login-email-error" : undefined}
            className="h-11 rounded-xl border-border bg-white px-3.5 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-red-400 focus-visible:ring-red-500/20 md:text-sm"
            {...register("email")}
          />
          {errors.email ? (
            <p
              id="login-email-error"
              role="alert"
              className="text-xs font-medium text-red-600"
            >
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="login-password"
            className="block text-sm font-medium text-foreground"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              aria-invalid={errors.password ? true : undefined}
              aria-describedby={errors.password ? "login-password-error" : undefined}
              className="h-11 rounded-xl border-border bg-white px-3.5 pr-12 text-base shadow-sm transition-colors focus-visible:border-red-400 focus-visible:ring-red-500/20 md:text-sm"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password ? (
            <p
              id="login-password-error"
              role="alert"
              className="text-xs font-medium text-red-600"
            >
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="h-11 w-full gap-2 rounded-xl bg-red-600 text-base text-white shadow-sm shadow-red-600/30 transition-colors hover:bg-red-700 focus-visible:ring-red-500/40"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <LogIn className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>

      <div className="motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]">
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&rsquo;t have an account?{" "}
          <Link
            to="/register"
            className="rounded font-semibold text-red-600 underline-offset-2 transition-colors hover:text-red-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
          >
            Register
          </Link>
        </p>

        <div className="mt-5 border-t border-border/70 pt-5 text-center">
          <Link
            to="/emergency"
            className="inline-flex items-center gap-1.5 rounded text-xs font-medium text-muted-foreground transition-colors hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
          >
            <Search className="size-3.5" aria-hidden="true" />
            Need blood urgently?{" "}
            <span className="font-semibold text-red-600">Emergency Blood Search</span>
          </Link>
        </div>
      </div>
    </form>
  );
}
