"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createCareerRole,
  deleteCareerApplication,
  deleteCareerRole,
  updateCareerRole,
} from "@/lib/careers";
import {
  employmentTypes,
  type CareerRoleFormInput,
  type EmploymentType,
} from "@/lib/types";

export type CareerActionState = {
  error?: string;
};

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseCareerRoleForm(formData: FormData): CareerRoleFormInput {
  const title = text(formData, "title");
  const employmentType = text(formData, "employmentType");

  return {
    title,
    slug: text(formData, "slug") || slugify(title),
    department: text(formData, "department"),
    location: text(formData, "location"),
    employmentType: employmentTypes.includes(employmentType as EmploymentType)
      ? (employmentType as EmploymentType)
      : "Full-time",
    summary: text(formData, "summary"),
    responsibilities: [],
    requirements: [],
    isOpen: formData.get("isOpen") === "on",
    displayOrder: 0,
  };
}

function validateCareerRole(input: CareerRoleFormInput) {
  const required = [
    ["Title", input.title],
    ["Department", input.department],
    ["Location", input.location],
    ["Brief Job Description", input.summary],
  ];

  const missing = required.find(([, value]) => !value);

  return missing ? `${missing[0]} is required.` : null;
}

export async function createCareerRoleAction(
  _previousState: CareerActionState,
  formData: FormData,
): Promise<CareerActionState> {
  const input = parseCareerRoleForm(formData);
  const validationError = validateCareerRole(input);

  if (validationError) {
    return { error: validationError };
  }

  try {
    await createCareerRole(input);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to create role.",
    };
  }

  revalidatePath("/careers");
  redirect("/admin/careers");
}

export async function updateCareerRoleAction(
  id: string,
  _previousState: CareerActionState,
  formData: FormData,
): Promise<CareerActionState> {
  const input = parseCareerRoleForm(formData);
  const validationError = validateCareerRole(input);

  if (validationError) {
    return { error: validationError };
  }

  try {
    await updateCareerRole(id, input);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to update role.",
    };
  }

  revalidatePath("/careers");
  redirect("/admin/careers");
}

export async function deleteCareerRoleAction(formData: FormData) {
  await deleteCareerRole(text(formData, "id"));
  revalidatePath("/careers");
  redirect("/admin/careers");
}

export async function deleteCareerApplicationAction(formData: FormData) {
  await deleteCareerApplication(text(formData, "id"));
  redirect("/admin/careers/applications");
}
