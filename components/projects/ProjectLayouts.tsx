"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from "@/components/ui/carousel";
import type { ProjectLayout } from "@/lib/types";

type ProjectLayoutsProps = {
  layouts?: ProjectLayout[];
};

export function ProjectLayouts({ layouts = [] }: ProjectLayoutsProps) {
  const [selectedLayout, setSelectedLayout] = useState<ProjectLayout | null>(null);
  const [zoom, setZoom] = useState(1);

  const selectedIndex = selectedLayout
    ? layouts.findIndex((layout) =>
        selectedLayout.id
          ? layout.id === selectedLayout.id
          : layout === selectedLayout,
      )
    : -1;

  const showPrevious = useCallback(() => {
    if (selectedIndex < 0) return;
    setSelectedLayout(layouts[(selectedIndex - 1 + layouts.length) % layouts.length]);
    setZoom(1);
  }, [layouts, selectedIndex]);

  const showNext = useCallback(() => {
    if (selectedIndex < 0) return;
    setSelectedLayout(layouts[(selectedIndex + 1) % layouts.length]);
    setZoom(1);
  }, [layouts, selectedIndex]);

  const openLayout = (layout: ProjectLayout) => {
    setSelectedLayout(layout);
    setZoom(1);
  };

  useEffect(() => {
    if (!selectedLayout) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedLayout(null);
      }
      if (event.key === "ArrowLeft") {
        showPrevious();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedLayout, showNext, showPrevious]);

  if (layouts.length === 0) {
    return (
      <section className="bg-white px-5 py-20 md:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="border border-border-gray bg-soft-white p-10 text-center">
            <p className="font-display text-3xl text-charcoal-text">
              Layouts & Plans
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-gray">
              Layout plans for this project are being finalized. Contact the
              Kedia Group team for current planning information.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-5 py-20 md:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-navy">
              Layouts & Plans
            </p>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] text-charcoal-text md:text-5xl">
              Compare project formats with a focused layout view.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-gray lg:justify-self-end">
            Drag through available plans, use the controls, or open any layout
            for a larger zoomable preview.
          </p>
        </div>

        <div className="relative mt-12 px-1 pb-16 md:px-10">
          <Carousel>
            <CarouselContent className="-ml-5">
              {layouts.map((layout, index) => {
                const layoutTitle = layout.title.trim();
                const layoutMeta = [layout.type, layout.area]
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .join(" / ");

                return (
                <CarouselItem
                  key={layout.id ?? `${layout.image}-${index}`}
                  className="basis-full pl-5 md:basis-1/2 xl:basis-1/3"
                >
                  <button
                    type="button"
                    onClick={() => openLayout(layout)}
                    className="group flex h-full w-full flex-col border border-border-gray bg-white text-left shadow-sm shadow-deep-navy/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-deep-navy/10"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-cool-mist">
                      <Image
                        src={layout.image}
                        alt={
                          layoutTitle
                            ? `${layoutTitle} layout preview`
                            : "Layout plan preview"
                        }
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      {layoutTitle ? (
                        <h3 className="font-display text-2xl leading-tight text-charcoal-text">
                          {layoutTitle}
                        </h3>
                      ) : null}
                      {layoutMeta ? (
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
                          {layoutMeta}
                        </p>
                      ) : null}
                      <span className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-primary-navy">
                        View Layout
                      </span>
                    </div>
                  </button>
                </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselNavigation
              className="absolute -bottom-2 left-auto top-auto w-full justify-end gap-2 px-0"
              classNameButton="bg-primary-navy p-3 shadow-lg shadow-deep-navy/15 disabled:bg-silver-shadow [&_svg]:stroke-white"
              alwaysShow
            />
            <CarouselIndicator
              className="-bottom-1 justify-start"
              classNameButton="bg-primary-navy/40 data-[active=true]:bg-primary-navy"
            />
          </Carousel>
        </div>
      </div>

      <AnimatePresence>
        {selectedLayout ? (
          (() => {
            const selectedTitle = selectedLayout.title.trim();
            const selectedMeta = [selectedLayout.type, selectedLayout.area]
              .map((item) => item.trim())
              .filter(Boolean)
              .join(" / ");

            return (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-architectural-black/60 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLayout(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden bg-white shadow-2xl shadow-architectural-black/25"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedLayout(null)}
                className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center bg-white text-2xl leading-none text-charcoal-text shadow-md"
                aria-label="Close layout modal"
              >
                ×
              </button>

              <div className="border-b border-border-gray p-5 pr-16 md:p-6 md:pr-20">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-navy">
                  Layout Viewer
                </p>
                <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    {selectedTitle ? (
                      <h3 className="font-display text-3xl leading-tight text-charcoal-text md:text-4xl">
                        {selectedTitle}
                      </h3>
                    ) : null}
                    {selectedMeta ? (
                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-gray">
                        {selectedMeta}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setZoom((value) => Math.max(1, value - 0.25))}
                      className="flex size-10 items-center justify-center border border-border-gray text-primary-navy transition hover:border-primary-navy"
                      aria-label="Zoom out"
                    >
                      <Minus size={17} />
                    </button>
                    <span className="min-w-14 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-gray">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setZoom((value) => Math.min(3, value + 0.25))}
                      className="flex size-10 items-center justify-center border border-border-gray text-primary-navy transition hover:border-primary-navy"
                      aria-label="Zoom in"
                    >
                      <Plus size={17} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoom(1)}
                      className="flex size-10 items-center justify-center border border-border-gray text-primary-navy transition hover:border-primary-navy"
                      aria-label="Reset zoom"
                    >
                      <RotateCcw size={17} />
                    </button>
                  </div>
                </div>
                {selectedLayout.description ? (
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-gray">
                    {selectedLayout.description}
                  </p>
                ) : null}
              </div>

              <div className="relative flex min-h-[55vh] flex-1 items-center justify-center overflow-hidden bg-cool-mist p-4 md:min-h-[62vh]">
                <motion.div
                  key={selectedLayout.image}
                  drag={zoom > 1}
                  dragMomentum={false}
                  dragConstraints={{ left: -420, right: 420, top: -320, bottom: 320 }}
                  animate={{ scale: zoom, x: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 160, damping: 24 }}
                  className={[
                    "relative aspect-[4/3] w-full max-w-5xl bg-white shadow-xl shadow-deep-navy/10",
                    zoom > 1 ? "cursor-grab active:cursor-grabbing" : "",
                  ].join(" ")}
                >
                  <Image
                    src={selectedLayout.image}
                    alt={
                      selectedTitle
                        ? `${selectedTitle} expanded layout preview`
                        : "Expanded layout preview"
                    }
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col gap-3 border-t border-border-gray p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-gray">
                  Use +/- to zoom. Drag the plan after zooming.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={showPrevious}
                    className="min-h-11 border border-border-gray px-5 text-sm font-semibold uppercase tracking-[0.12em] text-primary-navy transition hover:border-primary-navy"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="min-h-11 bg-primary-navy px-5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-steel-blue"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
            );
          })()
        ) : null}
      </AnimatePresence>
    </section>
  );
}
