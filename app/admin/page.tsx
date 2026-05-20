import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/projects";

export const dynamic = "force-dynamic";

const dashboardCards = [
  {
    title: "Projects",
    description: "Manage project content, publishing, layouts and more",
    href: "/admin/projects",
  },
];

export default async function AdminPage() {
  const profile = await requireAdmin();

  return (
    <AdminShell profile={profile} title="Dashboard">
      <div className="grid gap-5 md:grid-cols-2">
        {dashboardCards.map((card) => {
          return (
            <Link key={card.title} href={card.href}>
              <div className="h-full border border-border-gray bg-white p-6 transition hover:border-primary-navy">
                <p className="font-display text-3xl text-charcoal-text">{card.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-gray">
                  {card.description}
                </p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
                  Open
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </AdminShell>
  );
}
