import { updateLeadStatusAction } from "@/app/admin/leads/actions";
import { AnimatedNavigationTabs } from "@/components/ui/animated-navigation-tabs";
import type { Lead, LeadStatus } from "@/lib/types";

const tabs: Array<{ label: string; status: LeadStatus }> = [
  { label: "New", status: "new" },
  { label: "Active", status: "active" },
  { label: "Archived", status: "archived" },
];

function labelForStatus(status: LeadStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function LeadsBoard({
  leads,
  activeStatus,
  counts,
}: {
  leads: Lead[];
  activeStatus: LeadStatus;
  counts: Record<LeadStatus, number>;
}) {
  return (
    <div className="grid gap-6">
      <AnimatedNavigationTabs
        activeId={activeStatus}
        items={tabs.map((tab) => ({
          id: tab.status,
          title: tab.label,
          href: `/admin/leads?status=${tab.status}`,
          count: counts[tab.status],
        }))}
      />

      {leads.length === 0 ? (
        <div className="border border-border-gray bg-white p-8 text-sm leading-7 text-slate-gray">
          No {activeStatus} leads yet.
        </div>
      ) : (
        <div className="grid gap-5">
          {leads.map((lead) => (
            <article key={lead.id} className="border border-border-gray bg-white p-6">
              <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-2xl text-charcoal-text">
                      {lead.name}
                    </h2>
                    <span className="border border-border-gray px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary-navy">
                      {labelForStatus(lead.status)}
                    </span>
                  </div>
                  <dl className="mt-5 grid gap-3 text-sm text-slate-gray md:grid-cols-3">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
                        Phone
                      </dt>
                      <dd className="mt-1">{lead.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
                        Email
                      </dt>
                      <dd className="mt-1">{lead.email || "Not provided"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
                        Received
                      </dt>
                      <dd className="mt-1">
                        {new Intl.DateTimeFormat("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(lead.createdAt))}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-5 text-sm leading-7 text-charcoal-text">
                    {lead.message}
                  </p>
                </div>

                <div className="grid content-start gap-3 lg:min-w-48">
                  {tabs
                    .filter((tab) => tab.status !== lead.status)
                    .map((tab) => (
                      <form key={tab.status} action={updateLeadStatusAction}>
                        <input type="hidden" name="id" value={lead.id} />
                        <input type="hidden" name="status" value={tab.status} />
                        <input type="hidden" name="currentStatus" value={activeStatus} />
                        <button
                          type="submit"
                          className="inline-flex min-h-11 w-full items-center justify-center border border-border-gray px-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-gray transition hover:border-primary-navy hover:text-primary-navy"
                        >
                          Move to {tab.label}
                        </button>
                      </form>
                    ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
