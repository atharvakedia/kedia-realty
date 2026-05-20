"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import React from "react";

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    text: "Kedia Group understood the property, the timing, and the nuance of the market. The process felt measured from start to finish.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Anika Rao",
    role: "Seller, Beverly Hills",
  },
  {
    text: "They brought discipline to a very emotional purchase and helped us see value beyond the obvious surface details.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Maya Mehta",
    role: "Buyer, Montecito",
  },
  {
    text: "The presentation was elegant, but the real difference was the negotiation strategy behind it.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Julian Hart",
    role: "Investor, San Francisco",
  },
  {
    text: "Every recommendation was specific to the project. Nothing felt templated, rushed, or inflated for effect.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Priya Shah",
    role: "Seller, Pacific Heights",
  },
  {
    text: "They helped us move quietly, compare real options, and understand where value would hold over time.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Rohan Kapoor",
    role: "Buyer, Malibu",
  },
  {
    text: "The team protected our privacy while still creating the right pressure with qualified buyers.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sana Sheikh",
    role: "Project Buyer",
  },
  {
    text: "Their market read was sharper than anyone else's. We made decisions with real confidence.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aliza Khan",
    role: "Buyer, Beverly Hills",
  },
  {
    text: "Kedia Group brought calm to a complicated sale and kept every detail moving without drama.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Hassan Ali",
    role: "Seller, Los Angeles",
  },
  {
    text: "We valued their discretion as much as their taste. The process was polished, direct, and deeply professional.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Zainab Hussain",
    role: "Buyer, Montecito",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

function TestimonialsColumn({
  className,
  testimonials: items,
  duration = 10,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={className}>
      <motion.ul
        animate={reduceMotion ? undefined : { translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="m-0 flex list-none flex-col gap-6 bg-transparent p-0 pb-6"
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <React.Fragment key={index}>
            {items.map(({ text, image, name, role }, itemIndex) => (
              <motion.li
                key={`${index}-${itemIndex}`}
                aria-hidden={index === 1 ? "true" : "false"}
                tabIndex={index === 1 ? -1 : 0}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.025,
                        y: -8,
                        boxShadow:
                          "0 25px 50px -12px rgba(28, 28, 28, 0.12), 0 0 0 1px rgba(28, 28, 28, 0.05)",
                      }
                }
                whileFocus={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.025,
                        y: -8,
                        boxShadow:
                          "0 25px 50px -12px rgba(28, 28, 28, 0.12), 0 0 0 1px rgba(28, 28, 28, 0.05)",
                      }
                }
                className="w-full max-w-xs cursor-default border border-border-gray bg-white p-8 shadow-lg shadow-deep-navy/5 transition focus:outline-none focus:ring-2 focus:ring-primary-navy/30"
              >
                <blockquote>
                  <p className="m-0 text-sm leading-7 text-slate-gray">{text}</p>
                  <footer className="mt-6 flex items-center gap-3">
                    <Image
                      width={40}
                      height={40}
                      src={image}
                      alt={`Avatar of ${name}`}
                      className="size-10 rounded-full object-cover ring-2 ring-cool-mist"
                    />
                    <div className="flex flex-col">
                      <cite className="not-italic font-semibold leading-5 tracking-tight text-charcoal-text">
                        {name}
                      </cite>
                      <span className="mt-0.5 text-sm leading-5 tracking-tight text-slate-gray">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
}

export default function TestimonialV2() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-white px-5 py-20 md:px-8 lg:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.7 },
        }}
        className="z-10 mx-auto max-w-7xl"
      >
        <div className="mx-auto mb-14 flex max-w-[580px] flex-col items-center justify-center text-center">
          <div className="border border-border-gray bg-soft-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary-navy">
            Client perspective
          </div>

          <h2
            id="testimonials-heading"
            className="mt-6 font-display text-4xl leading-[1.05] text-charcoal-text md:text-5xl"
          >
            Trusted when judgment matters most.
          </h2>
          <p className="mt-5 max-w-md text-base leading-8 text-slate-gray md:text-lg">
            Buyers and sellers rely on Kedia Group for clear advice, disciplined
            execution, and a composed process.
          </p>
        </div>

        <div
          className="mx-auto mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          role="region"
          aria-label="Scrolling testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </motion.div>
    </section>
  );
}
