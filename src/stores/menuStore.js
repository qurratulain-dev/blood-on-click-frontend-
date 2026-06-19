import { create } from "zustand";
import menus from "@/menu/menus.json";

function filterTopbar(role) {
  return (menus.topbar || []).filter((item) => {
    const roles = item.roles || [];
    if (roles.includes("*")) return true;
    if (!role && roles.includes("guest")) return true;
    if (role && roles.includes(role)) return true;
    return false;
  });
}

function getSidebar(role) {
  if (!role) return [];
  return menus.sidebar?.[role] || [];
}

export const useMenuStore = create(() => ({
  getTopbar: (role) => filterTopbar(role),
  getSidebar: (role) => getSidebar(role),
}));
