'use client';

import { motion } from "framer-motion";
import type { Project } from "@/data/portfolio";
import { SectionHeader } from "@/components/common/section-header";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ProjectsSectionProps = {
  eyebrow: string;
  title: string;
  projects: Project[];
};

type ProjectCardProps = {
  project: Project;
};

type TechBadgeProps = {
  name: string;
};

type ProjectLinkProps = {
  href: string;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: easeOut } },
} as const;

function TechBadge({ name }: TechBadgeProps) {
  return (
    <motion.li
      variants={cardVariants}
      className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-fuchsia-100"
    >
      {name}
    </motion.li>
  );
}

function ProjectLink({ href }: ProjectLinkProps) {
  return (
    <motion.a
      variants={cardVariants}
      className="group relative inline-flex items-center gap-2 text-sm font-medium text-fuchsia-100 transition-colors duration-300 hover:text-white"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span className="relative">Explore project</span>
      <span
        aria-hidden
        className="flex h-7 w-7 items-center justify-center rounded-full border border-fuchsia-300/40 bg-fuchsia-300/20 text-fuchsia-100 transition-colors duration-300 group-hover:border-fuchsia-200/70 group-hover:bg-fuchsia-300/30"
      >
        →
      </span>
    </motion.a>
  );
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.li
      variants={cardVariants}
      className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-[2.3rem] border border-white/20 bg-white/[0.08] p-7 shadow-[0_60px_120px_-80px_rgba(244,114,182,0.65)] transition-colors duration-300 hover:border-fuchsia-200/70 hover:bg-white/[0.12]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-200/35 via-transparent to-sky-200/25 opacity-70"
      />
      <div className="relative z-10 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-white">{project.name}</h3>
        <span className="text-xs uppercase tracking-[0.4em] text-fuchsia-100/70">{project.year}</span>
      </div>
      <p className="relative z-10 text-sm leading-relaxed text-slate-200/90">{project.description}</p>
      <motion.ul
        variants={cardVariants}
        className="relative z-10 flex flex-wrap gap-2"
      >
        {project.stack.map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
      </motion.ul>
      <motion.div variants={cardVariants} className="relative z-10 mt-auto pt-2">
        <ProjectLink href={project.link} />
      </motion.div>
    </motion.li>
  );
}

export function ProjectsSection({ eyebrow, title, projects }: ProjectsSectionProps) {
  return (
    <motion.section
      id="projects"
      className="scroll-mt-32"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-white/16 via-white/[0.05] to-white/[0.02] p-8 shadow-[0_65px_130px_-85px_rgba(244,114,182,0.65)] backdrop-blur md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid-soft opacity-35"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 bottom-0 -z-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.28),_transparent_70%)] opacity-80 blur-[130px]"
        />

        <motion.div variants={cardVariants} className="relative space-y-10">
          <SectionHeader eyebrow={eyebrow} title={title} />

          <motion.ul
            variants={cardVariants}
            className="grid gap-6 md:grid-cols-2"
          >
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.section>
  );
}
