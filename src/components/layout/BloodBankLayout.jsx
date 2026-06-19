import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import {
  LayoutDashboard, Edit, Package, ClipboardList, Bell, BarChart3,
  LogOut, Droplet,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useMenuStore } from "@/stores/menuStore";

const iconMap = {
  LayoutDashboard, Edit, Package, ClipboardList, Bell, BarChart3,
};

export function BloodBankLayout({ children }) {
  const { user, role, logout } = useAuthStore();
  const getSidebar = useMenuStore((s) => s.getSidebar);

  const sidebar = useMemo(() => getSidebar(role), [getSidebar, role]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="flex w-60 flex-col bg-gray-900 text-white">
        <div className="flex items-center gap-2 border-b border-gray-700 px-5 py-4">
          <Droplet className="size-6 text-red-400" />
          <span className="text-lg font-semibold">Blood Bank</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {sidebar.map(({ key, route, label, icon, end }) => {
            const Icon = iconMap[icon];
            return (
              <NavLink
                key={key}
                to={route}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    isActive ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
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
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 transition hover:bg-gray-800 hover:text-white"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
          <h1 className="text-lg font-semibold text-gray-800">
            Welcome, {user?.name || "Blood Bank"}
          </h1>
          <div className="flex items-center gap-3">
            <span className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
              Blood Bank Panel
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="size-3.5" />
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
