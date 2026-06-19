import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCounts } from "@/features/admin/api/admin";
import { useAddUser } from "@/features/admin/hooks/useAddUser";
import { donorSchema, bloodBankSchema, seekerSchema } from "@/features/admin/schemas/admin";
import { BLOOD_GROUPS } from "@/config/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Users, Building2, Search, User, Shield, Info } from "lucide-react";

const tabs = [
  { key: "donor", icon: User, label: "Add Donor" },
  { key: "blood_bank", icon: Building2, label: "Add Blood Bank" },
  { key: "seeker", icon: Search, label: "Add Seeker" },
];

const schemas = { donor: donorSchema, blood_bank: bloodBankSchema, seeker: seekerSchema };

const defaultPasswords = { donor: "donor123", blood_bank: "bank123", seeker: "seeker123" };

function DonorForm({ register: reg, errors }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
        <Input {...reg("full_name")} />
        {errors.full_name && <p className="mt-1 text-xs text-red-500">{errors.full_name.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Email <span className="text-red-500">*</span></label>
        <Input type="email" {...reg("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password <span className="text-red-500">*</span></label>
        <Input {...reg("password")} />
        <p className="mt-0.5 text-xs text-muted-foreground">Default: donor123</p>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Phone <span className="text-red-500">*</span></label>
        <Input {...reg("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Blood Group <span className="text-red-500">*</span></label>
        <select {...reg("blood_group")} className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
          <option value="">Select Blood Group</option>
          {BLOOD_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        {errors.blood_group && <p className="mt-1 text-xs text-red-500">{errors.blood_group.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Gender <span className="text-red-500">*</span></label>
        <select {...reg("gender")} className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Age <span className="text-red-500">*</span></label>
        <Input type="number" {...reg("age")} />
        {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Weight (kg) <span className="text-red-500">*</span></label>
        <Input type="number" step="0.01" {...reg("weight")} />
        {errors.weight && <p className="mt-1 text-xs text-red-500">{errors.weight.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Status</label>
        <select {...reg("status")} className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
          <option value="available">Available</option>
          <option value="not_available">Not Available</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Latitude</label>
        <Input placeholder="31.5497" {...reg("latitude")} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Longitude</label>
        <Input placeholder="74.3436" {...reg("longitude")} />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium">Address <span className="text-red-500">*</span></label>
        <textarea rows={2} {...reg("address")} className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none focus-visible:border-ring focus-visible:ring-3 md:text-sm" />
        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
      </div>
    </div>
  );
}

function BloodBankForm({ register: reg, errors }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium">Bank Name <span className="text-red-500">*</span></label>
        <Input {...reg("bank_name")} />
        {errors.bank_name && <p className="mt-1 text-xs text-red-500">{errors.bank_name.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Email <span className="text-red-500">*</span></label>
        <Input type="email" {...reg("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password <span className="text-red-500">*</span></label>
        <Input {...reg("password")} />
        <p className="mt-0.5 text-xs text-muted-foreground">Default: bank123</p>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Phone <span className="text-red-500">*</span></label>
        <Input {...reg("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Registration Number <span className="text-red-500">*</span></label>
        <Input {...reg("registration_number")} />
        {errors.registration_number && <p className="mt-1 text-xs text-red-500">{errors.registration_number.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">License Number</label>
        <Input {...reg("license_number")} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Status</label>
        <select {...reg("status")} className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Latitude</label>
        <Input placeholder="31.5497" {...reg("latitude")} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Longitude</label>
        <Input placeholder="74.3436" {...reg("longitude")} />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium">Address <span className="text-red-500">*</span></label>
        <textarea rows={2} {...reg("address")} className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none focus-visible:border-ring focus-visible:ring-3 md:text-sm" />
        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
      </div>
    </div>
  );
}

function SeekerForm({ register: reg, errors }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
        <Input {...reg("full_name")} />
        {errors.full_name && <p className="mt-1 text-xs text-red-500">{errors.full_name.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Email <span className="text-red-500">*</span></label>
        <Input type="email" {...reg("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password <span className="text-red-500">*</span></label>
        <Input {...reg("password")} />
        <p className="mt-0.5 text-xs text-muted-foreground">Default: seeker123</p>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Phone <span className="text-red-500">*</span></label>
        <Input {...reg("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Latitude</label>
        <Input placeholder="31.5497" {...reg("latitude")} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Longitude</label>
        <Input placeholder="74.3436" {...reg("longitude")} />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium">Address <span className="text-red-500">*</span></label>
        <textarea rows={2} {...reg("address")} className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none focus-visible:border-ring focus-visible:ring-3 md:text-sm" />
        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
      </div>
    </div>
  );
}

const formComponents = { donor: DonorForm, blood_bank: BloodBankForm, seeker: SeekerForm };

export function AddUser() {
  const [activeTab, setActiveTab] = useState("donor");
  const { mutate, isPending } = useAddUser();

  const { data: counts } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await getCounts();
      return res.data;
    },
  });

  const schema = schemas[activeTab];
  const FormComponent = formComponents[activeTab];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      role: activeTab,
      password: defaultPasswords[activeTab],
      status: activeTab === "donor" ? "available" : "active",
    },
  });

  const onSubmit = (data) => {
    mutate(data, { onSuccess: () => reset() });
  };

  const statsCards = [
    { icon: Users, label: "Total Donors", value: counts?.donors },
    { icon: Building2, label: "Total Blood Banks", value: counts?.blood_banks },
    { icon: Shield, label: "Total Seekers", value: counts?.seekers },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="mb-1 text-2xl font-bold">Add New User</h2>
      <hr className="mb-6" />

      {/* Stats Cards - same style as old PHP */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {statsCards.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl border bg-white p-6 text-center shadow-sm">
            <Icon className="mx-auto size-8 text-red-600" />
            <p className="mt-2 text-2xl font-bold">{value ?? "—"}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs - matching old PHP tab style */}
      <div className="mb-4 flex gap-1 rounded-lg bg-gray-200 p-1">
        {tabs.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setActiveTab(key);
              reset({
                role: key,
                password: defaultPasswords[key],
                status: key === "donor" ? "available" : "active",
              });
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition ${
              activeTab === key ? "bg-white text-red-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Form Card */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="bg-red-600 px-6 py-3 text-white">
          <h5 className="flex items-center gap-2 font-semibold">
            <Users className="size-4" />
            Add New {activeTab === "donor" ? "Donor" : activeTab === "blood_bank" ? "Blood Bank" : "Seeker"}
          </h5>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...register("role")} />
            <FormComponent register={register} errors={errors} />
            <div className="flex gap-2">
              <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                {isPending ? "Saving..." : "Save"}
              </Button>
              <Button type="button" variant="outline" onClick={() => {
                reset({
                  role: activeTab,
                  password: defaultPasswords[activeTab],
                  status: activeTab === "donor" ? "available" : "active",
                });
              }}>Reset</Button>
            </div>
          </form>
        </div>
      </div>

      {/* Quick Tips - matches old PHP exactly */}
      <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
        <div className="flex items-start gap-2">
          <Info className="mt-0.5 size-4 shrink-0" />
          <div>
            <strong>Quick Tips:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>All passwords are stored as plain text (as per requirements)</li>
              <li>Default passwords are provided for quick setup</li>
              <li>Users will receive a welcome notification after account creation</li>
              <li>For blood banks, stock entries for all 8 blood groups are created automatically</li>
              <li>You can edit or delete users from the Manage Users section</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
