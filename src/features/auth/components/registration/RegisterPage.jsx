import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { donorSchema, bloodBankSchema, seekerSchema } from "@/features/auth/schemas/register";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BLOOD_GROUPS, GENDERS } from "@/config/constants";
import { Loader2, User, Building2, Search } from "lucide-react";
import { Link } from "react-router-dom";

const roleOptions = [
  { id: "donor", icon: User, label: "Register as Donor", color: "text-red-600" },
  { id: "blood_bank", icon: Building2, label: "Register as Blood Bank", color: "text-blue-600" },
  { id: "seeker", icon: Search, label: "Register as Seeker", color: "text-green-600" },
];

const headerTitles = {
  donor: "Register as Blood Donor",
  blood_bank: "Register as Blood Bank",
  seeker: "Register as Blood Seeker",
};

const schemas = {
  donor: donorSchema,
  blood_bank: bloodBankSchema,
  seeker: seekerSchema,
};

function DonorForm({ register: reg, errors }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium">Full Name</label>
        <Input {...reg("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Username</label>
        <Input {...reg("username")} />
        {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input type="email" {...reg("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Phone</label>
        <Input {...reg("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <Input type="password" {...reg("password")} />
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Confirm Password</label>
        <Input type="password" {...reg("password_confirmation")} />
        {errors.password_confirmation && <p className="mt-1 text-xs text-red-500">{errors.password_confirmation.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Blood Group</label>
        <select {...reg("blood_group")} className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
          <option value="">Select Blood Group</option>
          {BLOOD_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        {errors.blood_group && <p className="mt-1 text-xs text-red-500">{errors.blood_group.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Gender</label>
        <select {...reg("gender")} className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
          {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Age</label>
        <Input type="number" {...reg("age")} />
        {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Weight (kg)</label>
        <Input type="number" step="0.01" {...reg("weight")} />
        {errors.weight && <p className="mt-1 text-xs text-red-500">{errors.weight.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium">Address</label>
        <textarea rows={2} {...reg("address")} className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 md:text-sm dark:bg-input/30" />
        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
      </div>
    </div>
  );
}

function BloodBankForm({ register: reg, errors }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium">Full Name</label>
        <Input {...reg("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Username</label>
        <Input {...reg("username")} />
        {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input type="email" {...reg("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Phone</label>
        <Input {...reg("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <Input type="password" {...reg("password")} />
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Confirm Password</label>
        <Input type="password" {...reg("password_confirmation")} />
        {errors.password_confirmation && <p className="mt-1 text-xs text-red-500">{errors.password_confirmation.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Bank Name</label>
        <Input {...reg("bank_name")} />
        {errors.bank_name && <p className="mt-1 text-xs text-red-500">{errors.bank_name.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Registration Number</label>
        <Input {...reg("registration_number")} />
        {errors.registration_number && <p className="mt-1 text-xs text-red-500">{errors.registration_number.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium">Address</label>
        <textarea rows={2} {...reg("address")} className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 md:text-sm dark:bg-input/30" />
        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
      </div>
    </div>
  );
}

function SeekerForm({ register: reg, errors }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium">Full Name</label>
        <Input {...reg("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Username</label>
        <Input {...reg("username")} />
        {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input type="email" {...reg("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Phone</label>
        <Input {...reg("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <Input type="password" {...reg("password")} />
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Confirm Password</label>
        <Input type="password" {...reg("password_confirmation")} />
        {errors.password_confirmation && <p className="mt-1 text-xs text-red-500">{errors.password_confirmation.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium">Address</label>
        <textarea rows={2} {...reg("address")} className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 md:text-sm dark:bg-input/30" />
        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
      </div>
    </div>
  );
}

const formComponents = {
  donor: DonorForm,
  blood_bank: BloodBankForm,
  seeker: SeekerForm,
};

export function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const { mutate, isPending } = useRegister();
  const schema = selectedRole ? schemas[selectedRole] : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: { role_type: selectedRole },
  });

  const onSubmit = (data) => mutate(data);

  if (selectedRole) {
    const FormComponent = formComponents[selectedRole];
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="overflow-hidden rounded-xl border shadow">
            <div className="bg-red-600 px-6 py-4 text-white">
              <h4 className="m-0 text-lg font-semibold">{headerTitles[selectedRole]}</h4>
            </div>
            <div className="bg-white p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...register("role_type")} />
                <FormComponent register={register} errors={errors} />
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                  {isPending ? "Registering..." : "Register"}
                </Button>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <button type="button" onClick={() => setSelectedRole(null)} className="hover:text-foreground">&larr; Back to roles</button>
                  <Link to="/login" className="text-red-600 hover:underline">Already have an account?</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="overflow-hidden rounded-xl border shadow">
          <div className="bg-red-600 px-6 py-4 text-white">
            <h4 className="m-0 text-lg font-semibold">Register as User</h4>
          </div>
          <div className="bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {roleOptions.map(({ id, icon: Icon, label }) => (
                <button key={id} type="button" onClick={() => setSelectedRole(id)}
                  className="flex flex-col items-center gap-2 rounded-lg border-2 border-red-200 px-4 py-6 text-sm font-medium text-red-700 transition-all hover:border-red-500 hover:bg-red-50">
                  <Icon className="size-8" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
