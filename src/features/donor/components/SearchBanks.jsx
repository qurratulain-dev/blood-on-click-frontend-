import { useQuery } from "@tanstack/react-query";
import { searchBanks, getDonorDashboard } from "@/features/donor/api/donor";
import { Loader2, Search, MapPin, Phone, Droplet, IdCard, Navigation, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SearchBanks() {
  const [search, setSearch] = useState("");

  const { data: dashboard } = useQuery({
    queryKey: ["donor-dashboard"],
    queryFn: async () => {
      const res = await getDonorDashboard();
      return res.data;
    },
  });

  const { data: banks, isLoading } = useQuery({
    queryKey: ["donor-banks", search],
    queryFn: async () => {
      const params = {};
      if (search) params.name = search;
      const res = await searchBanks(params);
      return res.data;
    },
  });

  const donorBloodGroup = dashboard?.profile?.blood_group;

  const getStockForGroup = (bank) => {
    if (!donorBloodGroup) return 0;
    const stock = bank.blood_stocks?.find((s) => s.blood_group === donorBloodGroup);
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

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Search Blood Banks</h2>
        <p className="text-sm text-muted-foreground">Find blood banks near you and check stock availability</p>
      </div>
      <hr className="mb-6" />

      <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by bank name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-red-600" />
        </div>
      ) : banks?.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {banks.map((bank) => {
            const stock = getStockForGroup(bank);
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
                    <Droplet className="size-4 text-gray-400" />
                    <span>
                      Your Blood Group Stock:{" "}
                      <strong className={stock > 0 ? "text-green-600" : "text-red-600"}>
                        {stock} units
                      </strong>
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <IdCard className="size-4 text-gray-400" />
                    <span>Reg No: {bank.registration_number || "—"}</span>
                  </p>
                  {bank.license_number && (
                    <p className="flex items-center gap-2">
                      <ShieldAlert className="size-4 text-gray-400" />
                      <span>License: {bank.license_number}</span>
                    </p>
                  )}
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
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <Search className="size-12 text-gray-300" />
          <p className="text-sm text-muted-foreground">No blood banks found matching your search.</p>
        </div>
      )}
    </div>
  );
}
