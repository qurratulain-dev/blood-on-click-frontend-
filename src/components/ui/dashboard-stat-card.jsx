import { Loader2 } from "lucide-react";

export function DashboardStatCard({ icon: Icon, label, value, sub, color, loading }) {
  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-gray-50">
            <Loader2 className="size-6 animate-spin text-gray-400" />
          </div>
          <div className="space-y-2">
            <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`flex size-12 items-center justify-center rounded-full ${color ?? "bg-red-50"}`}>
          <Icon className={`size-6 ${color ? "text-white" : "text-red-600"}`} />
        </div>
        <div>
          <p className="text-2xl font-bold">{value ?? "—"}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
          {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
        </div>
      </div>
    </div>
  );
}
