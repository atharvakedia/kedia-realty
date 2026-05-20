"use client";

import { useMemo, useState } from "react";

import { ShiftingDropDown } from "@/components/ui/shifting-dropdown";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Project, ProjectStatus, ProjectType } from "@/lib/types";

type ProjectsListingClientProps = {
  projects: Project[];
};

type Filters = {
  region: string;
  type: string;
  status: string;
};

const anyValue = "Any";
const projectsPerPage = 6;

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export function ProjectsListingClient({ projects }: ProjectsListingClientProps) {
  const [filters, setFilters] = useState<Filters>({
    region: anyValue,
    type: anyValue,
    status: anyValue,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const regions = useMemo(
    () => uniqueSorted(projects.map((project) => project.region)),
    [projects],
  );
  const types = useMemo(
    () => uniqueSorted(projects.map((project) => project.type)),
    [projects],
  );
  const statuses = useMemo(
    () => uniqueSorted(projects.map((project) => project.status)),
    [projects],
  );

  const matchingProjects = useMemo(() => {
    return projects.filter((project) => {
      const regionMatch =
        filters.region === anyValue || project.region === filters.region;
      const typeMatch =
        filters.type === anyValue || project.type === (filters.type as ProjectType);
      const statusMatch =
        filters.status === anyValue ||
        project.status === (filters.status as ProjectStatus);

      return regionMatch && typeMatch && statusMatch;
    });
  }, [filters, projects]);

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== anyValue,
  );

  const updateFilter = (filter: keyof Filters, value: string) => {
    setFilters((current) => ({ ...current, [filter]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ region: anyValue, type: anyValue, status: anyValue });
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

          {totalPages > 1 ? (
            <nav
              aria-label="Projects pagination"
              className="mt-10 flex flex-col gap-4 border-t border-border-gray pt-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-gray">
                Page {safeCurrentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={safeCurrentPage === 1}
                  className="min-h-11 border border-border-gray px-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy transition hover:border-primary-navy hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const isActive = pageNumber === safeCurrentPage;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setCurrentPage(pageNumber)}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "flex size-11 items-center justify-center border text-sm font-semibold transition",
                        isActive
                          ? "border-primary-navy bg-primary-navy text-white"
                          : "border-border-gray bg-white text-primary-navy hover:border-primary-navy",
                      ].join(" ")}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  disabled={safeCurrentPage === totalPages}
                  className="min-h-11 border border-border-gray px-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy transition hover:border-primary-navy hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </nav>
          ) : null}
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
