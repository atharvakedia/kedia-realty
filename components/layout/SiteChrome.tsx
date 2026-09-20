"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

type SiteChromeProps = {
  children: React.ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();

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
