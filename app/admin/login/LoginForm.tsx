"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import {
  createSupabaseBrowserClient,
  hasSupabaseEnv,
} from "@/lib/supabase/client";

type LoginFormProps = {
  setupMissing?: boolean;
  unauthorized?: boolean;
};

export function LoginForm({ setupMissing, unauthorized }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const isConfigured = hasSupabaseEnv();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!isConfigured) {
      setError("Supabase environment variables are not configured.");
      return;
    }

    setIsPending(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push("/admin");
      router.refresh();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-5">
      {setupMissing ? (
        <div className="border border-border-gray bg-cool-mist p-4 text-sm leading-7 text-primary-navy">
          Supabase is not configured yet. Add the required environment variables
          before using protected admin routes.
        </div>
      ) : null}
      {unauthorized ? (
        <div className="border border-border-gray bg-cool-mist p-4 text-sm leading-7 text-primary-navy">
          Your account needs an admin profile before it can access the CMS.
        </div>
      ) : null}
      {error ? (
        <div className="border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-700">
          {error}
        </div>
      ) : null}
      <label className="grid gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
          Email
        </span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="min-h-12 border border-border-gray bg-white px-4 text-sm text-charcoal-text outline-none transition focus:border-primary-navy"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
          Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="min-h-12 border border-border-gray bg-white px-4 text-sm text-charcoal-text outline-none transition focus:border-primary-navy"
        />
      </label>
      <button
        type="submit"
        disabled={!isConfigured || isPending}
        className="min-h-12 bg-primary-navy px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-steel-blue disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
