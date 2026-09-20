"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

type SiteChromeProps = {
  children: React.ReactNode;
  isAdminHost: boolean;
};

export function SiteChrome({ children, isAdminHost }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = isAdminHost || pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className={pathname === "/" ? "flex-1" : "flex-1 pt-28"}>
        {children}
      </main>
      <Footer />
    </>
  );
}
