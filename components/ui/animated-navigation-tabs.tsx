import Link from "next/link";

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
  return (
    <nav className={cn("relative w-full overflow-x-auto", className)} aria-label="Lead status">
      <ul className="flex min-w-max items-center gap-1 border-b border-border-gray">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  "relative block py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary-navy after:transition-transform hover:bg-primary-navy/10 hover:text-primary-navy hover:after:scale-x-100",
                  isActive ? "text-primary-navy" : "text-slate-gray",
                )}
              >
                <span className="relative z-10 inline-flex min-w-44 items-center justify-center gap-3 px-10 py-2">
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
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-navy"
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
