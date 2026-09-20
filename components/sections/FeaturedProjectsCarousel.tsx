"use client";

import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

type FeaturedProjectsCarouselProps = {
  projects: Project[];
};

function useVisibleProjectCount() {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const updateVisibleCount = () => {
      setVisibleCount(mediaQuery.matches ? 3 : 1);
    };

    updateVisibleCount();
    mediaQuery.addEventListener("change", updateVisibleCount);

    return () => mediaQuery.removeEventListener("change", updateVisibleCount);
  }, []);

  return visibleCount;
}

export function FeaturedProjectsCarousel({
  projects,
}: FeaturedProjectsCarouselProps) {
  const reduceMotion = useReducedMotion();
  const visibleCount = useVisibleProjectCount();
  const maxIndex = useMemo(
    () => Math.max(projects.length - visibleCount, 0),
    [projects.length, visibleCount],
  );
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const safeIndex = Math.min(index, maxIndex);
  const canCarousel = projects.length > visibleCount;

  useEffect(() => {
    if (!canCarousel || reduceMotion || isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      if (document.hidden) {
        return;
      }

      setIndex((currentIndex) =>
        currentIndex >= maxIndex ? 0 : currentIndex + 1,
      );
    }, 5000);

    return () => window.clearInterval(interval);
  }, [canCarousel, isPaused, maxIndex, reduceMotion]);

  if (projects.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setIndex(Math.max(safeIndex - 1, 0));
  };

  const goToNext = () => {
    setIndex(Math.min(safeIndex + 1, maxIndex));
  };

  return (
    <div
      className="relative mt-12"
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${safeIndex * (100 / visibleCount)}%)`,
          }}
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="min-w-0 shrink-0 grow-0 basis-full pr-0 md:basis-1/3 md:pr-6"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {canCarousel ? (
        <div className="mt-8 flex items-center justify-between gap-4 md:justify-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous featured project"
              onClick={goToPrevious}
              disabled={safeIndex === 0}
              className={cn(
                "flex size-11 items-center justify-center rounded-full border border-primary-navy/20 bg-white text-primary-navy shadow-sm transition",
                "hover:border-primary-navy hover:bg-primary-navy hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-navy/30",
                "disabled:pointer-events-none disabled:opacity-35",
              )}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next featured project"
              onClick={goToNext}
              disabled={safeIndex === maxIndex}
              className={cn(
                "flex size-11 items-center justify-center rounded-full border border-primary-navy/20 bg-white text-primary-navy shadow-sm transition",
                "hover:border-primary-navy hover:bg-primary-navy hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-navy/30",
                "disabled:pointer-events-none disabled:opacity-35",
              )}
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-gray">
            {safeIndex + 1} / {maxIndex + 1}
          </p>
        </div>
      ) : null}
    </div>
  );
}
