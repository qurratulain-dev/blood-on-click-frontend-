import { Link, useLocation } from "react-router-dom";
import { Droplet, LogOut, User } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { NAV_LINKS } from "@/config/constants";

export function Navbar() {
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();

  const role = user?.role || "public";
  const links = NAV_LINKS[role] || NAV_LINKS.public;

  return (
    <nav className="bg-red-600 text-white shadow">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-wide">
          <Droplet className="size-5" />
          Blood on Click
        </Link>

        <div className="flex items-center gap-1">
          {!isAuthenticated ? (
            links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`rounded-md px-3 py-1.5 text-sm transition hover:bg-red-700 ${
                  pathname === to ? "bg-red-700" : ""
                }`}
              >
                {label}
              </Link>
            ))
          ) : (
            <>
              {links.slice(0, 4).map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`rounded-md px-3 py-1.5 text-sm transition hover:bg-red-700 ${
                    pathname === to ? "bg-red-700" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="ml-3 flex items-center gap-2 border-l border-red-400 pl-3">
                <User className="size-4" />
                <span className="text-sm">{user?.name || "User"}</span>
                <button
                  onClick={logout}
                  className="rounded-md p-1.5 text-sm transition hover:bg-red-700"
                  title="Logout"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
