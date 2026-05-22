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
    text: "Kedia Group gave us a clear picture of the project, the location, and the long-term value. The whole process felt transparent and well guided.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ritika Sharma",
    role: "Mansarovar Extension",
  },
  {
    text: "We were comparing plotted developments around Ajmer Road, and their team helped us understand the details that actually matter before booking.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Amit Goyal",
    role: "Ajmer Road",
  },
  {
    text: "The team was patient with every question, from RERA details to layout plans. That gave our family a lot of confidence in the decision.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sanjay Bhandari",
    role: "Jagatpura",
  },
  {
    text: "What stood out was the clarity. There was no pressure, no overpromising, just proper information about the project and its future potential.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Neha Jain",
    role: "Vaishali Nagar",
  },
  {
    text: "For us, location and trust were the biggest factors. Kedia Group explained the township plan in a simple way and helped us choose the right plot size.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Rohit Mathur",
    role: "Sikar Road",
  },
  {
    text: "Their team understood what a Jaipur family looks for in a home: access, safety, practical planning, and value that holds over time.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Pooja Khandelwal",
    role: "Tonk Road",
  },
  {
    text: "We appreciated how organized the documentation and project explanation were. It made the process much easier for our parents as well.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Kavya Agarwal",
    role: "Raja Park",
  },
  {
    text: "The project team was straightforward about timelines, amenities, and surrounding development. That honesty made a real difference.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Mahendra Singh Rathore",
    role: "Sirsi Road",
  },
  {
    text: "Kedia Group helped us look beyond just price and think about connectivity, neighborhood growth, and long-term value. That guidance was valuable.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Farah Khan",
    role: "Civil Lines",
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
        className="m-0 flex list-none flex-col gap-3 bg-transparent p-0 pb-3 sm:gap-6 sm:pb-6"
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
                className="w-[calc((100vw-3.5rem)/2)] max-w-[11rem] cursor-default border border-border-gray bg-white p-4 shadow-lg shadow-deep-navy/5 transition focus:outline-none focus:ring-2 focus:ring-primary-navy/30 sm:w-full sm:max-w-xs sm:p-8"
              >
                <blockquote>
                  <p className="m-0 text-[0.68rem] leading-5 text-slate-gray sm:text-sm sm:leading-7">
                    {text}
                  </p>
                  <footer className="mt-4 flex items-center gap-2 sm:mt-6 sm:gap-3">
                    <Image
                      width={40}
                      height={40}
                      src={image}
                      alt={`Avatar of ${name}`}
                      className="size-7 rounded-full object-cover ring-2 ring-cool-mist sm:size-10"
                    />
                    <div className="flex flex-col">
                      <cite className="text-[0.68rem] not-italic font-semibold leading-4 tracking-tight text-charcoal-text sm:text-sm sm:leading-5">
                        {name}
                      </cite>
                      <span className="mt-0.5 text-[0.64rem] leading-4 tracking-tight text-slate-gray sm:text-sm sm:leading-5">
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
            Trusted across Jaipur’s growing neighborhoods.
          </h2>

          <p className="mt-5 max-w-md text-base leading-8 text-slate-gray md:text-lg">
            For generations, families have placed their trust in Kedia Group for thoughtful planning and investment opportunities.
          </p>
        </div>

        <div
          className="mx-auto mt-10 flex max-h-[620px] justify-center gap-3 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] sm:max-h-[740px] sm:gap-6"
          role="region"
          aria-label="Scrolling testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden md:block"
            duration={17}
          />
        </div>
      </motion.div>
    </section>
  );
}
