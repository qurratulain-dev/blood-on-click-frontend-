import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getDonations, verifyDonation, rejectDonation, moveToPending, uploadMedicalReport } from "@/features/admin/api/admin";
import { BLOOD_GROUPS } from "@/config/constants";
import { 
  Loader2, Clock, CheckCircle, XCircle, Droplet, Upload, FileText,
  Eye, Undo2, FilePlus2, Info
} from "lucide-react";
import toast from "react-hot-toast";

const groupColors = {
  "A+": "bg-red-100 text-red-800", "A-": "bg-pink-100 text-pink-800",
  "B+": "bg-orange-100 text-orange-800", "B-": "bg-amber-100 text-amber-800",
  "AB+": "bg-purple-100 text-purple-800", "AB-": "bg-violet-100 text-violet-800",
  "O+": "bg-green-100 text-green-800", "O-": "bg-teal-100 text-teal-800",
};

const tabs = [
  { key: "pending", icon: Clock, label: "Pending", color: "yellow" },
  { key: "completed", icon: CheckCircle, label: "Completed", color: "green" },
  { key: "cancelled", icon: XCircle, label: "Cancelled", color: "red" },
];

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-xl border bg-white p-5 text-center shadow-sm">
      <Icon className={`mx-auto size-7 ${color || "text-red-600"}`} />
      <p className={`mt-1 text-2xl font-bold ${color || "text-gray-900"}`}>{value ?? "—"}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function UploadModal({ donation, onClose }) {
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => uploadMedicalReport(formData),
    onSuccess: () => {
      toast.success("Medical report uploaded!");
      queryClient.invalidateQueries({ queryKey: ["admin-donations"] });
      onClose();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Upload failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) { setError("Please select a file"); return; }
    const fd = new FormData();
    fd.append("donation_id", donation.id);
    fd.append("medical_report", file);
    mutate(fd);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between rounded-t-xl bg-blue-600 px-5 py-3 text-white">
          <h5 className="flex items-center gap-2 font-semibold"><Upload className="size-4" /> Upload Medical Report</h5>
          <button onClick={onClose} className="text-white/80 hover:text-white">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-5">
          <p className="mb-2 text-sm"><strong>Donor:</strong> {donation.donor_name}</p>
          <p className="mb-3 text-sm"><strong>Blood Group:</strong> <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${groupColors[donation.blood_group] || "bg-gray-100"}`}>{donation.blood_group}</span></p>
          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium">Medical Report (PDF/JPG/PNG)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => { setFile(e.target.files[0]); setError(""); }}
              className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm file:mr-3 file:rounded file:border-0 file:bg-red-50 file:px-3 file:py-1 file:text-sm file:font-medium file:text-red-700"
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={isPending} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
              {isPending ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DonationActions({ donation }) {
  const queryClient = useQueryClient();

  const verifyMut = useMutation({
    mutationFn: () => verifyDonation(donation.id),
    onSuccess: () => { toast.success("Donation verified! Stock updated."); queryClient.invalidateQueries({ queryKey: ["admin-donations"] }); },
    onError: (err) => toast.error(err.response?.data?.message || "Verification failed"),
  });

  const rejectMut = useMutation({
    mutationFn: () => rejectDonation(donation.id),
    onSuccess: () => { toast.success("Donation rejected"); queryClient.invalidateQueries({ queryKey: ["admin-donations"] }); },
    onError: (err) => toast.error("Failed to reject"),
  });

  const pendingMut = useMutation({
    mutationFn: () => moveToPending(donation.id),
    onSuccess: () => { toast.success("Moved to pending"); queryClient.invalidateQueries({ queryKey: ["admin-donations"] }); },
    onError: (err) => toast.error("Failed to move"),
  });

  if (donation.status === "pending") {
    return (
      <div className="flex flex-col gap-1.5">
        <button onClick={() => { if (confirm("Verify this donation? Blood stock will be updated.")) verifyMut.mutate(); }}
          className="inline-flex items-center justify-center gap-1 rounded bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700">
          <CheckCircle className="size-3" /> Verify & Complete
        </button>
        <button onClick={() => { if (confirm("Reject this donation?")) rejectMut.mutate(); }}
          className="inline-flex items-center justify-center gap-1 rounded bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700">
          <XCircle className="size-3" /> Reject
        </button>
        <Link to={`/admin/donations/${donation.id}/report`}
          className="inline-flex items-center justify-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
          <FilePlus2 className="size-3" /> Generate Report
        </Link>
      </div>
    );
  }

  if (donation.status === "completed") {
    return (
      <div className="flex flex-col gap-1.5">
        {donation.has_medical_report ? (
          <a href={donation.medical_report_url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 rounded bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100">
            <Eye className="size-3" /> View Report
          </a>
        ) : (
          <span className="text-xs text-muted-foreground">No report</span>
        )}
        <Link to={`/admin/donations/${donation.id}/report`}
          className="inline-flex items-center justify-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
          <FilePlus2 className="size-3" /> Medical Report
        </Link>
        <button onClick={() => { if (confirm("Move to pending?")) pendingMut.mutate(); }}
          className="inline-flex items-center justify-center gap-1 rounded bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-yellow-600">
          <Undo2 className="size-3" /> Move to Pending
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <button onClick={() => { if (confirm("Move to pending for review?")) pendingMut.mutate(); }}
        className="inline-flex items-center justify-center gap-1 rounded bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-yellow-600">
        <Undo2 className="size-3" /> Move to Pending
      </button>
    </div>
  );
}

function DonationTable({ donations, tab }) {
  const [uploadFor, setUploadFor] = useState(null);

  if (!donations?.length) {
    return (
      <div className="rounded-xl border bg-white py-16 text-center shadow-sm">
        <p className="text-muted-foreground">
          {tab === "pending" ? "No pending donations" : tab === "completed" ? "No completed donations" : "No cancelled donations"}
        </p>
      </div>
    );
  }

  const cols = tab === "cancelled"
    ? ["ID", "Donor Name", "Contact", "Blood Bank", "Date", "Group", "Units", "Actions"]
    : ["ID", "Donor Name", "Contact", "Blood Bank", "Date", "Group", "Units", "Report", "Actions"];

  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className={`text-xs uppercase ${
              tab === "pending" ? "bg-yellow-50 text-yellow-800" :
              tab === "completed" ? "bg-green-50 text-green-800" :
              "bg-red-50 text-red-800"
            }`}>
              <tr>
                {cols.map((c) => <th key={c} className="px-3 py-3 font-semibold">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.id} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-3 font-medium">{d.id}</td>
                  <td className="px-3 py-3"><strong>{d.donor_name}</strong></td>
                  <td className="px-3 py-3">
                    {d.donor_phone}<br /><span className="text-xs text-muted-foreground">{d.donor_email}</span>
                  </td>
                  <td className="px-3 py-3">{d.bank_name}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{d.donation_date}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${groupColors[d.blood_group] || "bg-gray-600"}`}>
                      {d.blood_group}
                    </span>
                  </td>
                  <td className="px-3 py-3">{d.quantity} unit(s)</td>
                  {tab !== "cancelled" && (
                    <td className="px-3 py-3">
                      {d.has_medical_report ? (
                        <a href={d.medical_report_url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100">
                          <Eye className="size-3" /> View
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                  )}
                  <td className="px-3 py-3">
                    <DonationActions donation={d} />
                    {tab !== "cancelled" && (
                      <button onClick={() => setUploadFor(d)}
                        className="mt-1 inline-flex w-full items-center justify-center gap-1 rounded bg-cyan-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-cyan-700">
                        <Upload className="size-3" /> Upload Report
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {uploadFor && <UploadModal donation={uploadFor} onClose={() => setUploadFor(null)} />}
    </>
  );
}

export function ManageDonations() {
  const [activeTab, setActiveTab] = useState("pending");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-donations", activeTab],
    queryFn: async () => {
      const res = await getDonations(activeTab);
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

  const counts = data?.counts || {};
  const filtered = (data?.donations || []).filter((d) => d.status === activeTab);

  const statCards = [
    { icon: Clock, label: "Pending Verification", value: counts.pending, color: "text-yellow-600" },
    { icon: CheckCircle, label: "Completed Donations", value: counts.completed, color: "text-green-600" },
    { icon: XCircle, label: "Cancelled Donations", value: counts.cancelled, color: "text-red-600" },
    { icon: Droplet, label: "Total Units Collected", value: counts.total_units, color: "text-red-600" },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <h2 className="mb-1 flex items-center gap-2 text-2xl font-bold">
        <Droplet className="size-6 text-red-600" />
        Manage Donations
      </h2>
      <hr className="mb-6" />

      {/* Stat Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-lg bg-gray-200 p-1">
        {tabs.map(({ key, icon: Icon, label, color }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition ${
              activeTab === key
                ? `bg-white text-${color === "yellow" ? "yellow" : color === "green" ? "green" : "red"}-700 shadow-sm`
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon className="size-4" />
            {label}
            {counts[key] > 0 && activeTab !== key && (
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                key === "pending" ? "bg-yellow-100 text-yellow-800" :
                key === "completed" ? "bg-green-100 text-green-800" :
                "bg-red-100 text-red-800"
              }`}>
                {counts[key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <DonationTable donations={filtered} tab={activeTab} />

      {/* Instructions */}
      <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
        <div className="flex items-start gap-2">
          <Info className="mt-0.5 size-4 shrink-0" />
          <div>
            <strong>How to Manage Donations:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li><strong>Verify & Complete:</strong> Confirms the donation, updates blood stock, and notifies the donor.</li>
              <li><strong>Reject:</strong> Cancels the donation record and notifies the donor.</li>
              <li><strong>Upload Report:</strong> Add medical reports for donors.</li>
              <li><strong>Generate Report:</strong> Create professional medical report for donor.</li>
              <li><strong>Move to Pending:</strong> Change status back to pending for review.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
