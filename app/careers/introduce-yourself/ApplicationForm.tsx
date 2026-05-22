"use client";

import { useActionState } from "react";

import { submitCareerApplicationAction } from "@/app/careers/introduce-yourself/actions";
import type { CareerRole } from "@/lib/types";

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

export function ApplicationForm({ roles }: { roles: CareerRole[] }) {
  const [state, formAction, isPending] = useActionState(
    submitCareerApplicationAction,
    {},
  );
  const values = state.values ?? {};
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="border border-border-gray bg-white p-6 md:p-8">
      {state.error ? (
        <div className="mb-6 border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-700">
          {state.error}
        </div>
      ) : null}
      {state.success ? (
        <div className="mb-6 border border-green-200 bg-green-50 p-4 text-sm leading-7 text-green-800">
          {state.success}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Name"
          name="candidateName"
          placeholder="Your full name"
          defaultValue={values.candidateName}
          error={fieldErrors.candidateName}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          placeholder="you@example.com"
          defaultValue={values.email}
          error={fieldErrors.email}
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
          label="Expected Salary"
          name="expectedSalary"
          required={false}
          placeholder="₹"
          defaultValue={values.expectedSalary}
          error={fieldErrors.expectedSalary}
        />

        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
            Applying for
          </span>
          <select
            name="roleTitle"
            required
            defaultValue={values.roleTitle ?? ""}
            aria-invalid={Boolean(fieldErrors.roleTitle)}
            className={`min-h-12 border bg-white px-4 text-sm text-charcoal-text outline-none transition focus:border-primary-navy ${
              fieldErrors.roleTitle ? "border-red-500" : "border-border-gray"
            }`}
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id ?? role.slug} value={role.title}>
                {role.title}
              </option>
            ))}
            <option value="General introduction">General introduction</option>
          </select>
          {fieldErrors.roleTitle ? (
            <span className="text-xs text-red-700">{fieldErrors.roleTitle}</span>
          ) : null}
        </label>

        <input type="hidden" name="roleId" value="" />

        <label className="grid gap-2 md:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
            Resume
          </span>
          <input
            name="resume"
            type="file"
            required
            multiple={false}
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            aria-invalid={Boolean(fieldErrors.resume)}
            className={`border bg-white px-4 py-3 text-sm text-charcoal-text file:mr-4 file:border-0 file:bg-primary-navy file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.14em] file:text-white focus:border-primary-navy ${
              fieldErrors.resume ? "border-red-500" : "border-border-gray"
            }`}
          />
          <span className="text-xs leading-5 text-slate-gray">
            PDF, DOC, or DOCX. Maximum file size 10MB.
          </span>
          {fieldErrors.resume ? (
            <span className="text-xs text-red-700">
              {fieldErrors.resume} Files must be selected again after a failed submit.
            </span>
          ) : null}
        </label>

        <Field
          label="Portfolio / LinkedIn"
          name="portfolioUrl"
          type="url"
          required={false}
          placeholder="https://"
          defaultValue={values.portfolioUrl}
          error={fieldErrors.portfolioUrl}
        />

        <label className="grid gap-2 md:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
            Introduce yourself
          </span>
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Tell us about the role you are interested in, your relevant experience, and why Kedia Group feels like the right fit."
            defaultValue={values.message}
            aria-invalid={Boolean(fieldErrors.message)}
            className={`border bg-white px-4 py-3 text-sm leading-7 text-charcoal-text outline-none transition placeholder:text-slate-gray/60 focus:border-primary-navy ${
              fieldErrors.message ? "border-red-500" : "border-border-gray"
            }`}
          />
          <span className="text-xs leading-5 text-slate-gray">
            Maximum 200 words.
          </span>
          {fieldErrors.message ? (
            <span className="text-xs text-red-700">{fieldErrors.message}</span>
          ) : null}
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-8 min-h-12 bg-primary-navy px-7 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-steel-blue disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}
