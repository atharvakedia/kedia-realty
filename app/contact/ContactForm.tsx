"use client";

import { useActionState } from "react";

import { submitContactLeadAction } from "@/app/contact/actions";

function Field({
  label,
  name,
  type = "text",
  required = true,
  placeholder,
  inputMode,
  pattern,
  maxLength,
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  inputMode?: "email" | "tel" | "text" | "url" | "numeric";
  pattern?: string;
  maxLength?: number;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        defaultValue={defaultValue}
        aria-invalid={Boolean(error)}
        className={`min-h-12 border bg-white px-4 text-sm text-charcoal-text outline-none transition placeholder:text-slate-gray/60 focus:border-primary-navy ${
          error ? "border-red-500" : "border-border-gray"
        }`}
      />
      {error ? <span className="text-xs text-red-700">{error}</span> : null}
    </label>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactLeadAction,
    {},
  );
  const values = state.values ?? {};
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form
      action={formAction}
      className="grid gap-5 bg-cool-mist p-6 md:p-8"
      aria-label="Contact form"
    >
      {state.error ? (
        <div className="border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-700">
          {state.error}
        </div>
      ) : null}
      {state.success ? (
        <div className="border border-green-200 bg-green-50 p-4 text-sm leading-7 text-green-800">
          {state.success}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Name"
          name="name"
          placeholder="Your full name"
          defaultValue={values.name}
          error={fieldErrors.name}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]{10}"
          maxLength={10}
          placeholder="9876543210"
          defaultValue={values.phone}
          error={fieldErrors.phone}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          required={false}
          placeholder="you@example.com"
          defaultValue={values.email}
          error={fieldErrors.email}
        />
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
          How can we help?
        </span>
        <textarea
          name="message"
          required
          defaultValue={values.message}
          placeholder="Tell us whether you are looking for project information, a site visit, pricing, layouts, or a callback."
          rows={7}
          aria-invalid={Boolean(fieldErrors.message)}
          className={`resize-y border bg-white px-4 py-3 text-sm leading-7 text-charcoal-text outline-none transition placeholder:text-slate-gray/60 focus:border-primary-navy ${
            fieldErrors.message ? "border-red-500" : "border-border-gray"
          }`}
        />
        {fieldErrors.message ? (
          <span className="text-xs text-red-700">{fieldErrors.message}</span>
        ) : null}
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="min-h-12 justify-self-start bg-primary-navy px-7 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-steel-blue disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
