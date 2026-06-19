import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getAssessment, getDonorAssessmentHistory } from "@/features/admin/api/admin";
import { Loader2, ArrowLeft, CheckCircle, XCircle, User, Calendar, Heart } from "lucide-react";

export function ViewAssessment() {
  const { id } = useParams();

  const { data: assessment, isLoading } = useQuery({
    queryKey: ["admin-assessment", id],
    queryFn: async () => {
      const res = await getAssessment(id);
      return res.data;
    },
    enabled: !!id,
  });

  const { data: history } = useQuery({
    queryKey: ["donor-assessment-history", assessment?.donor_id],
    queryFn: async () => {
      const res = await getDonorAssessmentHistory(assessment.donor_id);
      return res.data;
    },
    enabled: !!assessment?.donor_id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        Assessment not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/admin/assessments" className="mb-4 inline-flex items-center gap-1 text-sm text-red-600 hover:underline">
        <ArrowLeft className="size-4" /> Back to Assessments
      </Link>

      <h2 className="mb-1 text-2xl font-bold">Assessment Details</h2>
      <hr className="mb-6" />

      {/* Main Assessment Card */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-red-50 px-6 py-3">
          <h5 className="flex items-center gap-2 font-semibold text-red-800">
            <Heart className="size-4" />
            Assessment #{assessment.id}
          </h5>
        </div>
        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Donor Name</p>
              <p className="font-medium">{assessment.donor_name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Blood Group</p>
              <p className="font-medium">{assessment.blood_group}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Age / Gender</p>
              <p className="font-medium">{assessment.age ?? "N/A"} / {assessment.gender ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                <Calendar className="mr-1 inline size-3" />
                Assessment Date
              </p>
              <p className="font-medium">{assessment.assessment_date}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Blood Pressure</p>
              <p className="font-medium">{assessment.blood_pressure || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Hemoglobin</p>
              <p className="font-medium">{assessment.hemoglobin ? `${assessment.hemoglobin} g/dL` : "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Temperature</p>
              <p className="font-medium">{assessment.temperature ? `${assessment.temperature}℃` : "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pulse Rate</p>
              <p className="font-medium">{assessment.pulse ? `${assessment.pulse} bpm` : "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Weight</p>
              <p className="font-medium">{assessment.weight ? `${assessment.weight} kg` : "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Eligibility</p>
              {assessment.is_eligible ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                  <CheckCircle className="size-3" /> Eligible
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
                  <XCircle className="size-3" /> Not Eligible
                </span>
              )}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Assessed By</p>
              <p className="font-medium">{assessment.assessed_by}</p>
            </div>
            {assessment.notes && (
              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground">Comments</p>
                <p className="whitespace-pre-wrap font-medium">{assessment.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Assessment History */}
      <div className="mt-6 rounded-xl border bg-white shadow-sm">
        <div className="flex items-center gap-2 bg-blue-600 px-6 py-3 text-white">
          <User className="size-4" />
          <h5 className="font-semibold">Assessment History - {assessment.donor_name}</h5>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-50 text-xs uppercase text-blue-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">BP</th>
                <th className="px-4 py-3 font-semibold">Hb</th>
                <th className="px-4 py-3 font-semibold">Temp</th>
                <th className="px-4 py-3 font-semibold">Pulse</th>
                <th className="px-4 py-3 font-semibold">Wt</th>
                <th className="px-4 py-3 font-semibold">Eligible</th>
                <th className="px-4 py-3 font-semibold">By</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {history?.length > 0 ? history.map((h) => (
                <tr key={h.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{h.assessment_date}</td>
                  <td className="px-4 py-3">{h.blood_pressure || "—"}</td>
                  <td className="px-4 py-3">{h.hemoglobin ? `${h.hemoglobin}` : "—"}</td>
                  <td className="px-4 py-3">{h.temperature ? `${h.temperature}℃` : "—"}</td>
                  <td className="px-4 py-3">{h.pulse ? `${h.pulse}` : "—"}</td>
                  <td className="px-4 py-3">{h.weight ? `${h.weight}` : "—"}</td>
                  <td className="px-4 py-3">
                    {h.is_eligible ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">Yes</span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs">{h.assessed_by}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/assessments/${h.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No other assessments found for this donor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
