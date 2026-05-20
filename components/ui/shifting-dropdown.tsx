"use client";

import {
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export type ShiftingDropdownTab = {
  id: string;
  title: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
};

type ShiftingDropDownProps = {
  tabs: ShiftingDropdownTab[];
  className?: string;
};

export function ShiftingDropDown({ tabs, className }: ShiftingDropDownProps) {
  return (
    <div className={cn("relative z-20 flex w-full justify-start", className)}>
      <Tabs tabs={tabs} />
    </div>
  );
}

function Tabs({ tabs }: { tabs: ShiftingDropdownTab[] }) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [dir, setDir] = useState<null | "l" | "r">(null);
  const [nubLeft, setNubLeft] = useState(0);
  const [overlayLeft, setOverlayLeft] = useState(0);
  const [overlayWidth, setOverlayWidth] = useState(432);

  const handleSetSelected = (
    value: string | null,
    trigger?: HTMLElement | null,
  ) => {
    if (selected && value) {
      const currentIndex = tabs.findIndex((tab) => tab.id === selected);
      const nextIndex = tabs.findIndex((tab) => tab.id === value);
      setDir(currentIndex > nextIndex ? "r" : "l");
    } else if (value === null) {
      setDir(null);
    }

    if (value && trigger && tabsRef.current) {
      const tabRect = trigger.getBoundingClientRect();
      const tabsRect = tabsRef.current.getBoundingClientRect();
      const tabCenter = tabRect.left + tabRect.width / 2 - tabsRect.left;
      const nextOverlayWidth = Math.min(432, tabsRect.width, window.innerWidth - 40);
      const maxOverlayLeft = Math.max(0, tabsRect.width - nextOverlayWidth);
      const nextOverlayLeft = Math.min(
        Math.max(0, tabCenter - nextOverlayWidth / 2),
        maxOverlayLeft,
      );

      setOverlayLeft(nextOverlayLeft);
      setOverlayWidth(nextOverlayWidth);
      setNubLeft(tabCenter - nextOverlayLeft);
    }

    setSelected(value);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      ref={tabsRef}
      className="relative grid h-fit w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          selected={selected}
          handleSetSelected={handleSetSelected}
          tab={tab.id}
          activeValue={tab.value}
        >
          {tab.title}
        </Tab>
      ))}

      <AnimatePresence>
        {selected ? (
          <Content
            dir={dir}
            nubLeft={nubLeft}
            overlayLeft={overlayLeft}
            overlayWidth={overlayWidth}
            selected={selected}
            tabs={tabs}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Tab({
  children,
  tab,
  handleSetSelected,
  selected,
  activeValue,
}: {
  children: ReactNode;
  tab: string;
  handleSetSelected: (value: string | null, trigger?: HTMLElement | null) => void;
  selected: string | null;
  activeValue: string;
}) {
  const isSelected = selected === tab;
  const hasFilter = activeValue !== "Any";
  const selectFromMouseEvent = (event: MouseEvent<HTMLButtonElement>) => {
    handleSetSelected(tab, event.currentTarget);
  };
  const selectFromFocusEvent = (event: FocusEvent<HTMLButtonElement>) => {
    handleSetSelected(tab, event.currentTarget);
  };

  return (
    <button
      id={`shift-tab-${tab}`}
      type="button"
      onFocus={selectFromFocusEvent}
      onMouseEnter={selectFromMouseEvent}
      onClick={(event) =>
        handleSetSelected(isSelected ? null : tab, event.currentTarget)
      }
      className={cn(
        "group flex min-h-14 w-full items-center justify-between gap-4 border px-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-navy/25 sm:min-h-16 sm:px-5",
        isSelected || hasFilter
          ? "border-primary-navy bg-primary-navy text-white shadow-[0_12px_30px_rgba(4,43,76,0.14)]"
          : "border-border-gray bg-soft-white text-charcoal-text hover:border-silver-shadow hover:bg-white",
      )}
    >
      <span className="flex min-w-0 flex-col">
        <span
          className={cn(
            "text-[0.68rem] font-semibold uppercase tracking-[0.22em]",
            isSelected || hasFilter ? "text-white/70" : "text-slate-gray",
          )}
        >
          {children}
        </span>
        <span
          className={cn(
            "mt-1 max-w-36 truncate text-sm font-semibold leading-none",
            isSelected || hasFilter ? "text-white" : "text-primary-navy",
          )}
        >
          {hasFilter ? activeValue : "Any"}
        </span>
      </span>
      <ChevronDown
        size={15}
        className={cn(
          "shrink-0 transition-transform duration-200",
          isSelected || hasFilter ? "text-white" : "text-primary-navy",
          isSelected && "rotate-180",
        )}
      />
    </button>
  );
}

function Content({
  selected,
  dir,
  tabs,
  nubLeft,
  overlayLeft,
  overlayWidth,
}: {
  selected: string | null;
  dir: null | "l" | "r";
  tabs: ShiftingDropdownTab[];
  nubLeft: number;
  overlayLeft: number;
  overlayWidth: number;
}) {
  return (
    <motion.div
      id="overlay-content"
      style={{ left: overlayLeft, width: overlayWidth }}
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="absolute top-[calc(100%_+_18px)] border border-border-gray bg-white p-2 text-charcoal-text shadow-[0_24px_70px_rgba(4,43,76,0.16)]"
    >
      <Bridge />
      <Nub left={nubLeft} selected={selected} />

      {tabs.map((tab) => (
        <div className="overflow-hidden" key={tab.id}>
          {selected === tab.id ? (
            <motion.div
              initial={{
                opacity: 0,
                x: dir === "l" ? 80 : dir === "r" ? -80 : 0,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <FilterOptions tab={tab} />
            </motion.div>
          ) : null}
        </div>
      ))}
    </motion.div>
  );
}

function Bridge() {
  return <div className="absolute -top-[18px] left-0 right-0 h-[18px]" />;
}

function Nub({ left, selected }: { left: number; selected: string | null }) {
  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
      }}
      animate={{ left, opacity: selected ? 1 : 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-border-gray bg-white shadow-sm"
    />
  );
}

function FilterOptions({ tab }: { tab: ShiftingDropdownTab }) {
  return (
    <div>
      <div className="border-b border-border-gray px-4 py-3">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary-navy">
          Filter by {tab.title}
        </p>
      </div>
      <div className="grid">
        {["Any", ...tab.options].map((option) => {
          const isActive = tab.value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => tab.onSelect(option)}
              className={cn(
                "flex min-h-12 items-center justify-between border-b border-border-gray/70 px-4 py-3 text-left text-sm transition last:border-b-0",
                isActive
                  ? "bg-cool-mist font-semibold text-primary-navy"
                  : "text-slate-gray hover:bg-soft-white hover:text-charcoal-text",
              )}
            >
              <span>{option}</span>
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-primary-navy"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
