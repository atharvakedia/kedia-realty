"use client";

import { useMemo, useState } from "react";

import { ProjectsPagination } from "@/components/projects/ProjectsPagination";
import { ShiftingDropDown } from "@/components/ui/shifting-dropdown";
import { ProjectCard } from "@/components/ui/ProjectCard";
import {
  defaultProjectFilters,
  filterProjects,
  getProjectFilterOptions,
  hasActiveProjectFilters,
  type ProjectFilters,
} from "@/lib/project-filters";
import type { Project } from "@/lib/types";

type ProjectsListingClientProps = {
  projects: Project[];
};

const projectsPerPage = 6;

export function ProjectsListingClient({ projects }: ProjectsListingClientProps) {
  const [filters, setFilters] = useState<ProjectFilters>(defaultProjectFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const { regions, types, statuses } = useMemo(
    () => getProjectFilterOptions(projects),
    [projects],
  );
  const matchingProjects = useMemo(
    () => filterProjects(projects, filters),
    [filters, projects],
  );
  const hasActiveFilters = hasActiveProjectFilters(filters);

  const updateFilter = (filter: keyof ProjectFilters, value: string) => {
    setFilters((current) => ({ ...current, [filter]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters(defaultProjectFilters);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(matchingProjects.length / projectsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProjects = matchingProjects.slice(
    (safeCurrentPage - 1) * projectsPerPage,
    safeCurrentPage * projectsPerPage,
  );

  const filterTabs = [
    {
      id: "region",
      title: "Region",
      value: filters.region,
      options: regions,
      onSelect: (region: string) => updateFilter("region", region),
    },
    {
      id: "type",
      title: "Type",
      value: filters.type,
      options: types,
      onSelect: (type: string) => updateFilter("type", type),
    },
    {
      id: "status",
      title: "Status",
      value: filters.status,
      options: statuses,
      onSelect: (status: string) => updateFilter("status", status),
    },
  ];

  return (
    <div className="mt-12">
      <div className="border border-border-gray bg-white p-4 shadow-[0_18px_50px_rgba(4,43,76,0.06)] sm:p-5 md:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 border-b border-border-gray pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-navy">
                Refine projects
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-gray sm:text-base">
                Narrow projects by region, format, and development status.
              </p>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              className="inline-flex min-h-10 w-fit items-center justify-center border border-border-gray px-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary-navy transition hover:border-primary-navy hover:bg-cool-mist disabled:cursor-not-allowed disabled:opacity-45 sm:min-h-11 sm:px-5"
            >
              Reset filters
            </button>
          </div>
          <ShiftingDropDown tabs={filterTabs} />
        </div>
      </div>

      {matchingProjects.length > 0 ? (
        <>
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {paginatedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          <ProjectsPagination
            ariaLabel="Projects pagination"
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-10"
          />
        </>
      ) : (
        <div className="mt-10 border border-border-gray bg-white p-10 text-center">
          <p className="font-display text-3xl text-charcoal-text">
            No projects match these filters.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-gray">
            Try widening the region, type, or status selection to view more
            Kedia Group developments.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-8 min-h-11 bg-primary-navy px-6 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-steel-blue"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
