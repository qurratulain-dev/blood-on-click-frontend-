import { Link, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Droplet, LogOut, Menu, User, X,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useMenuStore } from "@/stores/menuStore";
import { Button } from "@/components/ui/button";

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

  const navLinks = isAuthenticated
    ? links
    : links.filter(({ key }) => key === "home");

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

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ key, route, label }) => (
            <Link
              key={key}
              to={route}
              onClick={closeMenu}
              aria-current={pathname === route ? "page" : undefined}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                pathname === route
                  ? "bg-red-50 text-red-700"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {isAuthenticated ? (
          <div className="hidden items-center gap-2 md:flex">
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
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-50"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-red-600" />
              </span>
              Need Blood?
            </Link>
            <Link
              to="/login"
              onClick={closeMenu}
              className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Login
            </Link>
            <Button asChild size="lg" className="bg-red-600 px-4 text-white shadow-sm shadow-red-600/30 hover:bg-red-700">
              <Link to="/register" onClick={closeMenu}>Become a Donor</Link>
            </Button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/70 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ key, route, label }) => (
              <Link
                key={key}
                to={route}
                onClick={closeMenu}
                aria-current={pathname === route ? "page" : undefined}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === route
                    ? "bg-red-50 text-red-700"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <div className="mt-2 flex items-center gap-2 border-t border-border/70 px-3 pt-3 text-sm">
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
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="mt-2 flex items-center gap-2 rounded-full border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600"
                >
                  <span className="relative flex size-2" aria-hidden="true">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2 rounded-full bg-red-600" />
                  </span>
                  Need Blood?
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="mt-1 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  Become a Donor
                </Link>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}