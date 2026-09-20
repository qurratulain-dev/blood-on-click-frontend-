import { Link } from "react-router-dom";
import { UserRound, History, Search, Bell, ArrowRight } from "lucide-react";

const ACTIONS = [
  {
    to: "/user/edit-profile",
    icon: UserRound,
    label: "View Profile",
    description: "Manage your details",
  },
  {
    to: "/user/donation-history",
    icon: History,
    label: "Donation History",
    description: "Track your donations",
  },
  {
    to: "/user/search-banks",
    icon: Search,
    label: "Search Blood Banks",
    description: "Find a bank near you",
  },
  {
    to: "/user/notifications",
    icon: Bell,
    label: "Notifications",
    description: "View updates and alerts",
  },
];

export function UserQuickActions() {
  return (
    <section className="motion-safe:animate-fade-up [animation-delay:240ms]">
      <div>
        <h2 className="text-base font-semibold text-gray-900">Quick Actions</h2>
        <p className="text-sm text-muted-foreground">Common things you can do</p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACTIONS.map(({ to, icon: Icon, label, description }) => (
          <Link
            key={to}
            to={to}
            className="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-red-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-red-50 transition group-hover:bg-red-100">
              <Icon className="size-5 text-red-600" aria-hidden="true" />
            </div>
            <p className="mt-3 text-sm font-semibold text-gray-900">{label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            <ArrowRight
              className="mt-3 size-4 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-red-600"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}