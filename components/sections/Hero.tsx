"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { ZoomParallax } from "@/components/ui/zoom-parallax";

const heroImage =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=82";

const heroImages = [
  {
    src: heroImage,
    alt: "Modern real estate development with landscaped entry",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=82",
    alt: "Commercial development facade",
  },
  {
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=82",
    alt: "Apartment tower development",
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=82",
    alt: "Commercial office interiors",
  },
  {
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=82",
    alt: "Farm development landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=82",
    alt: "Industrial development corridor",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=82",
    alt: "Villa community residence",
  },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden bg-deep-navy">
      <div className="relative flex h-[50vh] items-center justify-center overflow-hidden bg-deep-navy px-5 text-center text-white md:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.13),transparent_52%)] blur-[30px]"
        />
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          transition={{ staggerChildren: 0.12 }}
          className="relative z-10 mx-auto max-w-6xl"
        >
          <motion.p
            variants={item}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-white/72"
          >
            Kedia Group
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-6 font-display text-6xl leading-[0.92] sm:text-7xl lg:text-8xl"
          >
            Building dreams since 1980
          </motion.h1>
          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/76 md:text-lg"
          >
            Scroll into a visual journey through Kedia Group&apos;s planned real
            estate developments across residential, commercial, farm, and
            industrial formats.
          </motion.p>
        </motion.div>
      </div>
      {reduceMotion ? (
        <div className="relative min-h-[80vh] overflow-hidden bg-deep-navy">
          <Image
            src={heroImage}
            alt="Modern real estate development with landscaped entry"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,43,76,0.32),rgba(5,5,5,0.5))]" />
        </div>
      ) : (
        <ZoomParallax images={heroImages} />
      )}
    </section>
  );
}
