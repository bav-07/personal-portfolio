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
  return (
    <motion.li variants={cardVariants} className="relative pl-16 sm:pl-[4.5rem]">
      {/* Timeline node */}
      <span aria-hidden className="timeline-node">
        <span className="timeline-node__ring" />
        <span className="timeline-node__core-wrapper">
          <span className="timeline-node__core-glow" />
          <span className="timeline-node__core" />
        </span>
      </span>
      <article className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/[0.08] p-7 transition-colors duration-300 hover:border-fuchsia-200/70 hover:bg-white/[0.12]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-200/35 via-transparent to-sky-200/25 opacity-70"
        />
        <div className="relative z-10 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold text-white">{experience.role}</h3>
            <p className="text-sm text-slate-200 font-semibold">{experience.company}</p>
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
          className="relative z-10 mt-4 grid gap-4 text-sm text-slate-100 sm:grid-cols-2"
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
      id="experience"
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
