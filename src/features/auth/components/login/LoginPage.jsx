import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/features/auth/schemas/login";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, User, Building2, Search, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const roleOptions = [
  { id: "donor", icon: User, label: "Donor Login", color: "text-red-600" },
  { id: "blood_bank", icon: Building2, label: "Blood Bank Login", color: "text-blue-600" },
  { id: "seeker", icon: Search, label: "Seeker Login", color: "text-green-600" },
  { id: "admin", icon: Shield, label: "Admin Login", color: "text-purple-600" },
];

const headerTitles = {
  donor: "Login as Blood Donor",
  blood_bank: "Login as Blood Bank",
  seeker: "Login as Seeker",
  admin: "Login as Admin",
};

export function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { role_type: selectedRole },
  });

  const onSubmit = (data) => mutate(data);

  if (selectedRole) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-xl border shadow">
            <div className="bg-red-600 px-6 py-4 text-white">
              <h4 className="m-0 text-lg font-semibold">{headerTitles[selectedRole]}</h4>
            </div>
            <div className="bg-white p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...register("role_type")} />
                <div>
                  <label className="mb-1 block text-sm font-medium">Email Address</label>
                  <Input type="email" {...register("email")} className="w-full" />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Password</label>
                  <Input type="password" {...register("password")} className="w-full" />
                  {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                  {isPending ? "Logging in..." : "Login"}
                </Button>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <button type="button" onClick={() => setSelectedRole(null)} className="hover:text-foreground">&larr; Back to roles</button>
                  <Link to="/register" className="text-red-600 hover:underline">Register here</Link>
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
            <h4 className="m-0 text-lg font-semibold">Login to Your Account</h4>
          </div>
          <div className="bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
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
