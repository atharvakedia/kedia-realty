"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";

export type AnimatedNavigationTabItem = {
  id: string;
  title: string;
  href: string;
  count?: number;
};

export function AnimatedNavigationTabs({
  items,
  activeId,
  className,
}: {
  items: AnimatedNavigationTabItem[];
  activeId: string;
  className?: string;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <nav className={cn("relative w-full overflow-x-auto", className)} aria-label="Lead status">
      <ul className="flex min-w-max items-center gap-1 border-b border-border-gray">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const isHovered = hoveredId === item.id;

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "relative block py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:text-primary-navy",
                  isActive ? "text-primary-navy" : "text-slate-gray",
                )}
              >
                <span className="relative z-10 inline-flex items-center gap-3 px-5 py-2">
                  {item.title}
                  {typeof item.count === "number" ? (
                    <span
                      className={cn(
                        "inline-flex min-w-7 justify-center rounded-full px-2 py-1 text-[10px] tracking-normal",
                        isActive
                          ? "bg-primary-navy text-white"
                          : "bg-cool-mist text-slate-gray",
                      )}
                    >
                      {item.count}
                    </span>
                  ) : null}
                </span>

                {isHovered ? (
                  <motion.span
                    layoutId="lead-tab-hover-bg"
                    className="absolute inset-x-0 bottom-1 top-1 bg-primary-navy/10"
                    style={{ borderRadius: 6 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                ) : null}

                {isActive ? (
                  <motion.span
                    layoutId="lead-tab-active-line"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-navy"
                    transition={{ duration: 0.24, ease: "easeOut" }}
                  />
                ) : null}

                {isHovered ? (
                  <motion.span
                    layoutId="lead-tab-hover-line"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-navy"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
