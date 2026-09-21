import Link from "next/link";

import { AdminProjectsClient } from "@/components/admin/AdminProjectsClient";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminProjects, requireAdmin } from "@/lib/projects";
import { adminButton } from "@/lib/admin-ui";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const [profile, projects] = await Promise.all([
    requireAdmin(),
    getAdminProjects(),
  ]);

  return (
    <AdminShell profile={profile} title="Projects">
      <div className="mb-6 flex justify-end">
        <Link
          href="/admin/projects/new"
          className={adminButton("primary", "large")}
        >
          New Project
        </Link>
      </div>
      <AdminProjectsClient projects={projects} />
    </AdminShell>
  );
}
