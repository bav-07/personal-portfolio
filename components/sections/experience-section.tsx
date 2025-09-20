'use client';

import { motion } from "framer-motion";
import type { Experience } from "@/data/portfolio";
import { SectionHeader } from "@/components/common/section-header";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ExperienceSectionProps = {
  eyebrow: string;
  title: string;
  experiences: Experience[];
};

type ExperienceCardProps = {
  experience: Experience;
};

type ExperienceHighlightProps = {
  text: string;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
      when: "beforeChildren",
      staggerChildren: 0.14,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
} as const;

const highlightVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
} as const;

function ExperienceHighlight({ text }: ExperienceHighlightProps) {
  return (
    <motion.li
      variants={highlightVariants}
      className="relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm leading-relaxed text-slate-100"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-fuchsia-200/35 via-transparent to-sky-200/25 opacity-70"
      />
      <span className="relative z-10 block">{text}</span>
    </motion.li>
  );
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <motion.li variants={cardVariants} className="relative pl-12 sm:pl-14">
      <span
        aria-hidden
        className="absolute left-0 top-3 flex h-6 w-6 items-center justify-center rounded-full border border-fuchsia-300/50 bg-[#070c26] shadow-[0_30px_70px_-45px_rgba(244,114,182,0.7)]"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-300" />
      </span>
      <article className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/[0.08] p-7 transition-colors duration-300 hover:border-fuchsia-200/70 hover:bg-white/[0.12]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-200/35 via-transparent to-sky-200/25 opacity-70"
        />
        <div className="relative z-10 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-white">{experience.role}</h3>
            <p className="text-sm text-slate-200">{experience.company}</p>
          </div>
          <span className="text-xs uppercase tracking-[0.4em] text-fuchsia-100/70">
            {experience.period}
          </span>
        </div>
        <p className="relative z-10 mt-3 text-sm leading-relaxed text-slate-200/90">
          {experience.description}
        </p>
        <motion.ul
          variants={highlightVariants}
          className="relative z-10 mt-4 grid gap-2 text-sm text-slate-100 sm:grid-cols-2"
        >
          {experience.highlights.map((item) => (
            <ExperienceHighlight key={item} text={item} />
          ))}
        </motion.ul>
      </article>
    </motion.li>
  );
}

export function ExperienceSection({ eyebrow, title, experiences }: ExperienceSectionProps) {
  return (
    <motion.section
      id="experience"
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
          className="pointer-events-none absolute -left-32 top-10 -z-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.28),_transparent_70%)] opacity-75 blur-[120px]"
        />

        <motion.div variants={cardVariants} className="relative space-y-10">
          <SectionHeader eyebrow={eyebrow} title={title} />

          <motion.ol
            variants={cardVariants}
            className="relative mt-6 space-y-10 before:absolute before:left-3 before:top-4 before:h-[calc(100%-1.5rem)] before:w-px before:bg-gradient-to-b from-fuchsia-300/40 via-white/10 to-transparent"
          >
            {experiences.map((experienceItem) => (
              <ExperienceCard
                key={`${experienceItem.company}-${experienceItem.role}`}
                experience={experienceItem}
              />
            ))}
          </motion.ol>
        </motion.div>
      </div>
    </motion.section>
  );
}
