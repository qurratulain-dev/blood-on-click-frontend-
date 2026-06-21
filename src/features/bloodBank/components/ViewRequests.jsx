import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRequests, updateRequestStatus, getStock } from "@/features/bloodBank/api/bloodBank";
import { GROUP_COLORS } from "@/config/constants";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  ClipboardList, CheckCircle, XCircle, Loader2, Search, RefreshCw,
  AlertTriangle, Phone, User, Droplet, Syringe, Clock,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export function ViewRequests() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: requests, isLoading } = useQuery({
    queryKey: ["blood-bank-requests"],
    queryFn: async () => {
      const res = await getRequests();
      return res.data;
    },
  });

  const { data: stockData } = useQuery({
    queryKey: ["blood-bank-stock"],
    queryFn: async () => {
      const res = await getStock();
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }) => updateRequestStatus(id, status),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["blood-bank-requests"] });
      queryClient.invalidateQueries({ queryKey: ["blood-bank-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["blood-bank-stock"] });
      toast.success(res.data?.message || "Request status updated");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update status");
    },
  });

  const handleAction = (id, status, details) => {
    if (status === "approved") {
      if (!confirm(`Approve this request for ${details.quantity} unit(s) of ${details.blood_group} blood?`)) return;
    } else if (status === "rejected") {
      if (!confirm("Are you sure you want to cancel this request?")) return;
    } else if (status === "fulfilled") {
      if (!confirm("Mark this request as completed?")) return;
    }
    mutation.mutate({ id, status });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-red-600" />
      </div>
    );
  }

  const stockMap = {};
  (stockData || []).forEach((s) => { stockMap[s.blood_group] = s; });

  const filtered = (requests || []).filter((r) => {
    const matchesFilter = filter === "all" || r.status === filter;
    const matchesSearch = !searchQuery ||
      r.seeker_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.seeker_phone?.includes(searchQuery) ||
      r.blood_group?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.hospital_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: requests?.length || 0,
    pending: requests?.filter((r) => r.status === "pending").length || 0,
    approved: requests?.filter((r) => r.status === "approved").length || 0,
    fulfilled: requests?.filter((r) => r.status === "fulfilled").length || 0,
    rejected: requests?.filter((r) => r.status === "rejected").length || 0,
  };

  const tabs = [
    { key: "all", label: "All", count: counts.all },
    { key: "pending", label: "Pending", count: counts.pending },
    { key: "approved", label: "Approved", count: counts.approved },
    { key: "fulfilled", label: "Completed", count: counts.fulfilled },
    { key: "rejected", label: "Cancelled", count: counts.rejected },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Manage Blood Requests</h2>
          <p className="text-sm text-muted-foreground">View, approve and manage incoming blood requests</p>
        </div>
      </div>
      <hr className="mb-6" />

      {/* Search & Filter */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, phone, blood group, hospital..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") setSearchQuery(searchInput); }}
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>
        <button
          onClick={() => setSearchQuery(searchInput)}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Search
        </button>
        {searchQuery && (
          <button
            onClick={() => { setSearchInput(""); setSearchQuery(""); }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Clear
          </button>
        )}
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ["blood-bank-requests"] })}
          className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          <RefreshCw className="size-4" />
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === tab.key
                ? "bg-red-600 text-white"
                : "border bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
            <span className={`rounded-full px-2 py-0.5 text-xs ${
              filter === tab.key ? "bg-red-500 text-white" : "bg-gray-100 text-gray-500"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-red-50 px-5 py-3">
          <h5 className="flex items-center gap-2 font-semibold text-red-800">
            <ClipboardList className="size-4" />
            Blood Requests
          </h5>
        </div>
        <div className="p-5">
          {filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-muted-foreground">
                    <th className="pb-2 font-medium">ID</th>
                    <th className="pb-2 font-medium">Seeker</th>
                    <th className="pb-2 font-medium">Contact</th>
                    <th className="pb-2 font-medium">Group</th>
                    <th className="pb-2 font-medium">Units</th>
                    <th className="pb-2 font-medium">Patient</th>
                    <th className="pb-2 font-medium">Hospital</th>
                    <th className="pb-2 font-medium">Urgency</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b text-sm last:border-0 hover:bg-gray-50">
                      <td className="py-2.5 font-mono text-xs text-gray-400">#{r.id}</td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <User className="size-4 text-gray-400" />
                          <span className="font-medium">{r.seeker_name}</span>
                        </div>
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Phone className="size-3" />
                          {r.seeker_phone}
                        </div>
                      </td>
                      <td className="py-2.5">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${GROUP_COLORS[r.blood_group] || "bg-gray-100 text-gray-800"}`}>
                          {r.blood_group}
                        </span>
                      </td>
                      <td className="py-2.5 font-medium">{r.quantity}</td>
                      <td className="py-2.5">{r.patient_name || "—"}{r.patient_age ? ` (${r.patient_age})` : ""}</td>
                      <td className="py-2.5 text-gray-500">{r.hospital_name || "—"}</td>
                      <td className="py-2.5">
                        {r.urgency === "emergency" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
                            <AlertTriangle className="size-3" />
                            EMERGENCY
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                            Normal
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 text-xs text-gray-500">{r.requested_date}</td>
                      <td className="py-2.5">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="py-2.5 text-right">
                        {r.status === "pending" && (
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => handleAction(r.id, "approved", r)}
                              disabled={mutation.isPending}
                              className="flex items-center gap-1 rounded bg-green-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
                            >
                              <CheckCircle className="size-3" /> Approve
                            </button>
                            <button
                              onClick={() => handleAction(r.id, "rejected")}
                              disabled={mutation.isPending}
                              className="flex items-center gap-1 rounded bg-red-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                              <XCircle className="size-3" /> Cancel
                            </button>
                          </div>
                        )}
                        {r.status === "approved" && (
                          <button
                            onClick={() => handleAction(r.id, "fulfilled")}
                            disabled={mutation.isPending}
                            className="flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                          >
                            <CheckCircle className="size-3" /> Complete
                          </button>
                        )}
                        {r.status === "fulfilled" && (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle className="size-3" /> Done
                          </span>
                        )}
                        {r.status === "rejected" && (
                          <span className="inline-flex items-center gap-1 text-xs text-red-400">
                            <XCircle className="size-3" /> Cancelled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <ClipboardList className="size-12 text-gray-300" />
              <p className="text-sm text-muted-foreground">No requests found</p>
            </div>
          )}
        </div>
      </div>

      {/* Stock Summary Card */}
      <div className="mt-6 rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-blue-50 px-5 py-3">
          <h5 className="flex items-center gap-2 font-semibold text-blue-800">
            <Droplet className="size-4" />
            Your Current Stock Summary
          </h5>
        </div>
        <div className="p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stockData?.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border p-3">
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${GROUP_COLORS[s.blood_group] || "bg-gray-100 text-gray-800"}`}>
                  {s.blood_group}
                </span>
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  s.quantity < 10 ? "bg-red-100 text-red-800" :
                  s.quantity < 30 ? "bg-yellow-100 text-yellow-800" :
                  "bg-green-100 text-green-800"
                }`}>
                  {s.quantity} units
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
