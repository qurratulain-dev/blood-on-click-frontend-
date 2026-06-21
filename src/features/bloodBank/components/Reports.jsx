import { useQuery } from "@tanstack/react-query";
import { getReports } from "@/features/bloodBank/api/bloodBank";
import { GROUP_COLORS } from "@/config/constants";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts";
import {
  BarChart3, Droplet, Users, Activity, Loader2, Calendar, Filter,
} from "lucide-react";
import { useState } from "react";

const today = new Date().toISOString().split("T")[0];
const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0];

export function Reports() {
  const [dateRange, setDateRange] = useState({ from: firstOfMonth, to: today });
  const [queryParams, setQueryParams] = useState({ from: firstOfMonth, to: today });

  const { data, isLoading } = useQuery({
    queryKey: ["blood-bank-reports", queryParams],
    queryFn: async () => {
      const res = await getReports(queryParams);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const summaryCards = [
    { icon: Droplet, label: "Total Donations", value: data?.total_donations, color: "bg-blue-50 text-blue-600" },
    { icon: BarChart3, label: "Total Units Collected", value: data?.total_units, color: "bg-green-50 text-green-600" },
    { icon: Users, label: "Unique Donors", value: data?.unique_donors, color: "bg-purple-50 text-purple-600" },
    { icon: Activity, label: "Avg Units/Donation", value: data?.avg_units, color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-sm text-muted-foreground">View donation reports and trends</p>
        </div>
      </div>
      <hr className="mb-6" />

      {/* Date Filter */}
      <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 flex items-center gap-1 text-xs font-medium text-gray-600">
              <Calendar className="size-3" /> Start Date
            </label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange((p) => ({ ...p, from: e.target.value }))}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1 text-xs font-medium text-gray-600">
              <Calendar className="size-3" /> End Date
            </label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange((p) => ({ ...p, to: e.target.value }))}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
          <button
            onClick={() => setQueryParams({ from: dateRange.from, to: dateRange.to })}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            <Filter className="size-4" />
            Filter
          </button>
          <button
            onClick={() => {
              const end = new Date();
              const start = new Date(end.getFullYear(), end.getMonth(), 1);
              const f = start.toISOString().split("T")[0];
              const t = end.toISOString().split("T")[0];
              setDateRange({ from: f, to: t });
              setQueryParams({ from: f, to: t });
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            This Month
          </button>
          <button
            onClick={() => {
              const end = new Date();
              const start = new Date(end.getFullYear() - 1, end.getMonth(), 1);
              const f = start.toISOString().split("T")[0];
              const t = end.toISOString().split("T")[0];
              setDateRange({ from: f, to: t });
              setQueryParams({ from: f, to: t });
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Last 12 Months
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-red-600" />
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {summaryCards.map((card) => (
              <div key={card.label} className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`flex size-12 items-center justify-center rounded-full ${card.color}`}>
                    <card.icon className="size-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{card.value ?? "—"}</p>
                    <p className="text-sm text-muted-foreground">{card.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Donation History Table */}
          <div className="mb-6 rounded-xl border bg-white shadow-sm">
            <div className="border-b bg-red-50 px-5 py-3">
              <h5 className="flex items-center gap-2 font-semibold text-red-800">
                <Droplet className="size-4" />
                Donation History
              </h5>
            </div>
            <div className="p-5">
              {data?.donations?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b text-xs uppercase text-muted-foreground">
                        <th className="pb-2 font-medium">Date</th>
                        <th className="pb-2 font-medium">Donor Name</th>
                        <th className="pb-2 font-medium">Blood Group</th>
                        <th className="pb-2 font-medium">Phone</th>
                        <th className="pb-2 font-medium">Units</th>
                        <th className="pb-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.donations.map((d) => (
                        <tr key={d.id} className="border-b text-sm last:border-0 hover:bg-gray-50">
                          <td className="py-2.5">{d.donation_date}</td>
                          <td className="py-2.5 font-medium">{d.donor_name}</td>
                          <td className="py-2.5">
                            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${GROUP_COLORS[d.blood_group] || "bg-gray-100 text-gray-800"}`}>
                              {d.blood_group}
                            </span>
                          </td>
                          <td className="py-2.5 text-gray-500">{d.phone}</td>
                          <td className="py-2.5 font-medium">{d.quantity}</td>
                          <td className="py-2.5">
                            <StatusBadge status={d.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">No donations found in this period</p>
              )}
            </div>
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Blood Group Distribution */}
            <div className="rounded-xl border bg-white shadow-sm">
              <div className="border-b bg-blue-50 px-5 py-3">
                <h5 className="flex items-center gap-2 font-semibold text-blue-800">
                  <BarChart3 className="size-4" />
                  Blood Group Distribution
                </h5>
              </div>
              <div className="p-5">
                {data?.group_distribution?.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.group_distribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="blood_group" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="total_units" fill="#dc3545" radius={[4, 4, 0, 0]} name="Units" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="py-12 text-center text-sm text-muted-foreground">No data available</p>
                )}
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="rounded-xl border bg-white shadow-sm">
              <div className="border-b bg-green-50 px-5 py-3">
                <h5 className="flex items-center gap-2 font-semibold text-green-800">
                  <Activity className="size-4" />
                  Monthly Trends
                </h5>
              </div>
              <div className="p-5">
                {data?.monthly_trends?.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.monthly_trends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="total_units"
                        stroke="#dc3545"
                        strokeWidth={2}
                        dot={{ fill: "#dc3545", r: 4 }}
                        name="Units"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="py-12 text-center text-sm text-muted-foreground">No data available</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
