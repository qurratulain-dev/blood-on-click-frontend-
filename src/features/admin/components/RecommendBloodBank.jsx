import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getRecommendationData, sendRecommendation } from "@/features/admin/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Building2, UserCheck, MapPin } from "lucide-react";
import toast from "react-hot-toast";

export function RecommendBloodBank() {
  const [donorForm, setDonorForm] = useState({ user_id: "", bank_id: "" });
  const [seekerForm, setSeekerForm] = useState({ user_id: "", bank_id: "" });

  const { data, isLoading } = useQuery({
    queryKey: ["recommendation-data"],
    queryFn: async () => {
      const res = await getRecommendationData();
      return res.data;
    },
  });

  const { mutate: sendToDonor, isPending: donorPending } = useMutation({
    mutationFn: (payload) => sendRecommendation({ ...payload, user_type: "donor" }),
    onSuccess: () => {
      toast.success("Recommendation sent to donor!");
      setDonorForm({ user_id: "", bank_id: "" });
    },
    onError: () => toast.error("Failed to send recommendation"),
  });

  const { mutate: sendToSeeker, isPending: seekerPending } = useMutation({
    mutationFn: (payload) => sendRecommendation({ ...payload, user_type: "seeker" }),
    onSuccess: () => {
      toast.success("Recommendation sent to seeker!");
      setSeekerForm({ user_id: "", bank_id: "" });
    },
    onError: () => toast.error("Failed to send recommendation"),
  });

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-1 text-2xl font-bold">Recommend Blood Bank</h2>
      <hr className="mb-6" />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recommend to Donor */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="flex items-center gap-2 bg-red-600 px-6 py-3 text-white">
            <UserCheck className="size-4" />
            <h5 className="font-semibold">Recommend to Donor</h5>
          </div>
          <div className="p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendToDonor({ ...donorForm, user_id: Number(donorForm.user_id), bank_id: Number(donorForm.bank_id) });
              }}
              className="space-y-4"
            >
              <div>
                <label className="mb-1 block text-sm font-medium">Select Donor</label>
                <select
                  value={donorForm.user_id}
                  onChange={(e) => setDonorForm((p) => ({ ...p, user_id: e.target.value }))}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  required
                >
                  <option value="">Select Donor</option>
                  {data?.donors?.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.full_name} - {d.blood_group}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Recommend Blood Bank</label>
                <select
                  value={donorForm.bank_id}
                  onChange={(e) => setDonorForm((p) => ({ ...p, bank_id: e.target.value }))}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  required
                >
                  <option value="">Select Bank</option>
                  {data?.banks?.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.bank_name} - {b.address}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={donorPending}>
                {donorPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                <Send className="mr-2 size-4" />
                Send Recommendation
              </Button>
            </form>
          </div>
        </div>

        {/* Recommend to Seeker */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="flex items-center gap-2 bg-blue-600 px-6 py-3 text-white">
            <UserCheck className="size-4" />
            <h5 className="font-semibold">Recommend to Seeker</h5>
          </div>
          <div className="p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendToSeeker({ ...seekerForm, user_id: Number(seekerForm.user_id), bank_id: Number(seekerForm.bank_id) });
              }}
              className="space-y-4"
            >
              <div>
                <label className="mb-1 block text-sm font-medium">Select Seeker</label>
                <select
                  value={seekerForm.user_id}
                  onChange={(e) => setSeekerForm((p) => ({ ...p, user_id: e.target.value }))}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  required
                >
                  <option value="">Select Seeker</option>
                  {data?.seekers?.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.full_name} - {s.address}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Recommend Blood Bank</label>
                <select
                  value={seekerForm.bank_id}
                  onChange={(e) => setSeekerForm((p) => ({ ...p, bank_id: e.target.value }))}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  required
                >
                  <option value="">Select Bank</option>
                  {data?.banks?.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.bank_name} - {b.address}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={seekerPending}>
                {seekerPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                <Send className="mr-2 size-4" />
                Send Recommendation
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Nearby Bank Info */}
      <div className="mt-6 overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="flex items-center gap-2 bg-green-600 px-6 py-3 text-white">
          <MapPin className="size-4" />
          <h5 className="font-semibold">Nearby Bank Recommendations (Based on Location)</h5>
        </div>
        <div className="p-6">
          <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
            <Building2 className="mt-0.5 size-4 shrink-0" />
            <p>System automatically recommends nearest blood banks based on user's location.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
