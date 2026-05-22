import Link from "next/link";

import { AdminBackLink } from "@/components/admin/AdminBackLink";
import { AdminShell } from "@/components/admin/AdminShell";
import { getNewLeadsCount } from "@/lib/leads";
import { requireAdmin } from "@/lib/projects";

export const dynamic = "force-dynamic";

const dashboardCards = [
  {
    title: "Projects",
    description: "Manage project content, publishing, layouts and more",
    href: "/admin/projects",
  },
  {
    title: "Careers",
    description: "Manage open roles and review submitted applications",
    href: "/admin/careers",
  },
  {
    title: "Leads",
    description: "Review new inquiries and move active conversations forward",
    href: "/admin/leads",
  },
];

export default async function AdminPage() {
  const profile = await requireAdmin();
  const newLeadsCount = await getNewLeadsCount();

  return (
    <AdminShell profile={profile} title="Dashboard">
      <div className="mb-6">
        <AdminBackLink href="/" label="Go to website" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {dashboardCards.map((card) => {
          return (
            <Link key={card.title} href={card.href}>
              <div className="h-full border border-border-gray bg-white p-6 transition hover:border-primary-navy">
                <p className="font-display text-3xl text-charcoal-text">{card.title}</p>
                {card.title === "Leads" && newLeadsCount > 0 ? (
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
                    <span className="size-2 rounded-full bg-primary-navy" />
                    {newLeadsCount} new
                  </span>
                ) : null}
                <p className="mt-3 text-sm leading-7 text-slate-gray">
                  {card.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </AdminShell>
  );
}
