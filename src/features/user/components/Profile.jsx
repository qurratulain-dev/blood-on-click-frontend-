import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "@/features/user/api/User";
import { BLOOD_GROUPS } from "@/config/constants";
import { Loader2, Save, ArrowLeft, User, Phone, Mail, MapPin, Ruler, Weight, Droplet, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const sectionCard =
  "rounded-xl border bg-white shadow-sm";
const sectionHeader =
  "flex items-center gap-2 border-b bg-red-50 px-6 py-3 font-semibold text-red-800";
const fieldLabel =
  "mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700";
const textInput =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500";
const readonlyInput =
  "w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500";

export function Profile() {
  const queryClient = useQueryClient();
  const { data: donor, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const res = await getProfile();
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (formData) => updateProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["user-dashboard"] });
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
    city: donor?.city || "",
    age: donor?.age || "",
    weight: donor?.weight || "",
    gender: donor?.gender || "Male",
    blood_group: donor?.blood_group || "",
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
    data.latitude = data.latitude ? parseFloat(data.latitude) : null;
    data.longitude = data.longitude ? parseFloat(data.longitude) : null;
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <p className="text-sm text-muted-foreground">Update your personal information</p>
        </div>
        <Link to="/user" className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>
      </div>
      <hr className="mb-6" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={sectionCard}>
          <h5 className={sectionHeader}>
            <User className="size-4" />
            Personal Information
          </h5>
          <div className="p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={fieldLabel}>
                  <User className="size-4 text-gray-400" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="full_name" value={initialForm.full_name}
                  onChange={handleChange} required maxLength={255}
                  className={textInput}
                />
              </div>

              <div>
                <label className={fieldLabel}>
                  <Mail className="size-4 text-gray-400" />
                  Email
                </label>
                <input
                  type="email" value={donor?.email || ""} disabled
                  className={readonlyInput}
                />
                <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
              </div>

              <div>
                <label className={fieldLabel}>
                  <Phone className="size-4 text-gray-400" />
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="phone" value={initialForm.phone}
                  onChange={handleChange} required maxLength={20}
                  className={textInput}
                />
              </div>

              <div>
                <label className={fieldLabel}>
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender" value={initialForm.gender}
                  onChange={handleChange} required
                  className={textInput}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className={fieldLabel}>
                  <Ruler className="size-4 text-gray-400" />
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number" name="age" value={initialForm.age}
                  onChange={handleChange} required min="18" max="65"
                  className={textInput}
                />
              </div>

              <div>
                <label className={fieldLabel}>
                  <Weight className="size-4 text-gray-400" />
                  Weight (kg) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number" step="0.01" name="weight" value={initialForm.weight}
                  onChange={handleChange} required min="30"
                  className={textInput}
                />
              </div>

              <div>
                <label className={fieldLabel}>
                  <MapPin className="size-4 text-gray-400" />
                  City
                </label>
                <input
                  type="text" name="city" value={initialForm.city}
                  onChange={handleChange} maxLength={255}
                  placeholder="e.g., Lahore"
                  className={textInput}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={fieldLabel}>
                  <MapPin className="size-4 text-gray-400" />
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address" value={initialForm.address}
                  onChange={handleChange} rows={3} required
                  className={textInput}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={sectionCard}>
          <h5 className={sectionHeader}>
            <Droplet className="size-4" />
            Blood Information
          </h5>
          <div className="p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={fieldLabel}>
                  <Droplet className="size-4 text-gray-400" />
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <select
                  name="blood_group" value={initialForm.blood_group}
                  onChange={handleChange} required
                  className={textInput}
                >
                  <option value="" disabled>Select Blood Group</option>
                  {BLOOD_GROUPS.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-muted-foreground">
                  Used for donation records and donor search results.
                </p>
              </div>

              <div>
                <label className={fieldLabel}>
                  <Heart className="size-4 text-gray-400" />
                  Donation Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status" value={initialForm.status}
                  onChange={handleChange} required
                  className={textInput}
                >
                  <option value="available">Available for Donation</option>
                  <option value="not_available">Not Available</option>
                </select>
              </div>

              <div>
                <label className={fieldLabel}>
                  Latitude
                </label>
                <input
                  type="number" step="0.00000001" name="latitude" value={initialForm.latitude}
                  onChange={handleChange} placeholder="31.5497"
                  className={textInput}
                />
              </div>

              <div>
                <label className={fieldLabel}>
                  Longitude
                </label>
                <input
                  type="number" step="0.00000001" name="longitude" value={initialForm.longitude}
                  onChange={handleChange} placeholder="74.3436"
                  className={textInput}
                />
              </div>
            </div>
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
            to="/user"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}