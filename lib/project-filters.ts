import type { Project } from "@/lib/types";

export const anyProjectFilterValue = "Any";

export type ProjectFilters = {
  region: string;
  type: string;
  status: string;
};

export const defaultProjectFilters: ProjectFilters = {
  region: anyProjectFilterValue,
  type: anyProjectFilterValue,
  status: anyProjectFilterValue,
};

export function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );
}

export function hasActiveProjectFilters(filters: ProjectFilters) {
  return Object.values(filters).some((value) => value !== anyProjectFilterValue);
}

export function filterProjects(projects: Project[], filters: ProjectFilters) {
  return projects.filter((project) => {
    const regionMatch =
      filters.region === anyProjectFilterValue || project.region === filters.region;
    const typeMatch =
      filters.type === anyProjectFilterValue || project.type === filters.type;
    const statusMatch =
      filters.status === anyProjectFilterValue || project.status === filters.status;

    return regionMatch && typeMatch && statusMatch;
  });
}

export function getProjectFilterOptions(projects: Project[]) {
  return {
    regions: uniqueSorted(projects.map((project) => project.region)),
    types: uniqueSorted(projects.map((project) => project.type)),
    statuses: uniqueSorted(projects.map((project) => project.status)),
  };
}
