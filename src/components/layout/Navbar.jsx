import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Droplet, LogOut, Menu, User, X,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useMenuStore } from "@/stores/menuStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AUTH_ACTION_KEYS = ["login", "register"];

export function Navbar() {
  const { pathname } = useLocation();
  const { isAuthenticated, logout, user, role } = useAuthStore();
  const getTopbar = useMenuStore((s) => s.getTopbar);
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const links = useMemo(() => {
    const userRole = isAuthenticated && role ? role : null;
    return getTopbar(userRole);
  }, [getTopbar, isAuthenticated, role]);

  const mainLinks = links.filter(({ key }) => !AUTH_ACTION_KEYS.includes(key));
  const actionLinks = links.filter(({ key }) => AUTH_ACTION_KEYS.includes(key));

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/85 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
        aria-label="Main navigation"
      >
        <Link to="/" onClick={closeMenu} className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-red-600 text-white shadow-sm shadow-red-600/30">
            <Droplet className="size-5" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight">
            Blood<span className="text-red-600"> on Click</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {mainLinks.map(({ key, route, label }) => {
            const isActive = pathname === route;
            const isEmergency = key === "emergency";
            if (isEmergency) {
              return (
                <Link
                  key={key}
                  to={route}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "border-red-600 bg-red-600 text-white shadow-sm shadow-red-600/30"
                      : "border-red-200 bg-white text-red-600 hover:border-red-300 hover:bg-red-50"
                  )}
                >
                  <span className="relative flex size-2" aria-hidden="true">
                    <span
                      className={cn(
                        "relative inline-flex size-2 rounded-full",
                        isActive ? "bg-white" : "bg-red-600"
                      )}
                    />
                  </span>
                  {label}
                </Link>
              );
            }
            return (
              <Link
                key={key}
                to={route}
                onClick={closeMenu}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-red-50 text-red-700"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {isAuthenticated ? (
          <div className="hidden items-center gap-2 lg:flex">
            <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm">
              <span className="flex size-6 items-center justify-center rounded-full bg-red-50 text-red-600">
                <User className="size-3.5" />
              </span>
              <span className="max-w-32 truncate font-medium">{user?.name || "User"}</span>
            </div>
            <button
              onClick={() => {
                closeMenu();
                logout();
              }}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Logout"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden items-center gap-1 lg:flex">
            {actionLinks.map(({ key, route, label }) =>
              key === "register" ? (
                <Button
                  key={key}
                  asChild
                  size="lg"
                  className="bg-red-600 px-4 text-white shadow-sm shadow-red-600/30 hover:bg-red-700"
                >
                  <Link to={route} onClick={closeMenu}>{label}</Link>
                </Button>
              ) : (
                <Link
                  key={key}
                  to={route}
                  onClick={closeMenu}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              )
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-border/70 bg-white lg:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4 motion-safe:animate-fade-up motion-safe:[animation-duration:0.35s] sm:px-6">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {mainLinks.map(({ key, route, label }) => {
                const isActive = pathname === route;
                const isEmergency = key === "emergency";
                if (isEmergency) {
                  return (
                    <Link
                      key={key}
                      to={route}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg border px-4 py-3 text-sm font-semibold",
                        isActive
                          ? "border-red-600 bg-red-600 text-white shadow-sm shadow-red-600/30"
                          : "border-red-200 bg-red-50/70 text-red-700"
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          isActive ? "bg-white" : "bg-red-600"
                        )}
                        aria-hidden="true"
                      />
                      {label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={key}
                    to={route}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-red-50 text-red-700"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {isAuthenticated ? (
              <div className="mt-3 flex flex-col gap-1 border-t border-border/70 pt-3">
                <div className="flex items-center gap-2 px-3 py-2 text-sm">
                  <span className="flex size-6 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <User className="size-3.5" />
                  </span>
                  <span className="truncate font-medium">{user?.name || "User"}</span>
                </div>
                <button
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
                  className="flex items-center gap-1.5 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-3 flex flex-col gap-2.5 border-t border-border/70 pt-4">
                {actionLinks.map(({ key, route, label }) =>
                  key === "register" ? (
                    <Button
                      key={key}
                      asChild
                      size="lg"
                      className="h-11 w-full bg-red-600 text-white shadow-sm shadow-red-600/30 hover:bg-red-700"
                    >
                      <Link to={route} onClick={closeMenu}>{label}</Link>
                    </Button>
                  ) : (
                    <Link
                      key={key}
                      to={route}
                      onClick={closeMenu}
                      className="flex h-11 items-center justify-center rounded-lg border border-border bg-white px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {label}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}