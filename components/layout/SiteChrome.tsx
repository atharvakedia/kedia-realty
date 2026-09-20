"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { adminHostname } from "@/lib/admin-domain";

type SiteChromeProps = {
  children: React.ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdminHost =
    typeof window !== "undefined" &&
    window.location.hostname.toLowerCase() === adminHostname;
  const isAdminRoute = isAdminHost || pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className={isAdminRoute || pathname === "/" ? "flex-1" : "flex-1 pt-28"}>
        {children}
      </main>
      <Footer />
    </>
  );
}
