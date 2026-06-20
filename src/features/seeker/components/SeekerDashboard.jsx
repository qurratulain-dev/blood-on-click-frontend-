import { useSeekerDashboard } from "@/features/seeker/hooks/useSeekerDashboard";
import { GROUP_COLORS } from "@/config/constants";
import { DashboardStatCard } from "@/components/ui/dashboard-stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Search, Building2, Clock, CheckCircle, XCircle, Loader2, User } from "lucide-react";

const QUICK_ACTIONS = [
  {
    href: "/seeker/search-donors",
    icon: Search,
    color: "bg-blue-50 text-blue-600",
    title: "Search Donors",
    desc: "Find donors by blood group and location",
  },
  {
    href: "/seeker/search-banks",
    icon: Building2,
    color: "bg-green-50 text-green-600",
    title: "Search Blood Banks",
    desc: "Find nearby blood banks with stock",
  },
  {
    href: "/seeker/notifications",
    icon: Clock,
    color: "bg-yellow-50 text-yellow-600",
    title: "Notifications",
    desc: "View your notifications",
  },
];

export function SeekerDashboard() {
  const { data, isLoading } = useSeekerDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-red-600" />
      </div>
    );
  }

  const profile = data?.profile;

  const stats = [
    { icon: Search, label: "Total Requests", value: data?.total_requests },
    { icon: Clock, label: "Pending", value: data?.pending_requests },
    { icon: CheckCircle, label: "Fulfilled", value: data?.fulfilled_requests },
    { icon: XCircle, label: "Rejected", value: data?.rejected_requests },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-1 text-2xl font-bold">Seeker Dashboard</h2>
      <hr className="mb-6" />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => <DashboardStatCard key={s.label} {...s} />)}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="border-b bg-red-50 px-5 py-3">
            <h5 className="flex items-center gap-2 font-semibold text-red-800">
              <User className="size-4" />
              My Profile
            </h5>
          </div>
          <div className="p-5">
            {profile ? (
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex size-16 items-center justify-center rounded-full bg-red-100">
                    <User className="size-8 text-red-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{profile.full_name}</p>
                    <p className="text-muted-foreground">Phone: {profile.phone || "—"}</p>
                  </div>
                </div>
                <p><span className="text-muted-foreground">Address:</span> {profile.address || "—"}</p>
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">Profile not available.</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border bg-white shadow-sm">
          <div className="border-b bg-red-50 px-5 py-3">
            <h5 className="flex items-center gap-2 font-semibold text-red-800">
              <Building2 className="size-4" />
              Quick Actions
            </h5>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              {QUICK_ACTIONS.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 rounded-lg border p-3 transition hover:bg-gray-50"
                >
                  <div className={`flex size-10 items-center justify-center rounded-full ${action.color}`}>
                    <action.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-red-50 px-5 py-3">
          <h5 className="flex items-center gap-2 font-semibold text-red-800">
            <Clock className="size-4" />
            Recent Requests
          </h5>
        </div>
        <div className="p-5">
          {data?.recent_requests?.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-xs uppercase text-muted-foreground">
                  <th className="pb-2 font-medium">Blood Bank</th>
                  <th className="pb-2 font-medium">Group</th>
                  <th className="pb-2 font-medium">Units</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_requests.map((r) => (
                  <tr key={r.id} className="border-b text-sm last:border-0 hover:bg-gray-50">
                    <td className="py-2.5">{r.bank_name}</td>
                    <td className="py-2.5">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${GROUP_COLORS[r.blood_group] || "bg-gray-100 text-gray-800"}`}>
                        {r.blood_group}
                      </span>
                    </td>
                    <td className="py-2.5">{r.quantity}</td>
                    <td className="py-2.5">{r.requested_date}</td>
                    <td className="py-2.5">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">No blood requests yet. Search for a blood bank to make a request.</p>
          )}
        </div>
      </div>
    </div>
  );
}
