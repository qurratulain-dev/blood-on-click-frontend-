import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { searchBanks, createRequest } from "@/features/seeker/api/seeker";
import { GROUP_COLORS, BLOOD_GROUPS } from "@/config/constants";
import { Loader2, Search, MapPin, Phone, Mail, Droplet, IdCard, Navigation, AlertTriangle, X, User, Building2, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SearchBanks() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(null);
  const [requestForm, setRequestForm] = useState({
    blood_group: "",
    quantity: "1",
    patient_name: "",
    patient_age: "",
    hospital_name: "",
    urgency: "normal",
    notes: "",
  });

  const { data: banks, isLoading } = useQuery({
    queryKey: ["seeker-banks", search, bloodGroup],
    queryFn: async () => {
      const params = {};
      if (search) params.name = search;
      if (bloodGroup) params.blood_group = bloodGroup;
      const res = await searchBanks(params);
      return res.data;
    },
  });

  const requestMutation = useMutation({
    mutationFn: (data) => createRequest(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["seeker-banks"] });
      setShowRequestModal(null);
      setRequestForm({ blood_group: "", quantity: "1", patient_name: "", patient_age: "", hospital_name: "", urgency: "normal", notes: "" });
      toast.success(res.data?.message || "Blood request submitted successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to submit request");
    },
  });

  const getAvailableStock = (bank) => {
    if (!bloodGroup) return null;
    const stock = bank.blood_stocks?.find((s) => s.blood_group === bloodGroup);
    return stock?.quantity || 0;
  };

  const getDirections = (lat, lng) => {
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    } else {
      toast.error("Location coordinates not available for this bank");
    }
  };

  const contactBank = (phone) => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    } else {
      toast.error("Phone number not available");
    }
  };

  const openRequestModal = (bank) => {
    setShowRequestModal(bank);
    setRequestForm((prev) => ({ ...prev, blood_group: bloodGroup || "" }));
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!showRequestModal) return;
    requestMutation.mutate({
      bank_id: showRequestModal.id,
      blood_group: requestForm.blood_group,
      quantity: Number(requestForm.quantity),
      patient_name: requestForm.patient_name,
      patient_age: requestForm.patient_age ? Number(requestForm.patient_age) : null,
      hospital_name: requestForm.hospital_name,
      urgency: requestForm.urgency,
      reason: requestForm.notes || null,
    });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Search Blood Banks</h2>
        <p className="text-sm text-muted-foreground">Find blood banks near you with available stock</p>
      </div>
      <hr className="mb-6" />

      {/* Filters */}
      <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
        <div className="border-b bg-red-50 px-5 py-3 -mx-5 -mt-5 mb-4 rounded-t-xl">
          <h5 className="flex items-center gap-2 font-semibold text-red-800">
            <Building2 className="size-4" />
            Find Blood Banks
          </h5>
        </div>
        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Blood Group Needed</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            >
              <option value="">Any Blood Group</option>
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-gray-600">Bank Name or Location</label>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => queryClient.invalidateQueries({ queryKey: ["seeker-banks"] })}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <Search className="size-4" />
              Search Banks
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-red-600" />
        </div>
      ) : banks?.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {banks.map((bank) => {
            const available = getAvailableStock(bank);
            return (
              <div key={bank.id} className="flex flex-col rounded-xl border bg-white shadow-sm">
                <div className="border-b bg-red-600 px-5 py-3 text-white">
                  <h5 className="font-semibold">{bank.bank_name}</h5>
                </div>
                <div className="flex-1 space-y-2 p-5 text-sm">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-gray-400" />
                    <span>{bank.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="size-4 text-gray-400" />
                    <span>{bank.phone || "—"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="size-4 text-gray-400" />
                    <span>{bank.email || "—"}</span>
                  </p>

                  {bloodGroup && available !== null && (
                    <div className={`rounded-lg p-3 text-xs font-medium ${
                      available > 0
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}>
                      <div className="flex items-center gap-2">
                        <Droplet className="size-4" />
                        <strong>Blood Group {bloodGroup}:</strong>
                        {available > 0 ? (
                          <span><AlertTriangle className="inline size-3" /> Available ({available} units)</span>
                        ) : (
                          <span><X className="inline size-3" /> Out of Stock</span>
                        )}
                      </div>
                    </div>
                  )}

                  <p className="flex items-center gap-2">
                    <IdCard className="size-4 text-gray-400" />
                    <span>Reg No: {bank.registration_number || "—"}</span>
                  </p>
                </div>
                <div className="flex gap-2 border-t p-4">
                  <button
                    onClick={() => getDirections(bank.latitude, bank.longitude)}
                    disabled={!bank.latitude || !bank.longitude}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    <Navigation className="size-3" />
                    Get Directions
                  </button>
                  <button
                    onClick={() => contactBank(bank.phone)}
                    disabled={!bank.phone}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Phone className="size-3" />
                    Contact
                  </button>
                  <button
                    onClick={() => openRequestModal(bank)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
                  >
                    <Droplet className="size-3" />
                    Request Blood
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <Building2 className="size-12 text-gray-300" />
          <p className="text-sm text-muted-foreground">No blood banks found matching your criteria.</p>
        </div>
      )}

      {/* Request Blood Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between rounded-t-xl bg-red-600 px-6 py-4 text-white">
              <h5 className="flex items-center gap-2 font-semibold">
                <Droplet className="size-4" />
                Request Blood from {showRequestModal.bank_name}
              </h5>
              <button onClick={() => { setShowRequestModal(null); }} className="text-white/80 hover:text-white">
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitRequest} className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Blood Group Required <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={requestForm.blood_group}
                    onChange={(e) => setRequestForm({ ...requestForm, blood_group: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
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
    </div>
  );
}
