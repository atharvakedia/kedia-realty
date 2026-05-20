"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/lib/types";

type ProjectCardProps = {
  project: Project;
};

function formatAcres(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "—";
  }

  return /[a-z]/i.test(trimmed) ? trimmed : `${trimmed} Acres`;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full border border-border-gray bg-white shadow-sm shadow-deep-navy/5 transition-shadow hover:shadow-xl hover:shadow-deep-navy/10"
    >
      <Link href={`/properties/${project.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-cool-mist">
          <Image
            src={project.image}
            alt={`${project.title} project image`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 bg-primary-navy px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            {project.status}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-navy">
            {project.type}
          </p>
          <h3 className="mt-3 font-display text-2xl leading-tight text-charcoal-text">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-gray">
            {project.location} / {project.region}
          </p>

          <div className="mt-5 grid gap-3 border-y border-border-gray py-5 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-gray">Price</span>
              <span className="text-right font-semibold text-charcoal-text">
                {project.priceLabel}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-gray">Total Area</span>
              <span className="text-right font-medium text-charcoal-text">
                {formatAcres(project.totalArea)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-gray">Total Units</span>
              <span className="text-right font-medium text-charcoal-text">
                {project.totalUnits}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-gray">RERA</span>
              <span className="text-right font-medium text-charcoal-text">
                {project.reraNumber}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-gray">Launch</span>
              <span className="text-right font-medium text-charcoal-text">
                {project.launchDate}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-sm text-slate-gray">{project.areaLabel}</span>
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-navy transition group-hover:text-steel-blue">
              View Project
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
