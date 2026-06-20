import { useAdminDashboard } from "@/features/admin/hooks/useAdminDashboard";
import { BLOOD_GROUPS, GROUP_COLORS } from "@/config/constants";
import { DashboardStatCard } from "@/components/ui/dashboard-stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Users, Building2, Heart, Droplet, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

function DonationRow({ d }) {
  return (
    <tr className="border-b text-sm last:border-0 hover:bg-gray-50">
      <td className="py-2.5 pl-4">{d.donor_name}</td>
      <td className="py-2.5">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${GROUP_COLORS[d.blood_group] || "bg-gray-100 text-gray-800"}`}>
          {d.blood_group}
        </span>
      </td>
      <td className="py-2.5">{d.bank_name}</td>
      <td className="py-2.5">{d.quantity}</td>
      <td className="py-2.5">{d.donation_date}</td>
      <td className="py-2.5 pr-4">
        <StatusBadge status={d.status} />
      </td>
    </tr>
  );
}

export function AdminDashboard() {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-red-600" />
      </div>
    );
  }

  const stats = [
    { icon: Users, label: "Total Donors", value: data?.donors },
    { icon: Building2, label: "Blood Banks", value: data?.blood_banks },
    { icon: Heart, label: "Total Seekers", value: data?.seekers },
    { icon: Droplet, label: "Total Requests", value: data?.total_requests },
    { icon: AlertCircle, label: "Pending Requests", value: data?.pending_requests, sub: "Awaiting action" },
  ];

  const stockMap = {};
  if (data?.stock_summary) {
    data.stock_summary.forEach((s) => { stockMap[s.blood_group] = s.total; });
  }

  const stockStatus = (qty) => {
    if (qty >= 50) return "Adequate";
    if (qty >= 20) return "Moderate";
    return "Low";
  };

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-1 text-2xl font-bold">Admin Dashboard</h2>
      <hr className="mb-6" />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((s) => <DashboardStatCard key={s.label} {...s} />)}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="border-b bg-red-50 px-5 py-3">
            <h5 className="flex items-center gap-2 font-semibold text-red-800">
              <Droplet className="size-4" />
              Blood Stock Summary
            </h5>
          </div>
          <div className="p-5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-xs uppercase text-muted-foreground">
                  <th className="pb-2 font-medium">Blood Group</th>
                  <th className="pb-2 font-medium">Total Units</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {BLOOD_GROUPS.map((bg) => {
                  const qty = stockMap[bg] || 0;
                  return (
                    <tr key={bg} className="border-b text-sm last:border-0 hover:bg-gray-50">
                      <td className="py-2.5">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${GROUP_COLORS[bg] || "bg-gray-100 text-gray-800"}`}>
                          {bg}
                        </span>
                      </td>
                      <td className="py-2.5 font-medium">{qty} units</td>
                      <td className="py-2.5">
                        <StatusBadge status={stockStatus(qty)} />
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
              <CheckCircle className="size-4" />
              Recent Donations
            </h5>
          </div>
          <div className="p-5">
            {data?.recent_donations?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-xs uppercase text-muted-foreground">
                      <th className="pb-2 pl-4 font-medium">Donor</th>
                      <th className="pb-2 font-medium">Group</th>
                      <th className="pb-2 font-medium">Bank</th>
                      <th className="pb-2 font-medium">Units</th>
                      <th className="pb-2 font-medium">Date</th>
                      <th className="pb-2 pr-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recent_donations.map((d) => <DonationRow key={d.id} d={d} />)}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">No donations yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
