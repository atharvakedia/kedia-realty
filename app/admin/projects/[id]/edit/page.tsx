import { notFound } from "next/navigation";
import Link from "next/link";

import { updateProjectAction } from "@/app/admin/projects/actions";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getAdminProjectById, requireAdmin } from "@/lib/projects";

export const dynamic = "force-dynamic";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const profile = await requireAdmin();
  const { id } = await params;
  const project = await getAdminProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <AdminShell profile={profile} title={`Edit ${project.title}`} eyebrow="Project management">
      <div className="mb-6">
        <Link
          href="/admin/projects"
          className="inline-flex min-h-11 items-center justify-center border border-border-gray bg-white px-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy transition hover:border-primary-navy hover:bg-cool-mist"
        >
          Back to projects
        </Link>
      </div>
      <ProjectForm
        action={updateProjectAction.bind(null, id)}
        project={project}
        submitLabel="Save project"
      />
    </AdminShell>
  );
}
