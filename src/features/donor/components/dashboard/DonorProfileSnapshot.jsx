import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Droplet, MapPin, Mail, Phone, Ruler, UserRound } from "lucide-react";
import { getProfile } from "@/features/donor/api/donor";

function initialsOf(fullName) {
  if (!fullName) return "D";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function AccountRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
        <Icon className="size-5 text-red-600" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="break-words text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export function DonorProfileSnapshot({ profile }) {
  const { data: donorProfile } = useQuery({
    queryKey: ["donor-profile"],
    queryFn: async () => {
      const res = await getProfile();
      return res.data;
    },
  });

  const fullName = profile?.full_name;
  const bloodGroup = profile?.blood_group;
  const email = donorProfile?.user?.email;

  return (
    <section className="motion-safe:animate-fade-up [animation-delay:400ms]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-wide text-red-600">Your Profile</p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900">Donor account</h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            A quick overview of the details saved on your donor profile.
          </p>
        </div>
        <Link
          to="/donor/edit-profile"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Edit profile
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex min-w-0 items-center gap-4">
            <div
              aria-hidden="true"
              className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-lg font-bold text-red-600"
            >
              {initialsOf(fullName)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-gray-900">{fullName || "Donor"}</p>
              <p className="text-sm text-muted-foreground">Registered donor</p>
            </div>
          </div>

          {bloodGroup && (
            <div className="flex flex-col items-center gap-1 rounded-xl bg-red-50 px-6 py-3">
              <Droplet className="size-5 text-red-600" aria-hidden="true" />
              <p className="text-xl font-bold leading-none text-red-700">{bloodGroup}</p>
              <p className="text-xs font-medium text-red-600">Blood group</p>
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-gray-100 pt-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <AccountRow icon={UserRound} label="Gender" value={profile?.gender || "—"} />
            <AccountRow
              icon={Ruler}
              label="Age"
              value={profile?.age ? `${profile.age} years` : "—"}
            />
            <AccountRow icon={Phone} label="Phone" value={profile?.phone || "—"} />
            <AccountRow icon={Mail} label="Email" value={email || "—"} />
            <div className="sm:col-span-2">
              <AccountRow icon={MapPin} label="Location" value={profile?.address || "—"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}