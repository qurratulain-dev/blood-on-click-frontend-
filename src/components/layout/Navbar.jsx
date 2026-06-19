import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import {
  Droplet, LogOut, User, Home, UserPlus, LogIn,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useMenuStore } from "@/stores/menuStore";

const iconMap = {
  Home, UserPlus, LogIn,
};

export function Navbar() {
  const { pathname } = useLocation();
  const { isAuthenticated, logout, user, role } = useAuthStore();
  const getTopbar = useMenuStore((s) => s.getTopbar);

  const links = useMemo(() => {
    const userRole = isAuthenticated && role ? role : null;
    return getTopbar(userRole);
  }, [getTopbar, isAuthenticated, role]);

  return (
    <nav className="bg-red-600 text-white shadow">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-wide">
          <Droplet className="size-5" />
          Blood on Click
        </Link>

        <div className="flex items-center gap-1">
          {!isAuthenticated ? (
            links.map(({ key, route, label, icon }) => {
              const Icon = iconMap[icon];
              return (
                <Link
                  key={key}
                  to={route}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition hover:bg-red-700 ${
                    pathname === route ? "bg-red-700" : ""
                  }`}
                >
                  {Icon && <Icon className="size-4" />}
                  {label}
                </Link>
              );
            })
          ) : (
            <>
              {links.slice(0, 4).map(({ key, route, label, icon }) => {
                const Icon = iconMap[icon];
                return (
                  <Link
                    key={key}
                    to={route}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition hover:bg-red-700 ${
                      pathname === route ? "bg-red-700" : ""
                    }`}
                  >
                    {Icon && <Icon className="size-4" />}
                    {label}
                  </Link>
                );
              })}
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
