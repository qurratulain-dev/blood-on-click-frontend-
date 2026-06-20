import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "@/features/donor/api/donor";
import { Loader2, Save, ArrowLeft, User, Phone, Mail, MapPin, Ruler, Weight, Droplet, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function EditProfile() {
  const queryClient = useQueryClient();
  const { data: donor, isLoading } = useQuery({
    queryKey: ["donor-profile"],
    queryFn: async () => {
      const res = await getProfile();
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (formData) => updateProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donor-profile"] });
      queryClient.invalidateQueries({ queryKey: ["donor-dashboard"] });
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
    full_name: donor?.full_name || "",
    phone: donor?.phone || "",
    address: donor?.address || "",
    age: donor?.age || "",
    weight: donor?.weight || "",
    gender: donor?.gender || "Male",
    status: donor?.status || "available",
    latitude: donor?.latitude || "",
    longitude: donor?.longitude || "",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...(prev ?? initialForm), [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...initialForm };
    if (data.age) data.age = Number(data.age);
    if (data.weight) data.weight = Number(data.weight);
    if (data.latitude) data.latitude = parseFloat(data.latitude);
    if (data.longitude) data.longitude = parseFloat(data.longitude);
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Edit Donor Profile</h2>
          <p className="text-sm text-muted-foreground">Update your personal information</p>
        </div>
        <Link to="/donor" className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>
      </div>
      <hr className="mb-6" />

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b bg-red-50 px-6 py-3">
          <h5 className="flex items-center gap-2 font-semibold text-red-800">
            <User className="size-4" />
            Personal Information
          </h5>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="size-4 text-gray-400" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="full_name" value={initialForm.full_name}
                  onChange={handleChange} required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail className="size-4 text-gray-400" />
                  Email
                </label>
                <input
                  type="email" value={donor?.email || ""} disabled
                  className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                />
                <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Phone className="size-4 text-gray-400" />
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="phone" value={initialForm.phone}
                  onChange={handleChange} required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Droplet className="size-4 text-gray-400" />
                  Blood Group
                </label>
                <input
                  type="text" value={donor?.blood_group || ""} disabled
                  className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Ruler className="size-4 text-gray-400" />
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number" name="age" value={initialForm.age}
                  onChange={handleChange} required min="18" max="65"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Weight className="size-4 text-gray-400" />
                  Weight (kg) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number" step="0.01" name="weight" value={initialForm.weight}
                  onChange={handleChange} required min="50"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender" value={initialForm.gender}
                  onChange={handleChange} required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Heart className="size-4 text-gray-400" />
                  Donation Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status" value={initialForm.status}
                  onChange={handleChange} required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                >
                  <option value="available">Available for Donation</option>
                  <option value="not_available">Not Available</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  Latitude
                </label>
                <input
                  type="number" step="0.00000001" name="latitude" value={initialForm.latitude}
                  onChange={handleChange} placeholder="31.5497"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  Longitude
                </label>
                <input
                  type="number" step="0.00000001" name="longitude" value={initialForm.longitude}
                  onChange={handleChange} placeholder="74.3436"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin className="size-4 text-gray-400" />
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address" value={initialForm.address}
                  onChange={handleChange} rows={3} required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex gap-3 border-t pt-4">
              <button
                type="submit" disabled={mutation.isPending}
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
                to="/donor"
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

function Mail(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
