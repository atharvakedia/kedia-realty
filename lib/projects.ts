import { redirect } from "next/navigation";

import { projects as fallbackProjects } from "@/lib/data";
import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";
import {
  adminRoles,
  projectStatuses,
  projectTypes,
  type AdminProfile,
  type Project,
  type ProjectFormInput,
  type ProjectLayout,
  type ProjectLayoutRow,
  type ProjectStatus,
  type ProjectType,
  type ProjectWithLayoutRows,
} from "@/lib/types";

const fallbackProjectImage =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80";

const fallbackLayoutImage =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80";

function normalizeImageUrl(value: string | null | undefined, fallback: string) {
  const image = String(value ?? "").trim();

  if (!image) {
    return fallback;
  }

  if (image.startsWith("/")) {
    return image;
  }

  try {
    const url = new URL(image);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch {
    return fallback;
  }

  return fallback;
}

function asProjectType(value: string): ProjectType {
  return projectTypes.includes(value as ProjectType)
    ? (value as ProjectType)
    : "Residential Township";
}

function asProjectStatus(value: string): ProjectStatus {
  const legacyStatusMap: Record<string, ProjectStatus> = {
    "Under Construction": "Underway",
    "Ready To Move In": "Ready",
  };

  if (legacyStatusMap[value]) {
    return legacyStatusMap[value];
  }

  return projectStatuses.includes(value as ProjectStatus)
    ? (value as ProjectStatus)
    : "Underway";
}

function mapLayout(row: ProjectLayoutRow): ProjectLayout {
  return {
    id: row.id,
    title: row.title ?? "",
    type: row.type ?? "",
    area: row.area ?? "",
    image: normalizeImageUrl(row.image_url, fallbackLayoutImage),
    description: row.description ?? "",
    displayOrder: row.display_order,
  };
}

function mapProject(row: ProjectWithLayoutRows): Project {
  const layouts = [...(row.project_layouts ?? [])].sort(
    (a, b) => a.display_order - b.display_order,
  );
  const images = [...(row.project_images ?? [])].sort((a, b) => {
    if (a.is_cover !== b.is_cover) {
      return a.is_cover ? -1 : 1;
    }

    return a.display_order - b.display_order;
  });
  const normalizedImages = images
    .map((image) => normalizeImageUrl(image.image_url, ""))
    .filter(Boolean);
  const coverImage = normalizedImages[0] ?? fallbackProjectImage;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    type: asProjectType(row.type),
    status: asProjectStatus(row.status),
    region: row.region,
    location: row.city,
    totalArea: String(row.total_area_acres),
    totalUnits: String(row.total_units),
    reraNumber: row.rera_number,
    launchDate: row.launch_date,
    priceLabel: row.price_label,
    areaLabel: row.area_label,
    description: row.description,
    amenities: row.amenities ?? [],
    image: coverImage,
    gallery: normalizedImages.slice(1),
    mapEmbedUrl: row.map_embed_url ?? undefined,
    layouts: layouts.map(mapLayout),
    isPublished: row.is_published,
    isFeatured: row.is_featured,
    displayOrder: row.display_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function fallbackWithCmsFields(projects: Project[]) {
  return projects.map((project, index) => ({
    ...project,
    id: project.slug,
    isPublished: true,
    isFeatured: index < 3,
    displayOrder: (index + 1) * 10,
  }));
}

const projectSelect = `
  *,
  project_images (*),
  project_layouts (*)
`;

function isExpectedSchemaMismatch(error: { code?: string } | null) {
  return error?.code === "PGRST200" || error?.code === "PGRST204";
}

export async function getPublishedProjects(): Promise<Project[]> {
  if (!hasSupabaseEnv()) {
    return fallbackWithCmsFields(fallbackProjects);
  }

  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    if (!isExpectedSchemaMismatch(error)) {
      console.error("Failed to load published projects", error);
    }
    return fallbackWithCmsFields(fallbackProjects);
  }

  return ((data ?? []) as ProjectWithLayoutRows[]).map(mapProject);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!hasSupabaseEnv()) {
    return fallbackWithCmsFields(fallbackProjects).slice(0, 3);
  }

  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("display_order", { ascending: true })
    .limit(3);

  if (error) {
    if (!isExpectedSchemaMismatch(error)) {
      console.error("Failed to load featured projects", error);
    }
    return fallbackWithCmsFields(fallbackProjects).slice(0, 3);
  }

  const featured = ((data ?? []) as ProjectWithLayoutRows[]).map(mapProject);

  if (featured.length > 0) {
    return featured;
  }

  return getPublishedProjects().then((projects) => projects.slice(0, 3));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!hasSupabaseEnv()) {
    return fallbackWithCmsFields(fallbackProjects).find((project) => project.slug === slug) ?? null;
  }

  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    if (!isExpectedSchemaMismatch(error)) {
      console.error("Failed to load project by slug", error);
    }
    return null;
  }

  return data ? mapProject(data as ProjectWithLayoutRows) : null;
}

