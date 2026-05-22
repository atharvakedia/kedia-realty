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

export const careerDepartments = [
  "Sales",
  "Marketing",
  "Projects",
  "Architecture",
  "Finance",
  "Legal",
  "Operations",
  "Customer Relations",
] as const;

export type CareerDepartment = (typeof careerDepartments)[number];

export const employmentTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const;

export type EmploymentType = (typeof employmentTypes)[number];

export const applicationStatuses = [
  "New",
  "Reviewing",
  "Shortlisted",
  "Rejected",
  "Hired",
] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number];

export type CareerRole = {
  id?: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  isOpen: boolean;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type CareerRoleRow = {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  is_open: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type CareerRoleFormInput = Omit<
  CareerRole,
  "id" | "createdAt" | "updatedAt"
>;

export type CareerApplication = {
  id: string;
  roleId: string | null;
  roleTitle: string;
  candidateName: string;
  email: string;
  phone: string;
  city: string;
  experience: string;
  expectedSalary: string;
  resumeUrl: string;
  portfolioUrl?: string;
  message: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
};

export type CareerApplicationRow = {
  id: string;
  role_id: string | null;
  role_title: string;
  candidate_name: string;
  email: string;
  phone: string;
  city: string;
  experience: string;
  expected_salary: string | null;
  resume_url: string;
  portfolio_url: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export const leadStatuses = ["new", "active", "archived"] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export type Lead = {
  id: string;
  name: string;
  email?: string;
  phone: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
};

export type LeadRow = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
};
