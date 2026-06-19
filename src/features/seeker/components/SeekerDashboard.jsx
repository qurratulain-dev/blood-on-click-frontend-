import { useQuery } from "@tanstack/react-query";
import { getSeekerDashboard } from "@/features/seeker/api/seeker";
import { Search, Building2, Clock, CheckCircle, XCircle, Loader2, User, Frown } from "lucide-react";

const groupColors = {
  "A+": "bg-red-100 text-red-800", "A-": "bg-pink-100 text-pink-800",
  "B+": "bg-orange-100 text-orange-800", "B-": "bg-amber-100 text-amber-800",
  "AB+": "bg-purple-100 text-purple-800", "AB-": "bg-violet-100 text-violet-800",
  "O+": "bg-green-100 text-green-800", "O-": "bg-teal-100 text-teal-800",
};

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-red-50">
          <Icon className="size-6 text-red-600" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value ?? "—"}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
          {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

export function SeekerDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["seeker-dashboard"],
    queryFn: async () => {
      const res = await getSeekerDashboard();
      return res.data;
    },
  });

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
    { icon: Frown, label: "Rejected", value: data?.rejected_requests },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-1 text-2xl font-bold">Seeker Dashboard</h2>
      <hr className="mb-6" />

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Profile Card */}
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

        {/* Quick Actions */}
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="border-b bg-red-50 px-5 py-3">
            <h5 className="flex items-center gap-2 font-semibold text-red-800">
              <Building2 className="size-4" />
              Quick Actions
            </h5>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              <a href="/seeker/search-donors" className="flex items-center gap-3 rounded-lg border p-3 transition hover:bg-gray-50">
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-50">
                  <Search className="size-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Search Donors</p>
                  <p className="text-xs text-muted-foreground">Find donors by blood group and location</p>
                </div>
              </a>
              <a href="/seeker/search-banks" className="flex items-center gap-3 rounded-lg border p-3 transition hover:bg-gray-50">
                <div className="flex size-10 items-center justify-center rounded-full bg-green-50">
                  <Building2 className="size-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Search Blood Banks</p>
                  <p className="text-xs text-muted-foreground">Find nearby blood banks with stock</p>
                </div>
              </a>
              <a href="/seeker/notifications" className="flex items-center gap-3 rounded-lg border p-3 transition hover:bg-gray-50">
                <div className="flex size-10 items-center justify-center rounded-full bg-yellow-50">
                  <Clock className="size-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Notifications</p>
                  <p className="text-xs text-muted-foreground">View your notifications</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
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
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${groupColors[r.blood_group] || "bg-gray-100 text-gray-800"}`}>
                        {r.blood_group}
                      </span>
                    </td>
                    <td className="py-2.5">{r.quantity}</td>
                    <td className="py-2.5">{r.requested_date}</td>
                    <td className="py-2.5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        r.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        r.status === "approved" ? "bg-blue-100 text-blue-800" :
                        r.status === "fulfilled" ? "bg-green-100 text-green-800" :
                        r.status === "rejected" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {r.status === "fulfilled" && <CheckCircle className="size-3" />}
                        {r.status === "pending" && <Clock className="size-3" />}
                        {r.status === "rejected" && <XCircle className="size-3" />}
                        {r.status}
                      </span>
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
