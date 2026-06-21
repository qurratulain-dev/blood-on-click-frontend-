import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import {
  LayoutDashboard, Search, Hospital, Bell,
  LogOut, Droplet,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useMenuStore } from "@/stores/menuStore";

const iconMap = {
  LayoutDashboard, Search, Hospital, Bell,
};

export function SeekerLayout({ children }) {
  const { user, role, logout } = useAuthStore();
  const getSidebar = useMenuStore((s) => s.getSidebar);

  const sidebar = useMemo(() => getSidebar(role), [getSidebar, role]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <aside className="flex w-60 flex-col bg-gray-900 text-white">
        <div className="flex items-center gap-2 border-b border-gray-700 px-5 py-4">
          <Droplet className="size-6 text-red-400" />
          <span className="text-lg font-semibold">Seeker Panel</span>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
          {sidebar.map(({ key, route, label, icon, end }) => {
            const Icon = iconMap[icon];
            return (
              <NavLink
                key={key}
                to={route}
                end={end}
className={({ isActive }) =>
                   `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all ${
                     isActive ? "bg-red-600 text-white" : "text-gray-300 hover:pl-8 hover:bg-gray-800 hover:text-white"
                   }`
                 }
              >
                {Icon && <Icon className="size-4 shrink-0" />}
                {label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-gray-700 px-3 py-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-300 transition-all hover:pl-8 hover:bg-gray-800 hover:text-white"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm shrink-0">
          <h1 className="text-lg font-semibold text-gray-800">
            Welcome, {user?.name || "Seeker"}
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="size-3.5" />
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