export async function getAdminProjects(): Promise<Project[]> {
  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .order("display_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as ProjectWithLayoutRows[]).map(mapProject);
}

export async function getAdminProjectById(id: string): Promise<Project | null> {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapProject(data as ProjectWithLayoutRows) : null;
}

async function getCurrentAdminProfile(): Promise<AdminProfile | null> {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    role: adminRoles.includes(data.role) ? data.role : "viewer",
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function requireAdmin() {
  const profile = await getCurrentAdminProfile();

  if (!profile) {
    redirect("/admin/login");
  }

  return profile;
}

export async function requireEditor() {
  const profile = await requireAdmin();

  if (profile.role === "viewer") {
    throw new Error("You do not have permission to edit projects.");
  }

  return profile;
}

function projectPayload(input: ProjectFormInput) {
  return {
    title: input.title,
    slug: input.slug,
    type: input.type,
    status: input.status,
    city: input.location,
    region: input.region,
    total_area_acres: Number(input.totalArea),
    total_units: Number(input.totalUnits),
    rera_number: input.reraNumber,
    launch_date: input.launchDate,
    price_label: input.priceLabel,
    area_label: input.areaLabel,
    description: input.description,
    amenities: input.amenities,
    map_embed_url: input.mapEmbedUrl || null,
    is_published: Boolean(input.isPublished),
    is_featured: Boolean(input.isFeatured),
    display_order: input.displayOrder ?? 0,
  };
}

function layoutPayload(projectId: string, layout: ProjectLayout, index: number) {
  return {
    project_id: projectId,
    title: layout.title || null,
    type: layout.type || null,
    area: layout.area || null,
    image_url: layout.image,
    description: layout.description || null,
    display_order: layout.displayOrder ?? (index + 1) * 10,
  };
}

function imagePayloads(projectId: string, input: ProjectFormInput) {
  const imageUrls = Array.from(
    new Set([input.mainImage, ...(input.gallery ?? [])].map((image) => image.trim()).filter(Boolean)),
  );

  return imageUrls.map((imageUrl, index) => ({
    project_id: projectId,
    image_url: imageUrl,
    alt_text: `${input.title} project image ${index + 1}`,
    is_cover: index === 0,
    display_order: (index + 1) * 10,
  }));
}

export async function createProject(input: ProjectFormInput) {
  await requireEditor();
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("projects")
    .insert(projectPayload(input))
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const layouts = input.layouts ?? [];
  const images = imagePayloads(data.id, input);

  if (images.length > 0) {
    const { error: imagesError } = await supabase
      .from("project_images")
      .insert(images);

    if (imagesError) {
      throw new Error(imagesError.message);
    }
  }

  if (layouts.length > 0) {
    const { error: layoutsError } = await supabase
      .from("project_layouts")
      .insert(layouts.map((layout, index) => layoutPayload(data.id, layout, index)));

    if (layoutsError) {
      throw new Error(layoutsError.message);
    }
  }

  return data.id as string;
}

export async function updateProject(id: string, input: ProjectFormInput) {
  await requireEditor();
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("projects")
    .update(projectPayload(input))
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  const { error: deleteError } = await supabase
    .from("project_layouts")
    .delete()
    .eq("project_id", id);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  const { error: deleteImagesError } = await supabase
    .from("project_images")
    .delete()
    .eq("project_id", id);

  if (deleteImagesError) {
    throw new Error(deleteImagesError.message);
  }

  const images = imagePayloads(id, input);

  if (images.length > 0) {
    const { error: imagesError } = await supabase
      .from("project_images")
      .insert(images);

    if (imagesError) {
      throw new Error(imagesError.message);
    }
  }

  const layouts = input.layouts ?? [];

  if (layouts.length > 0) {
    const { error: layoutsError } = await supabase
      .from("project_layouts")
      .insert(layouts.map((layout, index) => layoutPayload(id, layout, index)));

    if (layoutsError) {
      throw new Error(layoutsError.message);
    }
  }
}
