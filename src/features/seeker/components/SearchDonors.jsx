import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { searchDonors, createRequest } from "@/features/seeker/api/seeker";
import { BLOOD_GROUPS, GROUP_COLORS } from "@/config/constants";
import { Loader2, Search, MapPin, Phone, User, Calendar, Weight, Droplet, Clock, X, AlertTriangle, Building2, Frown, SearchX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SearchDonors() {
  const queryClient = useQueryClient();
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [searched, setSearched] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(null);
  const [requestForm, setRequestForm] = useState({
    quantity: "1",
    patient_name: "",
    patient_age: "",
    hospital_name: "",
    urgency: "normal",
    notes: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["seeker-donors", bloodGroup, location],
    queryFn: async () => {
      if (!bloodGroup) return null;
      const params = { blood_group: bloodGroup };
      if (location) params.city = location;
      const res = await searchDonors(params);
      return res.data;
    },
    enabled: searched,
  });

  const requestMutation = useMutation({
    mutationFn: (data) => createRequest(data),
    onSuccess: (res) => {
      setShowRequestModal(null);
      setRequestForm({ quantity: "1", patient_name: "", patient_age: "", hospital_name: "", urgency: "normal", notes: "" });
      toast.success(res.data?.message || "Blood request submitted successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to submit request");
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!bloodGroup) {
      toast.error("Please select a blood group");
      return;
    }
    setSearched(true);
    queryClient.invalidateQueries({ queryKey: ["seeker-donors", bloodGroup, location] });
  };

  const contactDonor = (phone) => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    } else {
      toast.error("Phone number not available");
    }
  };

  const openRequestModal = (donor) => {
    setShowRequestModal(donor);
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!showRequestModal) return;
    requestMutation.mutate({
      blood_group: showRequestModal.blood_group,
      quantity: Number(requestForm.quantity),
      patient_name: requestForm.patient_name,
      patient_age: requestForm.patient_age ? Number(requestForm.patient_age) : null,
      hospital_name: requestForm.hospital_name,
      urgency: requestForm.urgency,
      reason: requestForm.notes || null,
    });
  };

  const donors = data?.donors || [];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Search Blood Donors</h2>
        <p className="text-sm text-muted-foreground">Find available blood donors by blood group and location</p>
      </div>
      <hr className="mb-6" />

      {/* Search Form */}
      <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
        <div className="border-b bg-red-50 px-5 py-3 -mx-5 -mt-5 mb-4 rounded-t-xl">
          <h5 className="flex items-center gap-2 font-semibold text-red-800">
            <Search className="size-4" />
            Find Donors
          </h5>
        </div>
        <form onSubmit={handleSearch}>
          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Blood Group <span className="text-red-500">*</span>
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                required
              >
                <option value="">Select Blood Group</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-600">Location (City/Area)</label>
              <input
                type="text"
                placeholder="e.g., Lahore, Gulberg"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                <Search className="size-4" />
                Search Donors
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Donors Results */}
      {searched && (
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="border-b bg-blue-50 px-5 py-3">
            <h5 className="flex items-center gap-2 font-semibold text-blue-800">
              <User className="size-4" />
              Available Donors ({isLoading ? "..." : data?.count || 0} found)
            </h5>
          </div>
          <div className="p-5">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="size-8 animate-spin text-red-600" />
              </div>
            ) : donors.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {donors.map((donor) => (
                  <div key={donor.id} className="flex flex-col rounded-xl border border-red-200 bg-white shadow-sm">
                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <h5 className="flex items-center gap-2 text-base font-semibold text-red-700">
                          <User className="size-4" />
                          {donor.full_name}
                        </h5>
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${GROUP_COLORS[donor.blood_group] || "bg-gray-100 text-gray-800"}`}>
                          {donor.blood_group}
                        </span>
                      </div>
                      <hr />
                      <div className="mt-3 space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <Phone className="size-4 text-gray-400" />
                          {donor.phone}
                        </p>
                        <p className="flex items-start gap-2">
                          <MapPin className="mt-0.5 size-4 shrink-0 text-gray-400" />
                          <span>{donor.address}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Calendar className="size-4 text-gray-400" />
                          Age: {donor.age} years
                        </p>
                        <p className="flex items-center gap-2">
                          <Weight className="size-4 text-gray-400" />
                          Weight: {donor.weight} kg
                        </p>
                        {donor.last_donation_date_formatted && (
                          <p className="flex items-center gap-2">
                            <Clock className="size-4 text-gray-400" />
                            Last Donation: {donor.last_donation_date_formatted}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 border-t p-4">
                      <button
                        onClick={() => contactDonor(donor.phone)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700"
                      >
                        <Phone className="size-3" />
                        Contact Donor
                      </button>
                      <button
                        onClick={() => openRequestModal(donor)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
                      >
                        <Droplet className="size-3" />
                        Request Blood
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <Frown className="size-12 text-gray-300" />
                <p className="text-sm text-muted-foreground">
                  No donors found for {data?.blood_group} blood group{location ? " in your area" : ""}.
                </p>
                <p className="text-xs text-muted-foreground">Please try searching for blood banks instead.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Request Blood Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between rounded-t-xl bg-red-600 px-6 py-4 text-white">
              <h5 className="flex items-center gap-2 font-semibold">
                <Droplet className="size-4" />
                Request Blood from {showRequestModal.full_name}
              </h5>
              <button onClick={() => setShowRequestModal(null)} className="text-white/80 hover:text-white">
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitRequest} className="space-y-4 p-6">
              <div className="rounded-lg bg-gray-50 p-3 text-sm">
                <span className="font-medium">Blood Group:</span>{" "}
                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${GROUP_COLORS[showRequestModal.blood_group] || "bg-gray-100"}`}>
                  {showRequestModal.blood_group}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Units Required <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={requestForm.quantity}
                    onChange={(e) => setRequestForm({ ...requestForm, quantity: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={requestForm.patient_name}
                    onChange={(e) => setRequestForm({ ...requestForm, patient_name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Patient Age
                  </label>
                  <input
                    type="number"
                    value={requestForm.patient_age}
                    onChange={(e) => setRequestForm({ ...requestForm, patient_age: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    min="0"
                    max="150"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Hospital Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={requestForm.hospital_name}
                    onChange={(e) => setRequestForm({ ...requestForm, hospital_name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Urgency Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={requestForm.urgency}
                    onChange={(e) => setRequestForm({ ...requestForm, urgency: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    required
                  >
                    <option value="normal">Normal</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Additional Notes</label>
                  <textarea
                    value={requestForm.notes}
                    onChange={(e) => setRequestForm({ ...requestForm, notes: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(null)}
                  className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={requestMutation.isPending}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {requestMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Droplet className="size-4" />}
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Emergency Tips */}
      <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" />
          <div>
            <strong className="text-base">Emergency Tips:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>In case of emergency, contact blood banks directly</li>
              <li>O- is the universal donor - can be given to any blood type</li>
              <li>AB+ is the universal recipient - can receive any blood type</li>
              <li>Always verify donor eligibility before receiving blood</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
