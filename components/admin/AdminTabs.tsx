"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type AdminTabItem = {
  id: string;
  title: string;
  count?: number;
  /** Rendered beside the tab bar only while this tab is active. */
  action?: ReactNode;
  panel: ReactNode;
};

type AdminTabsProps = {
  items: AdminTabItem[];
  initialTabId: string;
  label: string;
  /** When set, the active tab is mirrored into this search param. */
  queryKey?: string;
};

/**
 * Tab switcher for admin sections whose data is fetched together on the server.
 * Every panel is rendered up front and inactive ones are hidden, so switching
 * tabs is instant with no second request.
 */
export function AdminTabs({
  items,
  initialTabId,
  label,
  queryKey,
}: AdminTabsProps) {
  const fallbackId = items[0]?.id ?? "";
  const [activeId, setActiveId] = useState(
    items.some((item) => item.id === initialTabId) ? initialTabId : fallbackId,
  );
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  const selectTab = (id: string) => {
    setActiveId(id);

    if (!queryKey) {
      return;
    }

    // Keep the URL in step without a server round-trip, so a refresh or a
    // server-action redirect returns to the tab the user was on.
    const url = new URL(window.location.href);
    url.searchParams.set(queryKey, id);
    window.history.replaceState(null, "", url);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = items.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    const nextId = items[nextIndex].id;
    selectTab(nextId);
    tabRefs.current[nextId]?.focus();
  };

  if (!activeItem) {
    return null;
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full overflow-x-auto">
          <div
            role="tablist"
            aria-label={label}
            className="flex min-w-max items-center gap-1 border-b border-border-gray"
          >
            {items.map((item, index) => {
              const isActive = item.id === activeItem.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`admin-tab-${item.id}`}
                  ref={(node) => {
                    tabRefs.current[item.id] = node;
                  }}
                  aria-selected={isActive}
                  aria-controls={`admin-tabpanel-${item.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTab(item.id)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={cn(
                    "relative rounded-t-lg px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-primary-navy/10 hover:text-primary-navy sm:px-10",
                    isActive ? "text-primary-navy" : "text-slate-gray",
                  )}
                >
                  <span className="inline-flex items-center justify-center gap-3 sm:min-w-36">
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
                </button>
              );
            })}
          </div>
        </div>
        {activeItem.action ? (
          <div className="shrink-0">{activeItem.action}</div>
        ) : null}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`admin-tabpanel-${item.id}`}
          aria-labelledby={`admin-tab-${item.id}`}
          hidden={item.id !== activeItem.id}
        >
          {item.panel}
        </div>
      ))}
    </div>
  );
}
