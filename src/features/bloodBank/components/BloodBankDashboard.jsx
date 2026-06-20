import { useBloodBankDashboard } from "@/features/bloodBank/hooks/useBloodBankDashboard";
import { BLOOD_GROUPS, GROUP_COLORS } from "@/config/constants";
import { DashboardStatCard } from "@/components/ui/dashboard-stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Droplet, HeartHandshake, Clock, FlaskConical, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

const stockStatus = (qty) => {
  if (qty < 10) return { label: "Critical", variant: "critical" };
  if (qty < 30) return { label: "Low", variant: "low" };
  return { label: "Adequate", variant: "adequate" };
};

export function BloodBankDashboard() {
  const { data, isLoading } = useBloodBankDashboard();

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

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => <DashboardStatCard key={s.label} {...s} />)}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
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
                  const status = s ? stockStatus(qty) : { label: "N/A", variant: null };
                  return (
                    <tr key={bg} className="border-b text-sm last:border-0 hover:bg-gray-50">
                      <td className="py-2.5">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${GROUP_COLORS[bg] || "bg-gray-100 text-gray-800"}`}>
                          {bg}
                        </span>
                      </td>
                      <td className="py-2.5 font-medium">{qty}</td>
                      <td className="py-2.5">
                        {status.variant ? <StatusBadge status={status.label} /> : <span className="text-muted-foreground">N/A</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
              <p className="py-8 text-center text-sm text-muted-foreground">No requests yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
