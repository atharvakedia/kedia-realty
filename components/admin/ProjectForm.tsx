"use client";

import { useActionState, useMemo, useState } from "react";

import type { ProjectActionState } from "@/app/admin/projects/actions";
import { AmenitySelector } from "@/components/admin/AmenitySelector";
import { LayoutImageUploader } from "@/components/admin/LayoutImageUploader";
import { ProjectImageManager } from "@/components/admin/ProjectImageManager";
import {
  projectStatuses,
  projectTypes,
  type Project,
  type ProjectLayout,
} from "@/lib/types";

type ProjectFormProps = {
  action: (
    previousState: ProjectActionState,
    formData: FormData,
  ) => Promise<ProjectActionState>;
  project?: Project;
  submitLabel: string;
};

const emptyLayout: ProjectLayout = {
  title: "",
  type: "",
  area: "",
  image: "",
  description: "",
  displayOrder: 0,
};

function Field({
  label,
  name,
  defaultValue = "",
  required = true,
  type = "text",
  placeholder,
  min,
  step,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: string;
  placeholder?: string;
  min?: string | number;
  step?: string | number;
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
        defaultValue={defaultValue}
        placeholder={placeholder}
        min={min}
        step={step}
        className="min-h-12 border border-border-gray bg-white px-4 text-sm text-charcoal-text outline-none transition focus:border-primary-navy"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue = "",
  required = true,
  rows = 5,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
        {label}
      </span>
      <textarea
        name={name}
        required={required}
        defaultValue={defaultValue}
        rows={rows}
        className="border border-border-gray bg-white px-4 py-3 text-sm leading-7 text-charcoal-text outline-none transition focus:border-primary-navy"
      />
      {hint ? <span className="text-xs text-slate-gray">{hint}</span> : null}
    </label>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function numericText(value: string | undefined) {
  if (!value) {
    return "";
  }

  const match = value.match(/\d+(?:\.\d+)?/);

  return match?.[0] ?? "";
}

export function ProjectForm({ action, project, submitLabel }: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [title, setTitle] = useState(project?.title ?? "");
  const [layouts, setLayouts] = useState<ProjectLayout[]>(
    project?.layouts?.length ? project.layouts : [{ ...emptyLayout, displayOrder: 10 }],
  );

  const slug = slugify(title);
  const layoutsJson = useMemo(() => JSON.stringify(layouts), [layouts]);

  const updateLayout = (
    index: number,
    key: keyof ProjectLayout,
    value: string,
  ) => {
    setLayouts((current) =>
      current.map((layout, layoutIndex) =>
        layoutIndex === index
          ? {
              ...layout,
              [key]: key === "displayOrder" ? Number(value || 0) : value,
            }
          : layout,
      ),
    );
  };

  const addLayout = () => {
    setLayouts((current) => [
      ...current,
      { ...emptyLayout, displayOrder: (current.length + 1) * 10 },
    ]);
  };

  const removeLayout = (index: number) => {
    setLayouts((current) => current.filter((_, layoutIndex) => layoutIndex !== index));
  };

  return (
    <form action={formAction} className="grid gap-8">
      {state.error ? (
        <div className="border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-700">
          {state.error}
        </div>
      ) : null}

      <input type="hidden" name="layoutsJson" value={layoutsJson} />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="displayOrder" value={project?.displayOrder ?? 0} />

      <section className="border border-border-gray bg-white p-6 md:p-8">
        <h2 className="font-display text-3xl text-charcoal-text">Project basics</h2>
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
              placeholder="Kedia Prakash Avenues"
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
              Type
            </span>
            <select
              name="type"
              defaultValue={project?.type ?? "Residential Township"}
              className="min-h-12 border border-border-gray bg-white px-4 text-sm text-charcoal-text outline-none transition focus:border-primary-navy"
            >
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
              Status
            </span>
            <select
              name="status"
              defaultValue={project?.status ?? "Underway"}
              className="min-h-12 border border-border-gray bg-white px-4 text-sm text-charcoal-text outline-none transition focus:border-primary-navy"
            >
              {projectStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <Field
            label="City"
            name="location"
            defaultValue={project?.location}
            placeholder="Jaipur"
          />
          <Field
            label="Region"
            name="region"
            defaultValue={project?.region}
            placeholder="Ajmer Road"
          />
        </div>
      </section>

      <section className="border border-border-gray bg-white p-6 md:p-8">
        <h2 className="font-display text-3xl text-charcoal-text">Project facts</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field
            label="Total area (acres)"
            name="totalArea"
            type="number"
            min="0"
            step="0.01"
            defaultValue={numericText(project?.totalArea)}
            placeholder="12.5"
          />
          <Field
            label="Total units"
            name="totalUnits"
            type="number"
            min="0"
            step="1"
            defaultValue={numericText(project?.totalUnits)}
            placeholder="250"
          />
          <Field
            label="RERA number"
            name="reraNumber"
            defaultValue={project?.reraNumber}
            placeholder="RAJ/P/2026/000000"
          />
          <Field
            label="Launch date"
            name="launchDate"
            defaultValue={project?.launchDate}
            placeholder="Q4 2026"
          />
          <Field
            label="Price label"
            name="priceLabel"
            defaultValue={project?.priceLabel}
            placeholder="₹38 lakh onwards"
          />
          <Field
            label="Area label"
            name="areaLabel"
            defaultValue={project?.areaLabel}
            placeholder="Plots from 111 sq. yd. / Sold Out"
          />
        </div>
      </section>

      <section className="border border-border-gray bg-white p-6 md:p-8">
        <h2 className="font-display text-3xl text-charcoal-text">Content</h2>
        <div className="mt-6 grid gap-5">
          <TextArea label="Description" name="description" defaultValue={project?.description} />
          <AmenitySelector selectedAmenities={project?.amenities} />
          <ProjectImageManager
            slug={slug}
            initialImages={[project?.image, ...(project?.gallery ?? [])].filter(
              Boolean,
            ) as string[]}
          />
          <Field
            label="Google Maps embed URL"
            name="mapEmbedUrl"
            defaultValue={project?.mapEmbedUrl}
            required={false}
          />
        </div>
      </section>

      <section className="border border-border-gray bg-white p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl text-charcoal-text">Layouts & plans</h2>
          <button
            type="button"
            onClick={addLayout}
            className="min-h-10 border border-border-gray px-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy transition hover:border-primary-navy"
          >
            Add layout
          </button>
        </div>

        <div className="mt-6 grid gap-5">
          {layouts.map((layout, index) => (
            <div key={index} className="border border-border-gray bg-soft-white p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-navy">
                  Layout {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeLayout(index)}
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-gray transition hover:text-primary-navy"
                >
                  Remove
                </button>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {(["title", "type", "area"] as const).map((key) => (
                  <label key={key} className="grid gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
                      {key} <span className="text-slate-gray">(optional)</span>
                    </span>
                    <input
                      value={String(layout[key] ?? "")}
                      onChange={(event) => updateLayout(index, key, event.target.value)}
                      className="min-h-11 border border-border-gray bg-white px-4 text-sm outline-none transition focus:border-primary-navy"
                    />
                  </label>
                ))}
                <LayoutImageUploader
                  value={layout.image}
                  onChange={(value) => updateLayout(index, "image", value)}
                  projectSlug={slug}
                  layoutIndex={index}
                />
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
                    Optional note
                  </span>
                  <textarea
                    value={layout.description}
                    onChange={(event) =>
                      updateLayout(index, "description", event.target.value)
                    }
                    rows={3}
                    className="border border-border-gray bg-white px-4 py-3 text-sm leading-7 outline-none transition focus:border-primary-navy"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-border-gray bg-white p-6 md:p-8">
        <h2 className="font-display text-3xl text-charcoal-text">Publishing</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="flex items-start gap-3 border border-border-gray p-4">
            <input
              name="isPublished"
              type="checkbox"
              defaultChecked={project?.isPublished ?? false}
              className="mt-1 size-4 accent-primary-navy"
            />
            <span>
              <span className="block text-sm font-semibold text-charcoal-text">
                Publish project
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-gray">
                Shows this project on the public Projects page.
              </span>
            </span>
          </label>
          <label className="flex items-start gap-3 border border-border-gray p-4">
            <input
              name="isFeatured"
              type="checkbox"
              defaultChecked={project?.isFeatured ?? false}
              className="mt-1 size-4 accent-primary-navy"
            />
            <span>
              <span className="block text-sm font-semibold text-charcoal-text">
                Feature on homepage
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-gray">
                Marks this project for the Featured Projects section.
              </span>
            </span>
          </label>
        </div>
      </section>

      <div className="flex items-center justify-end">
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
