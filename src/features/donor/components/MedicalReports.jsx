import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDonations, uploadDonationReport } from "@/features/donor/api/donor";
import { GROUP_COLORS } from "@/config/constants";
import { Loader2, FileText, Upload, X, RefreshCw, Download, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function MedicalReports() {
  const queryClient = useQueryClient();
  const [showUploadModal, setShowUploadModal] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  const { data: donations, isLoading } = useQuery({
    queryKey: ["donor-donations"],
    queryFn: async () => {
      const res = await getDonations();
      return res.data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: ({ id, file }) => {
      const fd = new FormData();
      fd.append("file", file);
      return uploadDonationReport(id, fd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donor-donations"] });
      setShowUploadModal(null);
      setUploadFile(null);
      toast.success("Medical report uploaded successfully!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to upload report");
    },
  });

  const handleUpload = (e) => {
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

  const completed = (donations || []).filter((d) => d.status === "completed");

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Medical Reports</h2>
          <p className="text-sm text-muted-foreground">Upload and view medical reports for your completed donations</p>
        </div>
      </div>
      <hr className="mb-6" />

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-red-50 px-5 py-3">
          <h5 className="flex items-center gap-2 font-semibold text-red-800">
            <FileText className="size-4" />
            Donation Medical Reports
          </h5>
        </div>
        <div className="p-5">
          {completed.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-muted-foreground">
                    <th className="pb-2 font-medium">Donation Date</th>
                    <th className="pb-2 font-medium">Blood Bank</th>
                    <th className="pb-2 font-medium">Blood Group</th>
                    <th className="pb-2 font-medium">Units</th>
                    <th className="pb-2 font-medium">Medical Report</th>
                    <th className="pb-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {completed.map((d) => (
                    <tr key={d.id} className="border-b text-sm last:border-0 hover:bg-gray-50">
                      <td className="py-2.5 whitespace-nowrap">{d.donation_date_formatted || d.donation_date}</td>
                      <td className="py-2.5">{d.bank_name}</td>
                      <td className="py-2.5">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${GROUP_COLORS[d.blood_group] || "bg-gray-100 text-gray-800"}`}>
                          {d.blood_group}
                        </span>
                      </td>
                      <td className="py-2.5">{d.quantity}</td>
                      <td className="py-2.5">
                        {d.medical_report_url ? (
                          <a
                            href={d.medical_report_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-200"
                          >
                            <Download className="size-3" />
                            View Report
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">Not uploaded</span>
                        )}
                      </td>
                      <td className="py-2.5">
                        <button
                          onClick={() => setShowUploadModal(d.id)}
                          className="inline-flex items-center gap-1.5 rounded bg-blue-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-700"
                        >
                          <Upload className="size-3" />
                          {d.medical_report_url ? "Update Report" : "Upload Report"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <FileText className="size-12 text-gray-300" />
              <p className="text-sm text-muted-foreground">No completed donations found. Complete a donation to upload medical reports.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
        <div className="flex items-start gap-2">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <div>
            <strong>Note:</strong> Medical reports are important for tracking your health after each donation.
            Please upload your reports for future reference. Only verified donations can have medical reports.
          </div>
        </div>
      </div>

      {/* Upload Modal */}
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
            <form onSubmit={handleUpload} className="p-6 space-y-4">
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
