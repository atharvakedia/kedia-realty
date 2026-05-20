"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type ProjectImageCarouselProps = {
  title: string;
  images: string[];
};

function uniqueImages(images: string[]) {
  return Array.from(
    new Set(images.map((image) => image.trim()).filter(Boolean)),
  );
}

export function ProjectImageCarousel({
  title,
  images,
}: ProjectImageCarouselProps) {
  const carouselImages = useMemo(() => uniqueImages(images), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = carouselImages[activeIndex] ?? carouselImages[0];

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? carouselImages.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === carouselImages.length - 1 ? 0 : current + 1,
    );
  };

  if (!activeImage) {
    return (
      <div className="mt-12 flex aspect-[16/10] items-center justify-center border border-border-gray bg-cool-mist p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-navy">
          Project imagery coming soon
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="group relative aspect-[16/10] overflow-hidden bg-cool-mist">
        <Image
          key={activeImage}
          src={activeImage}
          alt={`${title} project image ${activeIndex + 1}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-4 text-white sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">
            {activeIndex + 1} / {carouselImages.length}
          </p>
          {carouselImages.length > 1 ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrevious}
                className="flex size-10 items-center justify-center border border-white/35 bg-black/25 text-white backdrop-blur transition hover:bg-white hover:text-primary-navy"
                aria-label="Previous project image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="flex size-10 items-center justify-center border border-white/35 bg-black/25 text-white backdrop-blur transition hover:bg-white hover:text-primary-navy"
                aria-label="Next project image"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {carouselImages.length > 1 ? (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {carouselImages.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show project image ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={[
                  "relative aspect-[16/10] overflow-hidden border bg-cool-mist transition",
                  isActive
                    ? "border-primary-navy"
                    : "border-border-gray hover:border-primary-navy/60",
                ].join(" ")}
              >
                <Image
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 12vw, (min-width: 640px) 20vw, 33vw"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
