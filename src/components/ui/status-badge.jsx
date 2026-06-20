import { BADGE_VARIANTS } from "@/config/constants";
import { CheckCircle, Clock, XCircle, AlertTriangle, Loader2 } from "lucide-react";

const STATUS_ICONS = {
  completed: CheckCircle,
  fulfilled: CheckCircle,
  approved: CheckCircle,
  pending: Clock,
  rejected: XCircle,
  cancelled: XCircle,
  critical: AlertTriangle,
  low: AlertTriangle,
};

export function StatusBadge({ status, showIcon = true }) {
  const normalized = status?.toLowerCase().replace(/\s+/g, "_") ?? "";
  const Icon = showIcon ? STATUS_ICONS[normalized] : null;
  const className = BADGE_VARIANTS[normalized] || "bg-gray-100 text-gray-800";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {Icon && <Icon className="size-3" />}
      {status}
    </span>
  );
}
