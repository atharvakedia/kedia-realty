export const projectTypes = [
  "Commercial",
  "Villas",
  "Farmhouses",
  "Apartments",
  "Residential Township",
  "Industrial Township",
] as const;

export type ProjectType = (typeof projectTypes)[number];

export const projectStatuses = [
  "Underway",
  "Ready",
  "Completed",
] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

export const adminRoles = ["owner", "editor", "viewer"] as const;

export type AdminRole = (typeof adminRoles)[number];

export type ProjectLayout = {
  id?: string;
  title: string;
  type: string;
  area: string;
  image: string;
  description: string;
  displayOrder?: number;
};

export type Project = {
  id?: string;
  title: string;
  slug: string;
  type: ProjectType;
  status: ProjectStatus;
  region: string;
  location: string;
  totalArea: string;
  totalUnits: string;
  reraNumber: string;
  launchDate: string;
  priceLabel: string;
  areaLabel: string;
  description: string;
  highlights?: string[];
  amenities: string[];
  image: string;
  gallery?: string[];
  mapEmbedUrl?: string;
  layouts?: ProjectLayout[];
  isPublished?: boolean;
  isFeatured?: boolean;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  type: string;
  status: string;
  city: string;
  region: string;
  total_area_acres: number;
  total_units: number;
  rera_number: string;
  launch_date: string;
  price_label: string;
  area_label: string;
  description: string;
  amenities: string[];
  map_embed_url: string | null;
  is_published: boolean;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type ProjectLayoutRow = {
  id: string;
  project_id: string;
  title: string | null;
  type: string | null;
  area: string | null;
  image_url: string;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type ProjectImageRow = {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string | null;
  is_cover: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type ProjectWithLayoutRows = ProjectRow & {
  project_layouts?: ProjectLayoutRow[];
  project_images?: ProjectImageRow[];
};

export type ProjectFormInput = Omit<
  Project,
  "id" | "createdAt" | "updatedAt" | "image" | "mapEmbedUrl"
> & {
  mainImage: string;
  mapEmbedUrl?: string;
};

export type AdminProfile = {
  id: string;
  email: string;
  role: AdminRole;
  createdAt: string;
  updatedAt: string;
};
