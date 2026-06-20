import { useDonorDashboard } from "@/features/donor/hooks/useDonorDashboard";
import { GROUP_COLORS } from "@/config/constants";
import { DashboardStatCard } from "@/components/ui/dashboard-stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Droplet, Heart, CalendarCheck, AlertTriangle, Shield, Clock, CheckCircle, Award, Loader2 } from "lucide-react";

export function DonorDashboard() {
  const { data, isLoading } = useDonorDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-red-600" />
      </div>
    );
  }

  const profile = data?.profile;
  const isEligible = data?.next_eligible_date ? new Date(data.next_eligible_date) <= new Date() : true;

  const stats = [
    { icon: Droplet, label: "Total Donations", value: data?.total_donations },
    { icon: CheckCircle, label: "Completed", value: data?.completed_donations },
    { icon: Award, label: "Units Donated", value: data?.total_units_donated, sub: "Total" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-1 text-2xl font-bold">Donor Dashboard</h2>
      <hr className="mb-6" />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => <DashboardStatCard key={s.label} {...s} />)}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="border-b bg-red-50 px-5 py-3">
            <h5 className="flex items-center gap-2 font-semibold text-red-800">
              <Heart className="size-4" />
              My Profile
            </h5>
          </div>
          <div className="p-5">
            {profile ? (
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex size-16 items-center justify-center rounded-full bg-red-100">
                    <span className="text-xl font-bold text-red-700">{profile.blood_group || "?"}</span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{profile.full_name}</p>
                    <p className="text-muted-foreground">Blood Group: <strong>{profile.blood_group}</strong></p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p><span className="text-muted-foreground">Age:</span> {profile.age || "—"}</p>
                  <p><span className="text-muted-foreground">Weight:</span> {profile.weight ? `${profile.weight} kg` : "—"}</p>
                  <p><span className="text-muted-foreground">Gender:</span> {profile.gender || "—"}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {profile.phone || "—"}</p>
                </div>
                <p className="text-muted-foreground">
                  Status: <StatusBadge status={profile.status} />
                </p>
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">Profile not available.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b bg-red-50 px-5 py-3">
              <h5 className="flex items-center gap-2 font-semibold text-red-800">
                <CalendarCheck className="size-4" />
                Next Eligible Date
              </h5>
            </div>
            <div className="p-5">
              {data?.next_eligible_date ? (
                <div className="flex items-center gap-3">
                  {isEligible ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="size-5" />
                      <span className="font-semibold">You are eligible to donate now!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-yellow-600">
                      <Clock className="size-5" />
                      <span className="font-semibold">Eligible after {data.next_eligible_date}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="size-5" />
                  <span className="font-semibold">You can donate any time!</span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b bg-red-50 px-5 py-3">
              <h5 className="flex items-center gap-2 font-semibold text-red-800">
                <Shield className="size-4" />
                Latest Medical Report
              </h5>
            </div>
            <div className="p-5">
              {data?.latest_medical_report ? (
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Title:</span> {data.latest_medical_report.title}</p>
                  {data.latest_medical_report.description && (
                    <p><span className="text-muted-foreground">Description:</span> {data.latest_medical_report.description}</p>
                  )}
                  <p>
                    <span className="text-muted-foreground">Status:</span>{" "}
                    <StatusBadge status={data.latest_medical_report.is_verified ? "Completed" : "Pending"} />
                  </p>
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-muted-foreground">No medical reports uploaded yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-red-50 px-5 py-3">
          <h5 className="flex items-center gap-2 font-semibold text-red-800">
            <Droplet className="size-4" />
            Recent Donations
          </h5>
        </div>
        <div className="p-5">
          {data?.recent_donations?.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-xs uppercase text-muted-foreground">
                  <th className="pb-2 font-medium">Bank</th>
                  <th className="pb-2 font-medium">Group</th>
                  <th className="pb-2 font-medium">Units</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_donations.map((d) => (
                  <tr key={d.id} className="border-b text-sm last:border-0 hover:bg-gray-50">
                    <td className="py-2.5">{d.bank_name}</td>
                    <td className="py-2.5">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${GROUP_COLORS[d.blood_group] || "bg-gray-100 text-gray-800"}`}>
                        {d.blood_group}
                      </span>
                    </td>
                    <td className="py-2.5">{d.quantity}</td>
                    <td className="py-2.5">{d.donation_date}</td>
                    <td className="py-2.5">
                      <StatusBadge status={d.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">No donations yet. Visit a blood bank to make your first donation!</p>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-800">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <div>
            <strong>Donation Tips:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Stay hydrated before and after donating blood</li>
              <li>Eat a healthy meal before donation</li>
              <li>Minimum 90-day gap between donations</li>
              <li>You must be at least 18 years old and weigh at least 50 kg</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
