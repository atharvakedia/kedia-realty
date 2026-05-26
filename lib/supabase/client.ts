"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseConfig, hasSupabaseEnv } from "@/lib/supabase/shared";

export { hasSupabaseEnv };

export function createSupabaseBrowserClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
