"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

import type { CareerActionState } from "@/app/admin/careers/actions";
import {
  careerDepartments,
  employmentTypes,
  type CareerRole,
} from "@/lib/types";

type CareerRoleFormProps = {
  action: (
    previousState: CareerActionState,
    formData: FormData,
  ) => Promise<CareerActionState>;
  role?: CareerRole;
  submitLabel: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function Field({
  label,
  name,
  defaultValue = "",
  placeholder,
  required = true,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
        {label}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="min-h-12 border border-border-gray bg-white px-4 text-sm text-charcoal-text outline-none transition placeholder:text-slate-gray/60 focus:border-primary-navy"
      />
    </label>
  );
}

export function CareerRoleForm({ action, role, submitLabel }: CareerRoleFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [title, setTitle] = useState(role?.title ?? "");
  const slug = slugify(title);

  return (
    <form action={formAction} className="grid gap-8">
      {state.error ? (
        <div className="border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-700">
          {state.error}
        </div>
      ) : null}

      <input type="hidden" name="slug" value={slug} />

      <section className="border border-border-gray bg-white p-6 md:p-8">
        <h2 className="font-display text-3xl text-charcoal-text">Role details</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
              Title
            </span>
            <input
              name="title"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Senior Sales Advisor"
              className="min-h-12 border border-border-gray bg-white px-4 text-sm text-charcoal-text outline-none transition placeholder:text-slate-gray/60 focus:border-primary-navy"
            />
          </label>

          <div className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
              Slug
            </span>
            <div className="flex min-h-12 items-center border border-border-gray bg-cool-mist px-4 text-sm text-slate-gray">
              {slug || "Generated automatically from title"}
            </div>
          </div>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
              Department
            </span>
            <select
              name="department"
              defaultValue={role?.department ?? "Sales"}
              className="min-h-12 border border-border-gray bg-white px-4 text-sm text-charcoal-text outline-none transition focus:border-primary-navy"
            >
              {careerDepartments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
              Employment type
            </span>
            <select
              name="employmentType"
              defaultValue={role?.employmentType ?? "Full-time"}
              className="min-h-12 border border-border-gray bg-white px-4 text-sm text-charcoal-text outline-none transition focus:border-primary-navy"
            >
              {employmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <Field
            label="Location"
            name="location"
            defaultValue={role?.location}
            placeholder="Jaipur, Rajasthan"
          />
        </div>
      </section>

      <section className="border border-border-gray bg-white p-6 md:p-8">
        <h2 className="font-display text-3xl text-charcoal-text">Role content</h2>
        <div className="mt-6 grid gap-5">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
              Brief Job Description
            </span>
            <textarea
              name="summary"
              required
              defaultValue={role?.summary}
              rows={4}
              placeholder="A concise public-facing description of the role."
              className="border border-border-gray bg-white px-4 py-3 text-sm leading-7 text-charcoal-text outline-none transition placeholder:text-slate-gray/60 focus:border-primary-navy"
            />
          </label>
        </div>
      </section>

      <section className="border border-border-gray bg-white p-6 md:p-8">
        <label className="flex items-start gap-3 border border-border-gray p-4">
          <input
            name="isOpen"
            type="checkbox"
            defaultChecked={role?.isOpen ?? true}
            className="mt-1 size-4 accent-primary-navy"
          />
          <span>
            <span className="block text-sm font-semibold text-charcoal-text">
              Open role
            </span>
            <span className="mt-1 block text-xs leading-5 text-slate-gray">
              Shows this role on the public Careers page.
            </span>
          </span>
        </label>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Link
          href="/admin/careers"
          className="inline-flex min-h-12 items-center justify-center border border-border-gray px-7 text-sm font-semibold uppercase tracking-[0.16em] text-slate-gray transition hover:border-primary-navy hover:text-primary-navy"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="min-h-12 bg-primary-navy px-7 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-steel-blue disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
