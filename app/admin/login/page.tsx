import type { Metadata } from "next";

import { LoginForm } from "@/app/admin/login/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
};

type LoginPageProps = {
  searchParams: Promise<{
    setup?: string;
    unauthorized?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <section className="flex min-h-dvh items-center justify-center bg-soft-white px-5 py-8 md:px-8 md:py-12">
      <div className="w-full max-w-xl border border-border-gray bg-white p-6 shadow-[0_18px_50px_rgba(4,43,76,0.06)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-navy">
          Kedia Group CMS
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-charcoal-text md:text-5xl">
          Admin login
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-gray">
          Sign in with your authorized Kedia Group admin account.
        </p>
        <LoginForm
          setupMissing={params.setup === "1"}
          unauthorized={params.unauthorized === "1"}
        />
      </div>
    </section>
  );
}
