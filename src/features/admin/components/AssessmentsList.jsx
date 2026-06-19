import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAssessments } from "@/features/admin/api/admin";
import { BLOOD_GROUPS } from "@/config/constants";
import { Loader2, Plus, Eye, CheckCircle, XCircle } from "lucide-react";

const groupColors = {
  "A+": "bg-red-100 text-red-800", "A-": "bg-pink-100 text-pink-800",
  "B+": "bg-orange-100 text-orange-800", "B-": "bg-amber-100 text-amber-800",
  "AB+": "bg-purple-100 text-purple-800", "AB-": "bg-violet-100 text-violet-800",
  "O+": "bg-green-100 text-green-800", "O-": "bg-teal-100 text-teal-800",
};

export function AssessmentsList() {
  const { data: assessments, isLoading } = useQuery({
    queryKey: ["admin-assessments"],
    queryFn: async () => {
      const res = await getAssessments();
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

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-1 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Medical Assessments</h2>
        </div>
        <Link
          to="/admin/assessments/new"
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          <Plus className="size-4" />
          New Assessment
        </Link>
      </div>
      <hr className="mb-6" />

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-red-50 text-xs uppercase text-red-800">
              <tr>
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Donor</th>
                <th className="px-4 py-3 font-semibold">Blood Group</th>
                <th className="px-4 py-3 font-semibold">Assessment Date</th>
                <th className="px-4 py-3 font-semibold">BP</th>
                <th className="px-4 py-3 font-semibold">Hb</th>
                <th className="px-4 py-3 font-semibold">Temp</th>
                <th className="px-4 py-3 font-semibold">Pulse</th>
                <th className="px-4 py-3 font-semibold">Wt</th>
                <th className="px-4 py-3 font-semibold">Eligible</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessments?.length > 0 ? assessments.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{a.id}</td>
                  <td className="px-4 py-3">{a.donor_name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${groupColors[a.blood_group] || "bg-gray-100 text-gray-800"}`}>
                      {a.blood_group}
                    </span>
                  </td>
                  <td className="px-4 py-3">{a.assessment_date}</td>
                  <td className="px-4 py-3">{a.blood_pressure || "—"}</td>
                  <td className="px-4 py-3">{a.hemoglobin ? `${a.hemoglobin} g/dL` : "—"}</td>
                  <td className="px-4 py-3">{a.temperature ? `${a.temperature}℃` : "—"}</td>
                  <td className="px-4 py-3">{a.pulse ? `${a.pulse} bpm` : "—"}</td>
                  <td className="px-4 py-3">{a.weight ? `${a.weight} kg` : "—"}</td>
                  <td className="px-4 py-3">
                    {a.is_eligible ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                        <CheckCircle className="size-3" /> Eligible
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
                        <XCircle className="size-3" /> Not Eligible
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/assessments/${a.id}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                    >
                      <Eye className="size-3" /> View
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={11} className="px-4 py-12 text-center text-sm text-muted-foreground">
                    No assessments found.
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
