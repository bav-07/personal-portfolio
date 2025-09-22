'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { getInitials } from "@/lib/get-initials";
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
  className?: string;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: easeOut,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24, ease: easeOut } },
} as const;

const highlightVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: easeOut } },
} as const;

function ExperienceHighlight({ text, className }: ExperienceHighlightProps) {
  return (
    <motion.li
      variants={highlightVariants}
      className={"glass-highlight relative overflow-hidden rounded-2xl px-4 py-3 text-sm leading-relaxed text-slate-100 " + (className || "")}
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
  const initials = getInitials(experience.company);
  return (
    <motion.li variants={cardVariants} className="relative pl-20 sm:pl-[5.25rem]">
      {/* Timeline node */}
      <span aria-hidden className="timeline-node">
        <span className="timeline-node__ring hidden sm:block" />
        <span className="timeline-node__core-wrapper hidden sm:block">
          <span className="timeline-node__core-glow hidden sm:block" />
          <span className="timeline-node__core hidden sm:block" />
        </span>
        <div className="ml-8 sm:hidden experience-logo-tile relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-br from-white/30 via-white/10 to-white/5 backdrop-blur-md shadow-[0_18px_40px_-18px_rgba(244,114,182,0.45)]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-200/40 via-transparent to-sky-200/30 opacity-70" aria-hidden />
          {experience.logo ? (
            <Image
              src={`/${experience.logo}`}
              alt={`${experience.company} logo`}
              fill
              sizes="56px"
              className="object-contain p-2 rounded-2xl brightness-110 contrast-110 saturate-125 dark:brightness-100 dark:contrast-105"
            />
          ) : (
            <span className="text-xs font-semibold tracking-wider text-white/85 dark:text-white">{initials}</span>
          )}
        </div>
      </span>
  <article className="experience-card relative overflow-visible sm:overflow-hidden sm:rounded-[2rem] sm:border sm:border-white/20 sm:bg-white/[0.08] sm:p-7 transition-colors duration-300 sm:hover:border-fuchsia-200/70 sm:hover:bg-white/[0.12]">
        <span
          aria-hidden
          className="hidden sm:block pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-200/35 via-transparent to-sky-200/25 opacity-70"
        />
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 sm:pt-0 pt-1">
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            {/* Glass logo tile */}
            <div className="experience-logo-tile hidden sm:flex relative h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-br from-white/30 via-white/10 to-white/5 backdrop-blur-md shadow-[0_18px_40px_-18px_rgba(244,114,182,0.45)]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-200/40 via-transparent to-sky-200/30 opacity-70" aria-hidden />
              {experience.logo ? (
                <Image
                  src={`/${experience.logo}`}
                  alt={`${experience.company} logo`}
                  fill
                  sizes="56px"
                  className="object-contain p-2 rounded-2xl brightness-110 contrast-110 saturate-125 dark:brightness-100 dark:contrast-105"
                />
              ) : (
                <span className="text-xs font-semibold tracking-wider text-white/85 dark:text-white">{initials}</span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-display text-lg font-bold text-white break-words">{experience.role}</h3>
              <p className="text-sm text-slate-200 font-semibold ">{experience.company}</p>
            </div>
          </div>
          <span className="text-xs uppercase tracking-[0.4em] text-fuchsia-100/70 sm:pt-1">
            {experience.period}
          </span>
        </div>
        <p className="relative z-10 mt-3 text-sm leading-relaxed text-slate-200/90 ">
          {experience.description}
        </p>
        <motion.ul
          variants={highlightVariants}
          className="relative z-10 mt-4 grid gap-4 text-sm text-slate-100 sm:grid-cols-2 "
        >
          {experience.highlights.map((item, idx) => {
            const isLast = idx === experience.highlights.length - 1;
            const isOdd = experience.highlights.length % 2 === 1;
            const spanClass = isLast && isOdd ? 'sm:col-span-2' : '';
            return <ExperienceHighlight key={item} text={item} className={spanClass} />;
          })}
        </motion.ul>
      </article>
    </motion.li>
  );
}

export function ExperienceSection({ eyebrow, title, experiences }: ExperienceSectionProps) {
  return (
    <motion.section
      id="journey"
      className="scroll-mt-32"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-white/8 via-white/[0.02] to-white/[0.01] p-8 shadow-[0_65px_130px_-85px_rgba(244,114,182,0.65)] backdrop-blur-xs md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 -z-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.28),_transparent_70%)] opacity-75 blur-[120px]"
        />

        <motion.div variants={cardVariants} className="relative space-y-10">
          <SectionHeader eyebrow={eyebrow} title={title} />

          <motion.ol
            variants={cardVariants}
            className="experience-timeline relative mt-6 space-y-12"
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
