import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import { careers as fallbackCareers } from "@/lib/data";
import { requireAdmin, requireEditor } from "@/lib/projects";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";
import {
  applicationStatuses,
  employmentTypes,
  type ApplicationStatus,
  type CareerApplication,
  type CareerApplicationRow,
  type CareerRole,
  type CareerRoleFormInput,
  type CareerRoleRow,
  type EmploymentType,
} from "@/lib/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function asEmploymentType(value: string): EmploymentType {
  return employmentTypes.includes(value as EmploymentType)
    ? (value as EmploymentType)
    : "Full-time";
}

function asApplicationStatus(value: string): ApplicationStatus {
  return applicationStatuses.includes(value as ApplicationStatus)
    ? (value as ApplicationStatus)
    : "New";
}

function mapCareerRole(row: CareerRoleRow): CareerRole {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    department: row.department,
    location: row.location,
    employmentType: asEmploymentType(row.employment_type),
    summary: row.summary,
    responsibilities: row.responsibilities ?? [],
    requirements: row.requirements ?? [],
    isOpen: row.is_open,
    displayOrder: row.display_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapCareerApplication(row: CareerApplicationRow): CareerApplication {
  return {
    id: row.id,
    roleId: row.role_id,
    roleTitle: row.role_title,
    candidateName: row.candidate_name,
    email: row.email,
    phone: row.phone,
    city: row.city,
    experience: row.experience,
    expectedSalary: row.expected_salary ?? "",
    resumeUrl: row.resume_url,
    portfolioUrl: row.portfolio_url ?? undefined,
    message: row.message,
    status: asApplicationStatus(row.status),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function fallbackRoles(): CareerRole[] {
  return fallbackCareers.map((career, index) => ({
    id: career.title,
    title: career.title,
    slug: slugify(career.title),
    department: "Operations",
    location: career.location,
    employmentType: asEmploymentType(career.type),
    summary: career.description,
    responsibilities: [],
    requirements: [],
    isOpen: true,
    displayOrder: (index + 1) * 10,
  }));
}

function createPublicSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase environment variables are not configured.");
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function careerRolePayload(input: CareerRoleFormInput) {
  return {
    title: input.title,
    slug: input.slug || slugify(input.title),
    department: input.department,
    location: input.location,
    employment_type: input.employmentType,
    summary: input.summary,
    responsibilities: input.responsibilities,
    requirements: input.requirements,
    is_open: Boolean(input.isOpen),
    display_order: input.displayOrder ?? 0,
  };
}

function isMissingCareersSchema(error: { code?: string; message?: string } | null) {
  return (
    error?.code === "PGRST200" ||
    error?.code === "PGRST204" ||
    error?.code === "PGRST205" ||
    /career_(roles|applications)/i.test(error?.message ?? "")
  );
}

export async function getOpenCareerRoles(): Promise<CareerRole[]> {
  if (!hasSupabaseEnv()) {
    return fallbackRoles();
  }

  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("career_roles")
    .select("*")
    .eq("is_open", true)
    .order("created_at", { ascending: false });

  if (error) {
    if (!isMissingCareersSchema(error)) {
      console.error("Failed to load open career roles", error);
    }
    return fallbackRoles();
  }

  return ((data ?? []) as CareerRoleRow[]).map(mapCareerRole);
}

export async function getAdminCareerRoles(): Promise<CareerRole[]> {
  await requireAdmin();

  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("career_roles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingCareersSchema(error)) {
      return [];
    }

    throw new Error(error.message);
  }

  return ((data ?? []) as CareerRoleRow[]).map(mapCareerRole);
}

export async function getAdminCareerRoleById(id: string): Promise<CareerRole | null> {
  await requireAdmin();

  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("career_roles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    if (isMissingCareersSchema(error)) {
      return null;
    }

    throw new Error(error.message);
  }

  return data ? mapCareerRole(data as CareerRoleRow) : null;
}

export async function createCareerRole(input: CareerRoleFormInput) {
  await requireEditor();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("career_roles").insert(careerRolePayload(input));

  if (error) {
    if (isMissingCareersSchema(error)) {
      return [];
    }

    throw new Error(error.message);
  }
}

export async function updateCareerRole(id: string, input: CareerRoleFormInput) {
  await requireEditor();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("career_roles")
    .update(careerRolePayload(input))
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteCareerRole(id: string) {
  await requireEditor();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("career_roles").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getAdminCareerApplications(): Promise<CareerApplication[]> {
  await requireAdmin();

  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("career_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const applications = ((data ?? []) as CareerApplicationRow[]).map(mapCareerApplication);

  return Promise.all(
    applications.map(async (application) => {
      if (/^https?:\/\//.test(application.resumeUrl)) {
        return application;
      }

      const { data: signedResume } = await supabase.storage
        .from("career-resumes")
        .createSignedUrl(application.resumeUrl, 60 * 15);

      return {
        ...application,
        resumeUrl: signedResume?.signedUrl ?? "#",
      };
    }),
  );
}

export async function submitCareerApplication(input: {
  roleId?: string;
  roleTitle: string;
  candidateName: string;
  email: string;
  phone: string;
  city: string;
  experience: string;
  expectedSalary?: string;
  resumeUrl: string;
  portfolioUrl?: string;
  message: string;
}) {
  if (!hasSupabaseEnv()) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("career_applications").insert({
    role_id: input.roleId || null,
    role_title: input.roleTitle,
    candidate_name: input.candidateName,
    email: input.email,
    phone: input.phone,
    city: input.city,
    experience: input.experience,
    expected_salary: input.expectedSalary || null,
    resume_url: input.resumeUrl,
    portfolio_url: input.portfolioUrl || null,
    message: input.message,
    status: "New",
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteCareerApplication(id: string) {
  await requireEditor();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("career_applications")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function requireCareerRole(id: string) {
  const role = await getAdminCareerRoleById(id);

  if (!role) {
    redirect("/admin/careers");
  }

  return role;
}
