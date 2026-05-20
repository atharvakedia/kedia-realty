import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectTable } from "@/components/admin/ProjectTable";
import { getAdminProjects, requireAdmin } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const profile = await requireAdmin();
  const projects = await getAdminProjects();

  return (
    <AdminShell profile={profile} title="Projects">
      <div className="mb-6 flex justify-end">
        <Link
          href="/admin/projects/new"
          className="inline-flex min-h-11 items-center justify-center bg-primary-navy px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-steel-blue"
        >
          New Project
        </Link>
      </div>
      <ProjectTable projects={projects} />
    </AdminShell>
  );
}
