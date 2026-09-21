"use client";

import { useMemo, useState } from "react";

import { ProjectTable } from "@/components/admin/ProjectTable";
import { ProjectsPagination } from "@/components/projects/ProjectsPagination";
import {
  anyProjectFilterValue,
  defaultProjectFilters,
  filterProjects,
  getProjectFilterOptions,
  hasActiveProjectFilters,
  type ProjectFilters,
} from "@/lib/project-filters";
import type { AdminProjectSummary } from "@/lib/types";
import { adminButton } from "@/lib/admin-ui";

const projectsPerPage = 10;

export function AdminProjectsClient({
  projects,
}: {
  projects: AdminProjectSummary[];
}) {
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

  const totalPages = Math.max(
    1,
    Math.ceil(matchingProjects.length / projectsPerPage),
  );
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
    <div className="grid gap-8">
      <div className="rounded-lg border border-border-gray bg-white p-4 shadow-[0_18px_50px_rgba(4,43,76,0.06)] sm:p-5 md:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 border-b border-border-gray pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-navy">
                Refine projects
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-gray sm:text-base">
                Narrow admin projects by region, format, and development status.
              </p>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              className={adminButton(
                "secondary",
                "compact",
                "w-fit disabled:cursor-not-allowed disabled:opacity-45 sm:min-h-11 sm:px-5",
              )}
            >
              Reset filters
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filterTabs.map((filter) => (
              <label key={filter.id} className="grid gap-2">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary-navy">
                  {filter.title}
                </span>
                <select
                  value={filter.value}
                  onChange={(event) => filter.onSelect(event.target.value)}
                  className="min-h-12 w-full border border-border-gray bg-soft-white px-4 text-sm font-semibold text-primary-navy outline-none transition-colors hover:border-silver-shadow focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/15"
                >
                  {[anyProjectFilterValue, ...filter.options].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>
      </div>

      {matchingProjects.length > 0 ? (
        <>
          <ProjectTable projects={paginatedProjects} />

          <ProjectsPagination
            ariaLabel="Admin projects pagination"
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="rounded-lg border border-border-gray bg-white p-10 text-center">
          <p className="font-display text-3xl text-charcoal-text">
            No projects match these filters.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-gray">
            Try widening the region, type, or status selection.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className={adminButton("primary", "large", "mt-8")}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
