import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDonation,
  getEligibility,
  getUserDashboard,
  requestAssessment,
  searchBanks,
} from "@/features/user/api/User";
import {
  Heart, Loader2, CalendarCheck, AlertTriangle, Droplet, ArrowLeft,
  CheckCircle2, Building2, ClipboardList, Clock, ShieldCheck, XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
}

const STATUS = {
  eligible: {
    icon: CheckCircle2,
    wrap: "border-green-200 bg-green-50",
    iconColor: "text-green-600",
    title: "You're eligible to donate",
    copy: "Your medical assessment is complete and your waiting period has passed. You can record a donation below.",
  },
  waiting_period: {
    icon: Clock,
    wrap: "border-blue-200 bg-blue-50",
    iconColor: "text-blue-600",
    title: "Not eligible yet",
    copy: "You can donate again once your 90-day interval has passed, based on your last completed donation.",
  },
  not_eligible: {
    icon: XCircle,
    wrap: "border-red-200 bg-red-50",
    iconColor: "text-red-600",
    title: "Currently not eligible",
    copy: "Your latest medical assessment marked you as not eligible. A medical professional will need to reassess you before you can donate.",
  },
  not_assessed: {
    icon: ClipboardList,
    wrap: "border-amber-200 bg-amber-50",
    iconColor: "text-amber-600",
    title: "Medical assessment required",
    copy: "No medical assessment is on file yet. Request an assessment to confirm your eligibility before donating.",
  },
};

function AssessmentSummary({ assessment }) {
  if (!assessment) return null;

  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      <div>
        <dt className="text-xs text-muted-foreground">Assessment date</dt>
        <dd className="text-sm font-medium text-gray-900">{assessment.assessment_date || "—"}</dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">Eligibility decision</dt>
        <dd className="text-sm font-medium">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
              assessment.is_eligible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {assessment.is_eligible ? "Eligible" : "Not eligible"}
          </span>
        </dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">Blood pressure</dt>
        <dd className="text-sm font-medium text-gray-900">{assessment.blood_pressure || "—"}</dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">Hemoglobin</dt>
        <dd className="text-sm font-medium text-gray-900">
          {assessment.hemoglobin ? `${assessment.hemoglobin} g/dL` : "—"}
        </dd>
      </div>
      {assessment.notes && (
        <div className="sm:col-span-2">
          <dt className="text-xs text-muted-foreground">Notes</dt>
          <dd className="text-sm text-gray-700">{assessment.notes}</dd>
        </div>
      )}
    </dl>
  );
}

