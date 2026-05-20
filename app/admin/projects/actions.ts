"use server";

import { redirect } from "next/navigation";

import { createProject, updateProject } from "@/lib/projects";
import {
  projectStatuses,
  projectTypes,
  type ProjectFormInput,
  type ProjectLayout,
  type ProjectStatus,
  type ProjectType,
} from "@/lib/types";

export type ProjectActionState = {
  error?: string;
};

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function allText(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map((value) => String(value).trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseLayouts(value: string): ProjectLayout[] {
  try {
    const parsed = JSON.parse(value || "[]") as ProjectLayout[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((layout, index) => ({
        title: String(layout.title ?? "").trim(),
        type: String(layout.type ?? "").trim(),
        area: String(layout.area ?? "").trim(),
        image: String(layout.image ?? "").trim(),
        description: String(layout.description ?? "").trim(),
        displayOrder: Number(layout.displayOrder ?? (index + 1) * 10),
      }))
      .filter((layout) => layout.image);
  } catch {
    return [];
  }
}

function parseProjectForm(formData: FormData): ProjectFormInput {
  const type = text(formData, "type");
  const status = text(formData, "status");
  const title = text(formData, "title");
  const slug = text(formData, "slug") || slugify(title);

  return {
    title,
    slug,
    type: projectTypes.includes(type as ProjectType)
      ? (type as ProjectType)
      : "Residential Township",
    status: projectStatuses.includes(status as ProjectStatus)
      ? (status as ProjectStatus)
      : "Underway",
    region: text(formData, "region"),
    location: text(formData, "location"),
    totalArea: text(formData, "totalArea"),
    totalUnits: text(formData, "totalUnits"),
    reraNumber: text(formData, "reraNumber"),
    launchDate: text(formData, "launchDate"),
    priceLabel: text(formData, "priceLabel"),
    areaLabel: text(formData, "areaLabel"),
    description: text(formData, "description"),
    amenities: allText(formData, "amenities"),
    mainImage: text(formData, "mainImage"),
    gallery: lines(text(formData, "gallery")),
    mapEmbedUrl: text(formData, "mapEmbedUrl"),
    layouts: parseLayouts(text(formData, "layoutsJson")),
    isPublished: formData.get("isPublished") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    displayOrder: Number(text(formData, "displayOrder") || 0),
  };
}

function validateProject(input: ProjectFormInput) {
  const required = [
    ["Title", input.title],
    ["Slug", input.slug],
    ["Region", input.region],
    ["City", input.location],
    ["Total area (acres)", input.totalArea],
    ["Total units", input.totalUnits],
    ["RERA number", input.reraNumber],
    ["Launch date", input.launchDate],
    ["Price label", input.priceLabel],
    ["Area label", input.areaLabel],
    ["Description", input.description],
    ["Main image", input.mainImage],
  ];

  const missing = required.find(([, value]) => !value);

  if (missing) {
    return `${missing[0]} is required.`;
  }

  return null;
}

export async function createProjectAction(
  _previousState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  const input = parseProjectForm(formData);
  const validationError = validateProject(input);

  if (validationError) {
    return { error: validationError };
  }

  try {
    await createProject(input);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to create project.",
    };
  }

  redirect("/admin/projects");
}

export async function updateProjectAction(
  id: string,
  _previousState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  const input = parseProjectForm(formData);
  const validationError = validateProject(input);

  if (validationError) {
    return { error: validationError };
  }

  try {
    await updateProject(id, input);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to update project.",
    };
  }

  redirect("/admin/projects");
}
