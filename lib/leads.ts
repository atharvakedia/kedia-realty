import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { requireAdmin, requireEditor } from "@/lib/projects";
import {
  leadStatuses,
  type Lead,
  type LeadRow,
  type LeadStatus,
} from "@/lib/types";

function asLeadStatus(value: string): LeadStatus {
  return leadStatuses.includes(value as LeadStatus)
    ? (value as LeadStatus)
    : "new";
}

function mapLead(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email ?? undefined,
    phone: row.phone,
    message: row.message,
    status: asLeadStatus(row.status),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function isMissingLeadsSchema(error: { code?: string; message?: string } | null) {
  return (
    error?.code === "PGRST200" ||
    error?.code === "PGRST204" ||
    error?.code === "PGRST205" ||
    /contact_leads/i.test(error?.message ?? "")
  );
}

export async function createContactLead(input: {
  name: string;
  email?: string;
  phone: string;
  message: string;
}) {
  if (!hasSupabaseEnv()) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("contact_leads").insert({
    name: input.name,
    email: input.email || null,
    phone: input.phone,
    message: input.message,
    status: "new",
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getAdminLeads(status?: LeadStatus): Promise<Lead[]> {
  await requireAdmin();

  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("contact_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    if (isMissingLeadsSchema(error)) {
      return [];
    }

    throw new Error(error.message);
  }

  return ((data ?? []) as LeadRow[]).map(mapLead);
}

export async function getNewLeadsCount() {
  await requireAdmin();

  if (!hasSupabaseEnv()) {
    return 0;
  }

  const supabase = await createSupabaseServerClient();
  const { count, error } = await supabase
    .from("contact_leads")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");

  if (error) {
    if (isMissingLeadsSchema(error)) {
      return 0;
    }

    throw new Error(error.message);
  }

  return count ?? 0;
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await requireEditor();

  if (!hasSupabaseEnv()) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("contact_leads")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
