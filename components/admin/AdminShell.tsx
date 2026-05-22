import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

import { signOutAction } from "@/app/admin/actions";
import { AdminBackLink } from "@/components/admin/AdminBackLink";
import type { AdminProfile } from "@/lib/types";

type AdminShellProps = {
  children: ReactNode;
  profile: AdminProfile;
  title: string;
  eyebrow?: string;
};

export async function AdminShell({
  children,
  profile,
  title,
  eyebrow = "Kedia Group CMS",
}: AdminShellProps) {
  const showDashboardBack = title !== "Dashboard";

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-soft-white px-5 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 border border-border-gray bg-white">
          <div className="flex flex-col gap-5 border-b border-border-gray p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="block shrink-0"
                aria-label="Kedia admin home"
              >
                <Image
                  src="/kedia-logo-cropped.png"
                  alt="Kedia Group"
                  width={150}
                  height={67}
                  priority
                  className="h-14 w-auto object-contain md:h-16"
                />
              </Link>
              <div>
                <Link
                  href="/admin"
                  className="font-display text-2xl text-primary-navy"
                >
                  Kedia Admin
                </Link>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-gray">
                  {profile.role} / {profile.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="min-h-11 border border-border-gray px-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-gray transition hover:border-primary-navy hover:text-primary-navy"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-navy">
              {eyebrow}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-charcoal-text md:text-5xl">
              {title}
            </h1>
          </div>
        </header>
        {showDashboardBack ? (
          <div className="mb-6">
            <AdminBackLink href="/admin" label="Back to dashboard" />
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