export function DonateBlood() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    bank_id: "",
    donation_date: "",
    quantity: "1",
  });

  const { data: eligibility, isPending: eligibilityPending } = useQuery({
    queryKey: ["user-eligibility"],
    queryFn: async () => {
      const res = await getEligibility();
      return res.data;
    },
  });

  const { data: dashboard, isPending: dashboardPending } = useQuery({
    queryKey: ["user-dashboard"],
    queryFn: async () => {
      const res = await getUserDashboard();
      return res.data;
    },
  });

  const { data: banks, isLoading: banksLoading } = useQuery({
    queryKey: ["user-banks"],
    queryFn: async () => {
      const res = await searchBanks({});
      return res.data;
    },
  });

  const donateMutation = useMutation({
    mutationFn: (data) => createDonation(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["user-donations"] });
      queryClient.invalidateQueries({ queryKey: ["user-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["user-eligibility"] });
      toast.success(res.data?.message || "Donation request submitted successfully");
      navigate("/user/donations");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to record donation");
    },
  });

  const requestMutation = useMutation({
    mutationFn: () => requestAssessment(),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["user-eligibility"] });
      toast.success(res.data?.message || "Assessment requested");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to request assessment");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.bank_id || !form.donation_date) {
      toast.error("Please select a blood bank and donation date");
      return;
    }
    donateMutation.mutate({
      bank_id: Number(form.bank_id),
      blood_group: profile?.blood_group,
      quantity: Number(form.quantity),
      donation_date: form.donation_date,
    });
  };

  if (eligibilityPending || dashboardPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-red-600" />
      </div>
    );
  }

  const profile = dashboard?.profile;
  const statusKey = STATUS[eligibility?.status] ? eligibility.status : "not_assessed";
  const status = STATUS[statusKey];
  const StatusIcon = status.icon;
  const canDonate = Boolean(eligibility?.can_donate);
  const latestAssessment = eligibility?.latest_assessment;
  const assessmentRequested = Boolean(eligibility?.assessment_requested);

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500";

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Donate Blood</h2>
          <p className="text-sm text-muted-foreground">
            Check your eligibility, complete any required assessment, then record your donation.
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

      {/* Eligibility status */}
      <div className={`mb-6 rounded-xl border p-5 shadow-sm ${status.wrap}`}>
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/70`}>
            <StatusIcon className={`size-5 ${status.iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900">{status.title}</h3>
            <p className="mt-1 text-sm text-gray-700">{status.copy}</p>

            {eligibility?.next_eligible_date && (
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-900">
                <CalendarCheck className="size-4" />
                Next eligible date: {formatDate(eligibility.next_eligible_date)}
              </p>
            )}

            {(statusKey === "not_assessed" || statusKey === "not_eligible") && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {assessmentRequested ? (
                  <span className="inline-flex items-center gap-2 rounded-lg bg-white/70 px-4 py-2 text-sm font-medium text-gray-700">
                    <Clock className="size-4" />
                    Assessment request under review
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => requestMutation.mutate()}
                    disabled={requestMutation.isPending}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                  >
                    {requestMutation.isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <ClipboardList className="size-4" />
                    )}
                    {statusKey === "not_eligible" ? "Request Reassessment" : "Request Assessment"}
                  </button>
                )}
                <Link
                  to="/user/search-banks"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <Building2 className="size-4" />
                  Find a Blood Bank
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Latest assessment details */}
      {latestAssessment && (
        <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="size-5 text-red-600" />
            <h3 className="text-base font-semibold text-gray-900">Latest medical assessment</h3>
          </div>
          <AssessmentSummary assessment={latestAssessment} />
        </div>
      )}

      {/* Donation form — only when eligible */}
      {canDonate ? (
        <form onSubmit={handleSubmit} className="rounded-xl border bg-white shadow-sm">
          <div className="border-b bg-red-50 px-6 py-3">
            <h5 className="flex items-center gap-2 font-semibold text-red-800">
              <Heart className="size-4" />
              Record New Donation
            </h5>
          </div>

          <div className="space-y-6 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Blood Bank <span className="text-red-500">*</span>
                </label>
                <select
                  name="bank_id"
                  value={form.bank_id}
                  onChange={(e) => setForm({ ...form, bank_id: e.target.value })}
                  required
                  className={inputClass}
                >
                  <option value="">
                    {banksLoading ? "Loading blood banks..." : "Select Blood Bank"}
                  </option>
                  {(banks || []).map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.bank_name} - {b.address?.substring(0, 50)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Donation Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="donation_date"
                  value={form.donation_date}
                  onChange={(e) => setForm({ ...form, donation_date: e.target.value })}
                  max={new Date().toISOString().split("T")[0]}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <input
                  type="text"
                  value={profile?.blood_group || ""}
                  className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                  disabled
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Your blood group is auto-filled from your profile
                </p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Units Donated <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  min="1"
                  max="2"
                  required
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Typically 1 unit = 450ml of blood
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                <span>
                  Your donation record will be pending until admin verification. Eligibility
                  is ultimately confirmed by professionals during donation.
                </span>
              </div>
            </div>

            <div className="flex gap-3 border-t pt-4">
              <button
                type="submit"
                disabled={donateMutation.isPending}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {donateMutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Heart className="size-4" />
                )}
                {donateMutation.isPending ? "Submitting..." : "Submit Donation"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/user")}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="rounded-xl border border-dashed bg-white p-6 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <Droplet className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>
              You can record a donation once your eligibility is confirmed. If your details
              change, keep your profile up to date.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
