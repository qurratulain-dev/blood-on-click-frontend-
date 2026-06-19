import { useQuery } from "@tanstack/react-query";
import { getBloodBankDashboard } from "@/features/bloodBank/api/bloodBank";
import { BLOOD_GROUPS } from "@/config/constants";
import { Droplet, HeartHandshake, Clock, FlaskConical, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

const groupColors = {
  "A+": "bg-red-100 text-red-800", "A-": "bg-pink-100 text-pink-800",
  "B+": "bg-orange-100 text-orange-800", "B-": "bg-amber-100 text-amber-800",
  "AB+": "bg-purple-100 text-purple-800", "AB-": "bg-violet-100 text-violet-800",
  "O+": "bg-green-100 text-green-800", "O-": "bg-teal-100 text-teal-800",
};

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`flex size-12 items-center justify-center rounded-full ${color || "bg-red-50"}`}>
          <Icon className={`size-6 ${color ? "text-white" : "text-red-600"}`} />
        </div>
        <div>
          <p className="text-2xl font-bold">{value ?? "—"}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}

export function BloodBankDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["blood-bank-dashboard"],
    queryFn: async () => {
      const res = await getBloodBankDashboard();
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

  const stockByGroup = data?.stock_by_group || [];
  const stockMap = {};
  stockByGroup.forEach((s) => { stockMap[s.blood_group] = s; });

  const stats = [
    { icon: Droplet, label: "Total Units", value: data?.total_units, color: "bg-red-50" },
    { icon: HeartHandshake, label: "Total Donations", value: data?.total_donations, color: "bg-green-50" },
    { icon: FlaskConical, label: "Donated Units", value: data?.total_donated_units, color: "bg-blue-50" },
    { icon: Clock, label: "Pending Requests", value: data?.pending_requests, color: "bg-yellow-50" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-1 text-2xl font-bold">Blood Bank Dashboard</h2>
      <hr className="mb-6" />

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Stock by Group */}
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="border-b bg-red-50 px-5 py-3">
            <h5 className="flex items-center gap-2 font-semibold text-red-800">
              <Droplet className="size-4" />
              Stock by Blood Group
            </h5>
          </div>
          <div className="p-5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-xs uppercase text-muted-foreground">
                  <th className="pb-2 font-medium">Blood Group</th>
                  <th className="pb-2 font-medium">Units</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {BLOOD_GROUPS.map((bg) => {
                  const s = stockMap[bg];
                  const qty = s?.quantity || 0;
                  const status = s?.status || "N/A";
                  const statusColor =
                    status === "Critical" ? "bg-red-100 text-red-800" :
                    status === "Low" ? "bg-yellow-100 text-yellow-800" :
                    status === "Adequate" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800";
                  return (
                    <tr key={bg} className="border-b text-sm last:border-0 hover:bg-gray-50">
                      <td className="py-2.5">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${groupColors[bg] || "bg-gray-100 text-gray-800"}`}>
                          {bg}
                        </span>
                      </td>
                      <td className="py-2.5 font-medium">{qty}</td>
                      <td className="py-2.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor}`}>
                          {status === "Critical" && <AlertTriangle className="size-3" />}
                          {status === "Low" && <AlertTriangle className="size-3" />}
                          {status === "Adequate" && <CheckCircle className="size-3" />}
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
                    <th className="pb-2 font-medium">Seeker</th>
                    <th className="pb-2 font-medium">Group</th>
                    <th className="pb-2 font-medium">Units</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent_requests.map((r) => (
                    <tr key={r.id} className="border-b text-sm last:border-0 hover:bg-gray-50">
                      <td className="py-2.5">{r.seeker_name}</td>
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
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">No requests yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
