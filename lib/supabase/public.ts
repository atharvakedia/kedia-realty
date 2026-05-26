import { createClient } from "@supabase/supabase-js";

import { getSupabaseConfig } from "@/lib/supabase/shared";

export function createPublicSupabaseClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
