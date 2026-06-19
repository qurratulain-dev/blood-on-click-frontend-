import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getDonationDetails, generateMedicalReport } from "@/features/admin/api/admin";
import { Loader2, FileText, ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

export function GenerateReport() {
  const { id } = useParams();

  const { data: donation, isLoading, refetch } = useQuery({
    queryKey: ["admin-donation", id],
    queryFn: async () => {
      const res = await getDonationDetails(id);
      return res.data;
    },
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: generateMedicalReport,
    onSuccess: (res) => {
      toast.success("Medical report generated successfully!");
      refetch();
      window.open(res.data.medical_report_url, "_blank");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to generate report");
    },
  });

  const handleGenerate = () => {
    mutate({ donation_id: Number(id) });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        Donation not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 flex items-center gap-2">
        <Link to="/admin/donations" className="inline-flex items-center gap-1 text-sm text-red-600 hover:underline">
          <ArrowLeft className="size-4" /> Back to Donations
        </Link>
      </div>

      <h2 className="mb-1 flex items-center gap-2 text-2xl font-bold">
        <FileText className="size-6 text-red-600" />
        Generate Medical Report
      </h2>
      <hr className="mb-6" />

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="bg-red-600 px-6 py-3 text-white">
          <h5 className="flex items-center gap-2 font-semibold">
            <FileText className="size-4" />
            Donation Details
          </h5>
        </div>
        <div className="p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="w-2/5 bg-gray-50 px-3 py-2 font-medium">Donor Name</td>
                    <td className="px-3 py-2">{donation.donor_name}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-3 py-2 font-medium">Blood Group</td>
                    <td className="px-3 py-2">
                      <span className="inline-block rounded bg-red-600 px-2.5 py-0.5 text-xs font-bold text-white">
                        {donation.blood_group}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-3 py-2 font-medium">Units Donated</td>
                    <td className="px-3 py-2">{donation.quantity} unit(s)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-3 py-2 font-medium">Donation Date</td>
                    <td className="px-3 py-2">{donation.donation_date}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-3 py-2 font-medium">Status</td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        donation.status === "completed" ? "bg-green-100 text-green-800" :
                        donation.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        donation.status === "rejected" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="w-2/5 bg-gray-50 px-3 py-2 font-medium">Blood Bank</td>
                    <td className="px-3 py-2">{donation.bank_name}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-3 py-2 font-medium">Donor Email</td>
                    <td className="px-3 py-2">{donation.donor_email}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-3 py-2 font-medium">Donor Phone</td>
                    <td className="px-3 py-2">{donation.donor_phone}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-3 py-2 font-medium">Medical Report</td>
                    <td className="px-3 py-2">
                      {donation.medical_report_path ? (
                        <a
                          href={`/storage/${donation.medical_report_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                        >
                          <ExternalLink className="size-3" /> View Report
                        </a>
                      ) : (
                        <span className="text-muted-foreground">Not generated</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              onClick={handleGenerate}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              {isPending ? <Loader2 className="size-4 animate-spin" /> : <FileText className="size-4" />}
              {isPending ? "Generating..." : "Generate Medical Report"}
            </button>
            <Link
              to="/admin/donations"
              className="inline-flex items-center gap-2 rounded-lg border bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Donations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
