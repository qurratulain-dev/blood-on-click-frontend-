import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import {
  bloodBankSchema,
  donorSchema,
  seekerSchema,
} from "@/features/auth/schemas/register";
import { BLOOD_GROUPS, GENDERS } from "@/config/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { REGISTER_ROLES } from "./registerRoles";

const schemas = {
  donor: donorSchema,
  blood_bank: bloodBankSchema,
  seeker: seekerSchema,
};

const inputClass =
  "h-11 w-full rounded-xl border-border bg-white px-3.5 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-red-400 focus-visible:ring-red-500/20 md:text-sm";
const selectClass =
  "h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm shadow-sm transition-colors focus-visible:border-red-400 focus-visible:ring-red-500/20";
const textareaClass =
  "min-h-[96px] w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-red-400 focus-visible:ring-red-500/20";

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-xs font-medium text-red-600">
      {message}
    </p>
  );
}

function TextField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  registration,
  error,
  ...rest
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, rest.step && "text-sm")}
        {...rest}
        {...registration}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function PasswordField({ id, label, autoComplete, registration, error }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(inputClass, "pr-12")}
          {...registration}
        />
        <button
          type="button"
          onClick={() => setShow((value) => !value)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
        >
          {show ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function SelectField({
  id,
  label,
  registration,
  error,
  placeholder,
  options,
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={selectClass}
        {...registration}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function TextareaField({ id, label, rows, placeholder, registration, error }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={textareaClass}
        {...registration}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FormGroup({ title, children }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-red-600">
        {title}
      </legend>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}

function DonorFields({ register, errors }) {
  return (
    <>
      <FormGroup title="Account details">
        <TextField
          id="donor-name"
          label="Full Name"
          autoComplete="name"
          registration={register("name")}
          error={errors.name?.message}
        />
        <TextField
          id="donor-username"
          label="Username"
          autoComplete="username"
          registration={register("username")}
          error={errors.username?.message}
        />
        <TextField
          id="donor-email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <PasswordField
          id="donor-password"
          label="Password"
          autoComplete="new-password"
          registration={register("password")}
          error={errors.password?.message}
        />
        <PasswordField
          id="donor-password-confirmation"
          label="Confirm Password"
          autoComplete="new-password"
          registration={register("password_confirmation")}
          error={errors.password_confirmation?.message}
        />
      </FormGroup>

      <FormGroup title="Profile details">
        <SelectField
          id="donor-blood-group"
          label="Blood Group"
          placeholder="Select Blood Group"
          options={BLOOD_GROUPS}
          registration={register("blood_group")}
          error={errors.blood_group?.message}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="donor-gender"
            label="Gender"
            options={GENDERS}
            registration={register("gender")}
            error={errors.gender?.message}
          />
          <TextField
            id="donor-age"
            label="Age"
            type="number"
            registration={register("age")}
            error={errors.age?.message}
          />
        </div>
        <TextField
          id="donor-weight"
          label="Weight (kg)"
          type="number"
          step="0.01"
          registration={register("weight")}
          error={errors.weight?.message}
        />
      </FormGroup>

      <FormGroup title="Contact details">
        <TextField
          id="donor-phone"
          label="Phone"
          autoComplete="tel"
          registration={register("phone")}
          error={errors.phone?.message}
        />
        <TextareaField
          id="donor-address"
          label="Address"
          rows={3}
          registration={register("address")}
          error={errors.address?.message}
        />
      </FormGroup>
    </>
  );
}

function BloodBankFields({ register, errors }) {
  return (
    <>
      <FormGroup title="Account details">
        <TextField
          id="bank-name"
          label="Full Name"
          autoComplete="name"
          registration={register("name")}
          error={errors.name?.message}
        />
        <TextField
          id="bank-username"
          label="Username"
          autoComplete="username"
          registration={register("username")}
          error={errors.username?.message}
        />
        <TextField
          id="bank-email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <PasswordField
          id="bank-password"
          label="Password"
          autoComplete="new-password"
          registration={register("password")}
          error={errors.password?.message}
        />
        <PasswordField
          id="bank-password-confirmation"
          label="Confirm Password"
          autoComplete="new-password"
          registration={register("password_confirmation")}
          error={errors.password_confirmation?.message}
        />
      </FormGroup>

      <FormGroup title="Blood bank details">
        <TextField
          id="bank-bank-name"
          label="Bank Name"
          registration={register("bank_name")}
          error={errors.bank_name?.message}
        />
        <TextField
          id="bank-registration-number"
          label="Registration Number"
          registration={register("registration_number")}
          error={errors.registration_number?.message}
        />
      </FormGroup>

      <FormGroup title="Contact details">
        <TextField
          id="bank-phone"
          label="Phone"
          autoComplete="tel"
          registration={register("phone")}
          error={errors.phone?.message}
        />
        <TextareaField
          id="bank-address"
          label="Address"
          rows={2}
          registration={register("address")}
          error={errors.address?.message}
        />
      </FormGroup>
    </>
  );
}

function SeekerFields({ register, errors }) {
  return (
    <>
      <FormGroup title="Account details">
        <TextField
          id="seeker-name"
          label="Full Name"
          autoComplete="name"
          registration={register("name")}
          error={errors.name?.message}
        />
        <TextField
          id="seeker-username"
          label="Username"
          autoComplete="username"
          registration={register("username")}
          error={errors.username?.message}
        />
        <TextField
          id="seeker-email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <PasswordField
          id="seeker-password"
          label="Password"
          autoComplete="new-password"
          registration={register("password")}
          error={errors.password?.message}
        />
        <PasswordField
          id="seeker-password-confirmation"
          label="Confirm Password"
          autoComplete="new-password"
          registration={register("password_confirmation")}
          error={errors.password_confirmation?.message}
        />
      </FormGroup>

      <FormGroup title="Contact details">
        <TextField
          id="seeker-phone"
          label="Phone"
          autoComplete="tel"
          registration={register("phone")}
          error={errors.phone?.message}
        />
        <TextareaField
          id="seeker-address"
          label="Address"
          rows={2}
          registration={register("address")}
          error={errors.address?.message}
        />
      </FormGroup>
    </>
  );
}

const roleForms = {
  donor: DonorFields,
  blood_bank: BloodBankFields,
  seeker: SeekerFields,
};

export function RegisterForm({ selectedRole, onSubmit, isPending }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemas[selectedRole]),
    defaultValues: { role_type: selectedRole },
  });

  const role = REGISTER_ROLES.find((item) => item.id === selectedRole);
  const Fields = roleForms[selectedRole];
  const Icon = role.icon;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-6 motion-safe:animate-fade-up motion-safe:[animation-delay:320ms]"
    >
      <input type="hidden" {...register("role_type")} />

      <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/60 p-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-foreground">{role.heading}</h2>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {role.formDescription}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <Fields register={register} errors={errors} />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="mt-6 h-11 w-full gap-2 rounded-xl bg-red-600 text-base text-white shadow-sm shadow-red-600/30 transition-colors hover:bg-red-700 focus-visible:ring-red-500/40"
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Creating account...
          </>
        ) : (
          <>
            Create Account
            <UserPlus className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
