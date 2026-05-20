import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProjectAction } from "@/app/admin/projects/actions";
import { requireAdmin } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const profile = await requireAdmin();

  return (
    <AdminShell profile={profile} title="New project" eyebrow="Project management">
      <div className="mb-6">
        <Link
          href="/admin/projects"
          className="inline-flex min-h-11 items-center justify-center border border-border-gray bg-white px-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy transition hover:border-primary-navy hover:bg-cool-mist"
        >
          Back to projects
        </Link>
      </div>
      <ProjectForm action={createProjectAction} submitLabel="Create project" />
    </AdminShell>
  );
}
