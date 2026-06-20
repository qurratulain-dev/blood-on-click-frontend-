import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStock, updateStock } from "@/features/bloodBank/api/bloodBank";
import { BLOOD_GROUPS, GROUP_COLORS } from "@/config/constants";
import { StatusBadge } from "@/components/ui/status-badge";
import { Droplet, Loader2, Save, Clock, CheckCircle, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const stockStatus = (qty) => {
  if (qty < 10) return { badge: "Critical", desc: "Need Immediate Donation", variant: "critical" };
  if (qty < 30) return { badge: "Low", desc: "Accepting Donations", variant: "low" };
  if (qty < 100) return { badge: "Normal", desc: "Adequate Supply", variant: "moderate" };
  return { badge: "Sufficient", desc: "Well Stocked", variant: "adequate" };
};

const TIPS = [
  { icon: CheckCircle, text: "Keep at least 30 units of each blood group for emergencies" },
  { icon: CheckCircle, text: "Update stock immediately after each donation" },
  { icon: CheckCircle, text: "O- is universal donor — maintain higher stock" },
  { icon: CheckCircle, text: "AB+ is universal recipient — can accept any blood type" },
  { icon: CheckCircle, text: "Schedule regular blood donation camps to maintain stock" },
  { icon: CheckCircle, text: "Track expiry dates — blood components have limited shelf life" },
  { icon: CheckCircle, text: "Maintain separate inventory for whole blood, platelets & plasma" },
];

export function ManageStock() {
  const queryClient = useQueryClient();
  const { data: stockData, isLoading } = useQuery({
    queryKey: ["blood-bank-stock"],
    queryFn: async () => {
      const res = await getStock();
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, quantity }) => updateStock(id, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blood-bank-stock"] });
      queryClient.invalidateQueries({ queryKey: ["blood-bank-dashboard"] });
      toast.success("Stock updated successfully!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update stock");
    },
  });

  const [quantities, setQuantities] = useState({});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-red-600" />
      </div>
    );
  }

  const stockMap = {};
  (stockData || []).forEach((s) => { stockMap[s.blood_group] = s; });

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const getQty = (bg) => quantities[bg] ?? stockMap[bg]?.quantity ?? 0;

  const totalUnits = Object.values(stockMap).reduce((sum, s) => sum + s.quantity, 0);
  const criticalCount = Object.values(stockMap).filter((s) => s.quantity < 10).length;
  const lowCount = Object.values(stockMap).filter((s) => s.quantity >= 10 && s.quantity < 30).length;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Manage Blood Stock</h2>
        <p className="text-sm text-muted-foreground">Update inventory levels for each blood group</p>
      </div>
      <hr className="mb-6" />

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-blue-50">
              <Droplet className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold">{totalUnits}</p>
              <p className="text-xs text-muted-foreground">Total Units</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-red-50">
              <Info className="size-5 text-red-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-red-600">{criticalCount}</p>
              <p className="text-xs text-muted-foreground">Critical Groups (&lt;10 units)</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-yellow-50">
              <Clock className="size-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-yellow-600">{lowCount}</p>
              <p className="text-xs text-muted-foreground">Low Groups (&lt;30 units)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-red-50 px-5 py-3">
          <h5 className="flex items-center gap-2 font-semibold text-red-800">
            <Droplet className="size-4" />
            Current Blood Inventory
          </h5>
        </div>
        <div className="p-5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-xs uppercase text-muted-foreground">
                <th className="pb-3 font-medium">Blood Group</th>
                <th className="pb-3 font-medium">Quantity (Units)</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Last Updated</th>
                <th className="pb-3 font-medium">Update Quantity</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {BLOOD_GROUPS.map((bg) => {
                const s = stockMap[bg];
                const currentQty = s?.quantity || 0;
                const qty = getQty(bg);
                const status = s ? stockStatus(currentQty) : { label: "N/A", variant: null };
                const isDirty = qty !== currentQty;
                return (
                  <tr key={bg} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${GROUP_COLORS[bg] || "bg-gray-100 text-gray-800"}`}>
                        {bg}
                      </span>
                    </td>
                    <td className="py-3 font-medium">{currentQty}</td>
                    <td className="py-3">
                      {status.variant ? (
                        <div className="flex flex-col gap-0.5">
                          <StatusBadge status={status.badge} />
                          <span className="text-[10px] text-gray-400">{status.desc}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </td>
                    <td className="py-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="size-3 shrink-0" />
                        {s ? formatDate(s.updated_at) : "—"}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setQuantities((prev) => ({ ...prev, [bg]: Math.max(0, qty - 1) }))}
                          className="flex size-7 items-center justify-center rounded-lg border text-base font-bold hover:bg-gray-100"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={qty}
                          onChange={(e) => setQuantities((prev) => ({ ...prev, [bg]: Math.max(0, parseInt(e.target.value) || 0) }))}
                          className="w-20 rounded-lg border border-gray-300 px-3 py-1.5 text-center text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantities((prev) => ({ ...prev, [bg]: qty + 1 }))}
                          className="flex size-7 items-center justify-center rounded-lg border text-base font-bold hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      {s && (
                        <button
                          type="button"
                          disabled={!isDirty || mutation.isPending}
                          onClick={() => mutation.mutate({ id: s.id, quantity: qty })}
                          className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                        >
                          {mutation.isPending ? (
                            <Loader2 className="size-3 animate-spin" />
                          ) : (
                            <Save className="size-3" />
                          )}
                          Save
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Management Tips */}
      <div className="mt-6 rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-green-50 px-5 py-3">
          <h5 className="flex items-center gap-2 font-semibold text-green-800">
            <CheckCircle className="size-4" />
            Stock Management Tips
          </h5>
        </div>
        <div className="p-5">
          <ul className="space-y-2">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <tip.icon className="mt-0.5 size-4 shrink-0 text-green-500" />
                {tip.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
