import { Droplet, HeartHandshake, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

function SummaryCard({ icon: Icon, label, value, className }) {
  return (
    <div className={cn("rounded-xl border bg-white p-4 shadow-sm sm:p-5", className)}>
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
          <Icon className="size-5 text-red-600" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-gray-900">{value}</p>
          <p className="truncate text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}

function eligibleAfter(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateValue;
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function DonorSummaryCards({ data, profile }) {
  const isAvailable = profile?.status === "available";

  const nextEligible = data?.next_eligible_date
    ? new Date(`${data.next_eligible_date}T00:00:00`)
    : null;
  const eligibleNow = !nextEligible || nextEligible <= new Date();

  const cards = [
    { icon: Droplet, label: "Blood Group", value: profile?.blood_group || "—" },
    {
      icon: HeartHandshake,
      label: "Availability",
      value: isAvailable ? "Available" : "Not Available",
    },
    {
      icon: Clock,
      label: "Next Donation",
      value: eligibleNow ? "Eligible now" : eligibleAfter(data.next_eligible_date),
    },
  ];

  return (
    <div className="motion-safe:animate-fade-up grid gap-4 sm:grid-cols-3 [animation-delay:160ms]">
      {cards.map((card) => (
        <SummaryCard key={card.label} {...card} />
      ))}
    </div>
  );
}