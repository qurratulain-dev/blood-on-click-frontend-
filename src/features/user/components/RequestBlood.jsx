import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRequest } from "@/features/user/api/User";
import { BLOOD_GROUPS, GROUP_COLORS } from "@/config/constants";
import {
  Droplet, Loader2, AlertTriangle, CheckCircle, ArrowLeft, HeartPulse,
} from "lucide-react";
import toast from "react-hot-toast";

export function RequestBlood() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    blood_group: "",
    quantity: "1",
    patient_name: "",
    patient_age: "",
    hospital_name: "",
    urgency: "normal",
    notes: "",
  });

  const mutation = useMutation({
    mutationFn: (data) => createRequest(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["user-requests"] });
      queryClient.invalidateQueries({ queryKey: ["user-dashboard"] });
      toast.success(res.data?.message || "Blood request submitted successfully");
      navigate("/user/requests");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to submit request");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.blood_group) {
      toast.error("Please select a blood group");
      return;
    }
    mutation.mutate({
      blood_group: form.blood_group,
      quantity: Number(form.quantity),
      patient_name: form.patient_name || null,
      patient_age: form.patient_age ? Number(form.patient_age) : null,
      hospital_name: form.hospital_name || null,
      urgency: form.urgency,
      reason: form.notes || null,
    });
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500";

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Request Blood</h2>
          <p className="text-sm text-muted-foreground">
            Submit a blood request so matching donors and blood banks can help.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/user")}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </button>
      </div>
      <hr className="mb-6" />

      <form onSubmit={handleSubmit} className="rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-red-50 px-6 py-3">
          <h5 className="flex items-center gap-2 font-semibold text-red-800">
            <Droplet className="size-4" />
            Blood Request Details
          </h5>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Blood Group <span className="text-red-500">*</span>
              </label>
              <select
                name="blood_group"
                value={form.blood_group}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select Blood Group</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Units Required <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                min="1"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Urgency Level <span className="text-red-500">*</span>
              </label>
              <select
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="normal">Normal</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Patient Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="patient_name"
                value={form.patient_name}
                onChange={handleChange}
                required
                placeholder="Who needs the blood"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Patient Age
              </label>
              <input
                type="number"
                name="patient_age"
                value={form.patient_age}
                onChange={handleChange}
                min="0"
                max="150"
                placeholder="e.g., 45"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Hospital Name
              </label>
              <input
                type="text"
                name="hospital_name"
                value={form.hospital_name}
                onChange={handleChange}
                placeholder="Where treatment is taking place"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Any details that could help donors or blood banks"
                className={inputClass}
              />
            </div>
          </div>

          {form.blood_group && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800">
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${GROUP_COLORS[form.blood_group] || "bg-gray-100 text-gray-800"}`}>
                {form.blood_group}
              </span>
              <span>
                You're requesting {form.quantity || 0} unit{Number(form.quantity) > 1 ? "s" : ""} of {form.blood_group} blood.
              </span>
            </div>
          )}

          <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>
                Requests are shared with matching blood banks and available donors. You can
                track its status in your blood requests.
              </span>
            </div>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {mutation.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Droplet className="size-4" />
              )}
              {mutation.isPending ? "Submitting..." : "Submit Request"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/user")}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>

          {mutation.isSuccess && (
            <div className="flex items-start gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800">
              <CheckCircle className="mt-0.5 size-4 shrink-0" />
              <span>Request submitted successfully.</span>
            </div>
          )}
        </div>
      </form>

      <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        <div className="flex items-start gap-3">
          <HeartPulse className="mt-0.5 size-5 shrink-0" />
          <div>
            <strong className="text-base">Need donors or a blood bank too?</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Find matching donors in the Donor Search page.</li>
              <li>Search blood banks and check live stock availability.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}