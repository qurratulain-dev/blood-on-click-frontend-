import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getRecommendationData, sendRecommendation } from "@/features/admin/api/admin";
import { Button } from "@/components/ui/button";
import { Loader2, Send, Building2, UserCheck, MapPin } from "lucide-react";
import toast from "react-hot-toast";

export function RecommendBloodBank() {
  const [form, setForm] = useState({ user_id: "", bank_id: "" });

  const { data, isLoading } = useQuery({
    queryKey: ["recommendation-data"],
    queryFn: async () => {
      const res = await getRecommendationData();
      return res.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => sendRecommendation(payload),
    onSuccess: () => {
      toast.success("Recommendation sent to user!");
      setForm({ user_id: "", bank_id: "" });
    },
    onError: () => toast.error("Failed to send recommendation"),
  });

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-1 text-2xl font-bold">Recommend Blood Bank</h2>
      <hr className="mb-6" />

      <div className="mx-auto max-w-xl overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="flex items-center gap-2 bg-red-600 px-6 py-3 text-white">
          <UserCheck className="size-4" />
          <h5 className="font-semibold">Recommend to User</h5>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="size-6 animate-spin text-red-600" />
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutate({ user_id: Number(form.user_id), bank_id: Number(form.bank_id) });
              }}
              className="space-y-4"
            >
              <div>
                <label className="mb-1 block text-sm font-medium">Select User</label>
                <select
                  value={form.user_id}
                  onChange={(e) => setForm((p) => ({ ...p, user_id: e.target.value }))}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  required
                >
                  <option value="">Select User</option>
                  {data?.users?.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.full_name} - {u.blood_group || u.address}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Recommend Blood Bank</label>
                <select
                  value={form.bank_id}
                  onChange={(e) => setForm((p) => ({ ...p, bank_id: e.target.value }))}
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
              <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                <Send className="mr-2 size-4" />
                Send Recommendation
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Nearby Bank Info */}
      <div className="mx-auto mt-6 max-w-xl overflow-hidden rounded-xl border bg-white shadow-sm">
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