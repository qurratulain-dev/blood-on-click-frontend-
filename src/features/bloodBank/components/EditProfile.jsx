import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "@/features/bloodBank/api/bloodBank";
import { DashboardStatCard } from "@/components/ui/dashboard-stat-card";
import { Building2, Phone, MapPin, FileText, Hash, Globe, Loader2, Save, ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export function EditProfile() {
  const queryClient = useQueryClient();
  const { data: bank, isLoading } = useQuery({
    queryKey: ["blood-bank-profile"],
    queryFn: async () => {
      const res = await getProfile();
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (formData) => updateProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blood-bank-profile"] });
      toast.success("Profile updated successfully!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update profile");
    },
  });

  const [form, setForm] = useState(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-red-600" />
      </div>
    );
  }

  const initialForm = form ?? {
    bank_name: bank?.bank_name || "",
    phone: bank?.phone || "",
    address: bank?.address || "",
    latitude: bank?.latitude || "",
    longitude: bank?.longitude || "",
    registration_number: bank?.registration_number || "",
    license_number: bank?.license_number || "",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...(prev ?? initialForm), [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...initialForm };
    if (data.latitude) data.latitude = parseFloat(data.latitude);
    if (data.longitude) data.longitude = parseFloat(data.longitude);
    mutation.mutate(data);
  };

  const fields = [
    { name: "bank_name", label: "Bank Name", icon: Building2, required: true, type: "text", maxLength: 255 },
    { name: "email", label: "Email", icon: Mail, required: false, type: "email", disabled: true },
    { name: "phone", label: "Phone", icon: Phone, required: true, type: "text", maxLength: 20, colSpan: true },
    { name: "registration_number", label: "Registration Number", icon: Hash, required: true, type: "text", maxLength: 255 },
    { name: "license_number", label: "License Number", icon: FileText, required: false, type: "text", maxLength: 255 },
    { name: "latitude", label: "Latitude", icon: Globe, required: false, type: "number", step: "0.00000001", placeholder: "31.5497" },
    { name: "longitude", label: "Longitude", icon: Globe, required: false, type: "number", step: "0.00000001", placeholder: "74.3436" },
    { name: "address", label: "Address", icon: MapPin, required: false, type: "textarea", colSpan: true },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Edit Blood Bank Profile</h2>
          <p className="text-sm text-muted-foreground">Update your blood bank information</p>
        </div>
        <Link to="/blood-bank" className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>
      </div>
      <hr className="mb-6" />

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-red-50 px-6 py-3">
          <h5 className="flex items-center gap-2 font-semibold text-red-800">
            <Building2 className="size-4" />
            Bank Information
          </h5>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {fields.map(({ name, label, icon: Icon, required, type, step, placeholder, maxLength, disabled, colSpan }) => {
                const value = name === "email" ? bank?.user?.email || "" : initialForm[name];
                return (
                  <div key={name} className={colSpan ? "sm:col-span-2" : ""}>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Icon className="size-4 text-gray-400" />
                      {label}
                    </label>
                    {type === "textarea" ? (
                      <textarea
                        name={name}
                        value={value}
                        onChange={handleChange}
                        rows={3}
                        required={required}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      />
                    ) : (
                      <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        step={step}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        required={required}
                        disabled={disabled}
                        className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 ${disabled ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-500" : "border-gray-300"}`}
                      />
                    )}
                    {name === "email" && <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 border-t pt-4">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {mutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                {mutation.isPending ? "Saving..." : "Update Profile"}
              </button>
              <Link
                to="/blood-bank"
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

