"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const heroImage =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2200&h=1400&fit=crop&crop=entropy&auto=format&q=84";

const rotatingWords = [
  "Community",
  "Homes",
  "Trust",
  "Values",
  "Foundations",
  "Dreams",
];

function HeroWordCarousel({ reduceMotion }: { reduceMotion: boolean }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || !isTabVisible || wordIndex >= rotatingWords.length - 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setWordIndex((current) => Math.min(current + 1, rotatingWords.length - 1));
    }, wordIndex === 0 ? 2000 : 2000);

    return () => window.clearTimeout(timeout);
  }, [isTabVisible, reduceMotion, wordIndex]);

  return (
    <span className="relative inline-grid overflow-hidden align-baseline">
      <motion.span
        key={rotatingWords[wordIndex]}
        initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduceMotion ? undefined : { y: "-100%", opacity: 0 }}
        transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
        className="col-start-1 row-start-1"
      >
        {rotatingWords[wordIndex]}
      </motion.span>
      <span
        aria-hidden="true"
        className="invisible col-start-1 row-start-1"
      >
        Foundations
      </span>
    </span>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-architectural-black text-white">
      <Image
        src={heroImage}
        alt="High-rise commercial development viewed from below"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.2)_0%,rgba(4,43,76,0.36)_38%,rgba(5,5,5,0.84)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_22%,rgba(47,111,159,0.24),transparent_38%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-36 md:px-8 md:pb-12 md:pt-40 lg:pb-16">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          transition={{ staggerChildren: 0.12 }}
          className="relative z-10 max-w-5xl"
        >
          <motion.p
            variants={item}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-white/68"
          >
            At Kedia Group
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-6 max-w-5xl font-display text-5xl leading-[0.92] text-white sm:text-7xl lg:text-8xl xl:text-9xl"
          >
            We Build <HeroWordCarousel reduceMotion={Boolean(reduceMotion)} />
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-base leading-8 text-white/76 md:text-lg"
          >
            Kedia Group develops disciplined real estate formats across
            townships, apartments, villas, commercial spaces, farm developments,
            and industrial townships.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            {/* <Button
              href="/properties"
              className="bg-white text-primary-navy hover:bg-cool-mist"
            >
              View Projects
            </Button>
            <Button
              href="/about"
              variant="secondary"
              className="border-white/28 text-white hover:border-white hover:text-white"
            >
              Our Approach
            </Button> */}
          </motion.div>

          {/* <motion.div
            variants={item}
            className="mt-12 grid max-w-3xl gap-4 border-t border-white/18 pt-6 sm:grid-cols-3"
          >
            {[
              ["1980", "Legacy foundation"],
              ["6+", "Development formats"],
              ["RERA", "Structured compliance"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-3xl leading-none text-white">
                  {value}
                </p>
                <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/58">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>*/}
        </motion.div>

        {/* <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-10 grid gap-3 border-t border-white/14 pt-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/58 sm:grid-cols-3 lg:max-w-4xl"
        >
          <p>RERA-led project information</p>
          <p>Townships, villas, apartments, commercial assets</p>
          <p>Site visits and layout plans by project</p>
        </motion.div> */}
      </div>
    </section>
  );
}
