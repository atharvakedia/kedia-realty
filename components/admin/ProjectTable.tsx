import Link from "next/link";

import type { Project } from "@/lib/types";

type ProjectTableProps = {
  projects: Project[];
};

export function ProjectTable({ projects }: ProjectTableProps) {
  if (projects.length === 0) {
    return (
      <div className="border border-border-gray bg-white p-10 text-center">
        <p className="font-display text-3xl text-charcoal-text">
          No projects yet.
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-gray">
          Create the first project to begin managing public website content.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-border-gray bg-white">
      <table className="min-w-[62rem] w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border-gray bg-cool-mist">
            {[
              "Project",
              "Type",
              "Status",
              "Region",
              "Published",
              "Featured",
              "Updated",
              "",
            ].map((heading) => (
              <th
                key={heading}
                className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b border-border-gray last:border-b-0">
              <td className="px-4 py-4">
                <p className="font-semibold text-charcoal-text">{project.title}</p>
                <p className="mt-1 text-xs text-slate-gray">/{project.slug}</p>
              </td>
              <td className="px-4 py-4 text-sm text-slate-gray">{project.type}</td>
              <td className="px-4 py-4 text-sm text-slate-gray">{project.status}</td>
              <td className="px-4 py-4 text-sm text-slate-gray">{project.region}</td>
              <td className="px-4 py-4 text-sm text-slate-gray">
                {project.isPublished ? "Yes" : "No"}
              </td>
              <td className="px-4 py-4 text-sm text-slate-gray">
                {project.isFeatured ? "Yes" : "No"}
              </td>
              <td className="px-4 py-4 text-sm text-slate-gray">
                {project.updatedAt
                  ? new Intl.DateTimeFormat("en", {
                      dateStyle: "medium",
                    }).format(new Date(project.updatedAt))
                  : "—"}
              </td>
              <td className="px-4 py-4 text-right">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="inline-flex min-h-10 items-center justify-center border border-primary-navy bg-primary-navy px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-sm shadow-deep-navy/10 transition hover:bg-steel-blue"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
