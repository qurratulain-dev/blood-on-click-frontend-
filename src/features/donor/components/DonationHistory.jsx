import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDonations, createDonation, getDonorDashboard, uploadDonationReport } from "@/features/donor/api/donor";
import { searchBanks } from "@/features/donor/api/donor";
import { GROUP_COLORS } from "@/config/constants";
import { StatusBadge } from "@/components/ui/status-badge";
import { DashboardStatCard } from "@/components/ui/dashboard-stat-card";
import {
  Droplet, Heart, Award, Clock, History, Loader2, RefreshCw,
  PlusCircle, Upload, FileText, Eye, X, CheckCircle,
  AlertTriangle, Banknote, Calendar, Search,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function DonationHistory() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [formData, setFormData] = useState({
    bank_id: "",
    donation_date: "",
    quantity: "1",
  });

  const { data: dashboard } = useQuery({
    queryKey: ["donor-dashboard"],
    queryFn: async () => {
      const res = await getDonorDashboard();
      return res.data;
    },
  });

  const { data: donations, isLoading } = useQuery({
    queryKey: ["donor-donations"],
    queryFn: async () => {
      const res = await getDonations();
      return res.data;
    },
  });

  const { data: banks } = useQuery({
    queryKey: ["donor-banks"],
    queryFn: async () => {
      const res = await searchBanks({});
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => createDonation(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["donor-donations"] });
      queryClient.invalidateQueries({ queryKey: ["donor-dashboard"] });
      setShowAddModal(false);
      setFormData({ bank_id: "", donation_date: "", quantity: "1" });
      toast.success(res.data?.message || "Donation recorded successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to record donation");
    },
  });

  const uploadMutation = useMutation({
    mutationFn: ({ id, file }) => {
      const fd = new FormData();
      fd.append("file", file);
      return uploadDonationReport(id, fd);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["donor-donations"] });
      setShowUploadModal(null);
      setUploadFile(null);
      toast.success(res.data?.message || "Report uploaded successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to upload report");
    },
  });

  const handleSubmitDonation = (e) => {
    e.preventDefault();
    if (!formData.bank_id || !formData.donation_date) {
      toast.error("Please fill in all required fields");
      return;
    }
    createMutation.mutate({
      bank_id: Number(formData.bank_id),
      blood_group: dashboard?.profile?.blood_group,
      quantity: Number(formData.quantity),
      donation_date: formData.donation_date,
    });
  };

  const handleUploadReport = (e) => {
    e.preventDefault();
    if (!uploadFile) {
      toast.error("Please select a file");
      return;
    }
    uploadMutation.mutate({ id: showUploadModal, file: uploadFile });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-red-600" />
      </div>
    );
  }

  const profile = dashboard?.profile;
  const pendingCount = donations?.filter((d) => d.status === "pending").length || 0;
  const completedCount = donations?.filter((d) => d.status === "completed").length || 0;
  const totalUnits = donations?.filter((d) => d.status === "completed").reduce((sum, d) => sum + d.quantity, 0) || 0;

  const filtered = (donations || []).filter((d) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      d.bank_name?.toLowerCase().includes(term) ||
      d.blood_group?.toLowerCase().includes(term) ||
      d.status?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Donation History & Medical Reports</h2>
          <p className="text-sm text-muted-foreground">Track your donations and upload medical reports</p>
        </div>
      </div>
      <hr className="mb-6" />

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 text-center shadow-sm">
          <Droplet className="mx-auto mb-2 size-8 text-red-600" />
          <h3 className="text-2xl font-bold text-red-700">{profile?.blood_group || "—"}</h3>
          <p className="text-sm text-muted-foreground">Your Blood Group</p>
        </div>
        <DashboardStatCard icon={Heart} label="Total Donations" value={donations?.length || 0} />
        <DashboardStatCard icon={Award} label="Units Donated" value={totalUnits} />
        <div className="rounded-xl border bg-white p-5 text-center shadow-sm">
          <Clock className={`mx-auto mb-2 size-8 ${pendingCount > 0 ? "text-yellow-500" : "text-gray-400"}`} />
          <h3 className="text-2xl font-bold text-yellow-600">{pendingCount}</h3>
          <p className="text-sm text-muted-foreground">Pending Verification</p>
        </div>
      </div>

      {/* Record New Donation Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
        >
          <PlusCircle className="size-4" />
          Record New Donation
        </button>
      </div>

      {/* Search & Refresh */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by bank, blood group, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>
        <button
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ["donor-donations"] });
            queryClient.invalidateQueries({ queryKey: ["donor-dashboard"] });
          }}
          className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          <RefreshCw className="size-4" />
          Refresh
        </button>
      </div>

      {/* Donations Table */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-red-50 px-5 py-3">
          <h5 className="flex items-center gap-2 font-semibold text-red-800">
            <History className="size-4" />
            All Donation Records
          </h5>
        </div>
        <div className="p-5">
          {filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-muted-foreground">
                    <th className="pb-2 font-medium">#</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Blood Bank</th>
                    <th className="pb-2 font-medium">Location</th>
                    <th className="pb-2 font-medium">Group</th>
                    <th className="pb-2 font-medium">Units</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Medical Report</th>
                    <th className="pb-2 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d, idx) => (
                    <tr key={d.id} className="border-b text-sm last:border-0 hover:bg-gray-50">
                      <td className="py-2.5 font-mono text-xs text-gray-400">{idx + 1}</td>
                      <td className="py-2.5 whitespace-nowrap">{d.donation_date_formatted || d.donation_date}</td>
                      <td className="py-2.5 font-medium">{d.bank_name}</td>
                      <td className="py-2.5 max-w-[150px] truncate text-gray-500" title={d.bank_address}>
                        {d.bank_address?.length > 30 ? d.bank_address.substring(0, 30) + "..." : d.bank_address || "—"}
                      </td>
                      <td className="py-2.5">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${GROUP_COLORS[d.blood_group] || "bg-gray-100 text-gray-800"}`}>
                          {d.blood_group}
                        </span>
                      </td>
                      <td className="py-2.5 font-medium">{d.quantity}</td>
                      <td className="py-2.5">
                        <StatusBadge status={d.status} />
                      </td>
                      <td className="py-2.5">
                        {d.medical_report_url ? (
                          <a
                            href={d.medical_report_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                          >
                            <FileText className="size-3" />
                            <span className="text-xs">View</span>
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">Not uploaded</span>
                        )}
                      </td>
                      <td className="py-2.5 text-right">
                        {d.status === "completed" && !d.medical_report_url ? (
                          <button
                            onClick={() => setShowUploadModal(d.id)}
                            className="inline-flex items-center gap-1 rounded bg-blue-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-700"
                          >
                            <Upload className="size-3" />
                            Upload Report
                          </button>
                        ) : d.status === "pending" ? (
                          <span className="text-xs text-yellow-600">Awaiting Verification</span>
                        ) : d.status === "completed" && d.medical_report_url ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle className="size-3" />
                            Uploaded
                          </span>
                        ) : d.status === "rejected" ? (
                          <span className="text-xs text-red-400">Rejected</span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <Droplet className="size-12 text-gray-300" />
              <p className="text-sm text-muted-foreground">No donation records found</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-sm font-medium text-red-600 hover:text-red-800"
              >
                Record your first donation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Thank You Message */}
      {completedCount > 0 && (
        <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-800">
          <div className="flex items-start gap-2">
            <Heart className="mt-0.5 size-5 shrink-0 text-green-600" />
            <div>
              <strong>Thank you for your generosity!</strong> Your donations have helped save many lives.
              You've made a difference in {completedCount} verified donation drive{(completedCount > 1 ? "s" : "")}.
            </div>
          </div>
        </div>
      )}

      {/* Add Donation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between rounded-t-xl bg-red-600 px-6 py-4 text-white">
              <h5 className="flex items-center gap-2 font-semibold">
                <Heart className="size-4" />
                Record New Donation
              </h5>
              <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white">
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitDonation} className="p-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Blood Bank <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.bank_id}
                  onChange={(e) => setFormData({ ...formData, bank_id: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  required
                >
                  <option value="">Select Blood Bank</option>
                  {(banks || []).map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.bank_name} - {b.address?.substring(0, 50)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Donation Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.donation_date}
                  onChange={(e) => setFormData({ ...formData, donation_date: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Blood Group</label>
                <input
                  type="text"
                  value={profile?.blood_group || ""}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                  disabled
                />
                <p className="mt-1 text-xs text-muted-foreground">Your blood group is auto-filled</p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Units Donated <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  min="1"
                  max="2"
                  required
                />
                <p className="mt-1 text-xs text-muted-foreground">Typically 1 unit = 450ml of blood</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                  <span>Your donation record will be pending until admin verification.</span>
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {createMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Heart className="size-4" />}
                  Submit Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Report Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between rounded-t-xl bg-blue-600 px-6 py-4 text-white">
              <h5 className="flex items-center gap-2 font-semibold">
                <Upload className="size-4" />
                Upload Medical Report
              </h5>
              <button onClick={() => { setShowUploadModal(null); setUploadFile(null); }} className="text-white/80 hover:text-white">
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleUploadReport} className="p-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Select Medical Report (PDF/JPG/PNG) <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
                <p className="mt-1 text-xs text-muted-foreground">Upload your post-donation medical report for records.</p>
              </div>
              <div className="flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => { setShowUploadModal(null); setUploadFile(null); }}
                  className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadMutation.isPending || !uploadFile}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {uploadMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
