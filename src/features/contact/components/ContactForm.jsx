import { useState } from "react";
import { Info, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialErrors = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

function validate(values) {
  const errors = { ...initialErrors };
  if (!values.fullName.trim()) errors.fullName = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  if (!values.message.trim()) errors.message = "Please enter your message.";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState(initialErrors);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;
    setSubmitted(true);
  };

  const fieldState = (name) => ({
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : name === "fullName" || name === "email" ? `${name}-hint` : undefined,
  });

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-white p-6 shadow-[0_24px_60px_-32px_rgba(190,18,60,0.35)] motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] sm:p-8">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-red-100/60 blur-3xl" />
      </div>

      <div className="relative">
        <h3 className="text-xl font-semibold tracking-tight">Send us a message</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Have something to share? Fill out the form and tell us how we can
          help.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <div>
            <label htmlFor="contact-fullName" className="mb-2 block text-xs font-medium text-muted-foreground">
              Full Name <span className="text-red-600">*</span>
            </label>
            <Input
              type="text"
              name="fullName"
              id="contact-fullName"
              value={values.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className={cn(
                "h-11 border-border px-3 focus-visible:border-red-500 focus-visible:ring-3 focus-visible:ring-red-600/20",
                errors.fullName && "border-red-500 focus-visible:ring-red-600/20"
              )}
              {...fieldState("fullName")}
            />
            {errors.fullName ? (
              <p id="fullName-error" role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.fullName}
              </p>
            ) : (
              <p id="fullName-hint" className="mt-1.5 text-xs text-muted-foreground">
                How should we address you?
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-2 block text-xs font-medium text-muted-foreground">
              Email Address <span className="text-red-600">*</span>
            </label>
            <Input
              type="email"
              name="email"
              id="contact-email"
              value={values.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className={cn(
                "h-11 border-border px-3 focus-visible:border-red-500 focus-visible:ring-3 focus-visible:ring-red-600/20",
                errors.email && "border-red-500 focus-visible:ring-red-600/20"
              )}
              {...fieldState("email")}
            />
            {errors.email ? (
              <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.email}
              </p>
            ) : (
              <p id="email-hint" className="mt-1.5 text-xs text-muted-foreground">
                We&rsquo;ll use this to follow up with you.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-subject" className="mb-2 block text-xs font-medium text-muted-foreground">
              Subject <span className="text-red-600">*</span>
            </label>
            <Input
              type="text"
              name="subject"
              id="contact-subject"
              value={values.subject}
              onChange={handleChange}
              placeholder="What can we help with?"
              required
              className={cn(
                "h-11 border-border px-3 focus-visible:border-red-500 focus-visible:ring-3 focus-visible:ring-red-600/20",
                errors.subject && "border-red-500 focus-visible:ring-red-600/20"
              )}
              {...fieldState("subject")}
            />
            {errors.subject && (
              <p id="subject-error" role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.subject}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-2 block text-xs font-medium text-muted-foreground">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              name="message"
              id="contact-message"
              value={values.message}
              onChange={handleChange}
              placeholder="Tell us how we can help..."
              rows={5}
              required
              className={cn(
                "w-full rounded-lg border border-border bg-transparent px-3 py-2.5 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-red-500 focus-visible:ring-3 focus-visible:ring-red-600/20 dark:bg-input/30 md:text-sm",
                errors.message && "border-red-500 focus-visible:ring-red-600/20"
              )}
              style={{ minHeight: "132px" }}
              {...fieldState("message")}
            />
            {errors.message && (
              <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="h-11 w-full gap-2 px-6 text-base text-white shadow-sm shadow-red-600/30 hover:bg-red-700"
          >
            <Send className="size-4" aria-hidden="true" />
            Send Message
          </Button>

          {submitted && (
            <div
              role="status"
              className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-gray-50 p-4"
            >
              <Info
                className="mt-0.5 size-4 shrink-0 text-red-600"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Thanks for reaching out. Your message is ready, but message
                delivery is not connected yet, so nothing was sent.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}