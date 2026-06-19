import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createAssessment, getAssessmentDonors } from "@/features/admin/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ClipboardList } from "lucide-react";
import toast from "react-hot-toast";

export function NewAssessment() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: donors } = useQuery({
    queryKey: ["assessment-donors"],
    queryFn: async () => {
      const res = await getAssessmentDonors();
      return res.data;
    },
  });

  const initialState = {
    donor_id: "",
    assessment_date: new Date().toISOString().split("T")[0],
    blood_pressure: "",
    hemoglobin: "",
    temperature: "",
    pulse: "",
    weight: "",
    is_eligible: "1",
    notes: "",
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const { mutate, isPending } = useMutation({
    mutationFn: createAssessment,
    onSuccess: () => {
      toast.success("Assessment created successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-assessments"] });
      navigate("/admin/assessments");
    },
    onError: (error) => {
      const data = error.response?.data;
      if (data?.errors) {
        const fieldErrors = {};
        Object.keys(data.errors).forEach((key) => {
          fieldErrors[key] = data.errors[key][0];
        });
        setErrors(fieldErrors);
      }
      toast.error(data?.message || "Failed to create assessment");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      donor_id: Number(form.donor_id),
      hemoglobin: form.hemoglobin ? Number(form.hemoglobin) : null,
      temperature: form.temperature ? Number(form.temperature) : null,
      pulse: form.pulse ? Number(form.pulse) : null,
      weight: form.weight ? Number(form.weight) : null,
      is_eligible: form.is_eligible === "1",
    };
    mutate(payload);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-1 text-2xl font-bold">New Medical Assessment</h2>
      <hr className="mb-6" />

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="bg-red-600 px-6 py-3 text-white">
          <h5 className="flex items-center gap-2 font-semibold">
            <ClipboardList className="size-4" />
            Assessment Details
          </h5>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Donor <span className="text-red-500">*</span></label>
                <select
                  name="donor_id"
                  value={form.donor_id}
                  onChange={handleChange}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  required
                >
                  <option value="">Select Donor</option>
                  {donors?.map((d) => (
                    <option key={d.id} value={d.id}>{d.full_name} ({d.blood_group})</option>
                  ))}
                </select>
                {errors.donor_id && <p className="mt-1 text-xs text-red-500">{errors.donor_id}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Assessment Date <span className="text-red-500">*</span></label>
                <Input type="date" name="assessment_date" value={form.assessment_date} onChange={handleChange} required />
                {errors.assessment_date && <p className="mt-1 text-xs text-red-500">{errors.assessment_date}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Blood Pressure</label>
                <Input placeholder="e.g. 120/80" name="blood_pressure" value={form.blood_pressure} onChange={handleChange} />
                {errors.blood_pressure && <p className="mt-1 text-xs text-red-500">{errors.blood_pressure}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Hemoglobin (g/dL)</label>
                <Input type="number" step="0.1" placeholder="e.g. 13.5" name="hemoglobin" value={form.hemoglobin} onChange={handleChange} />
                {errors.hemoglobin && <p className="mt-1 text-xs text-red-500">{errors.hemoglobin}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Temperature (℃)</label>
                <Input type="number" step="0.1" placeholder="e.g. 36.5" name="temperature" value={form.temperature} onChange={handleChange} />
                {errors.temperature && <p className="mt-1 text-xs text-red-500">{errors.temperature}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Pulse Rate (bpm)</label>
                <Input type="number" placeholder="e.g. 72" name="pulse" value={form.pulse} onChange={handleChange} />
                {errors.pulse && <p className="mt-1 text-xs text-red-500">{errors.pulse}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Weight (kg)</label>
                <Input type="number" step="0.1" placeholder="e.g. 65.5" name="weight" value={form.weight} onChange={handleChange} />
                {errors.weight && <p className="mt-1 text-xs text-red-500">{errors.weight}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Eligibility</label>
                <select name="is_eligible" value={form.is_eligible} onChange={handleChange} className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
                  <option value="1">Eligible</option>
                  <option value="0">Not Eligible</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Notes</label>
              <textarea
                name="notes"
                rows={3}
                value={form.notes}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                {isPending ? "Saving..." : "Save Assessment"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/admin/assessments")}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
