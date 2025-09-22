'use client';

import { motion } from "framer-motion";
import type { SkillGroup } from "@/data/portfolio";
import { SectionHeader } from "@/components/common/section-header";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

type SkillsSectionProps = {
  eyebrow: string;
  title: string;
  groups: SkillGroup[];
};

type SkillGroupCardProps = {
  group: SkillGroup;
};

type SkillPillProps = {
  name: string;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.33,
      ease: easeOut,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: easeOut } },
} as const;

function SkillPill({ name }: SkillPillProps) {
  return (
    <motion.li
      variants={cardVariants}
      className="glass-highlight relative overflow-hidden rounded-full px-3 py-1 text-sm text-fuchsia-100"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-fuchsia-200/35 via-transparent to-sky-200/25 opacity-70"
      />
      <span className="relative z-10">{name}</span>
    </motion.li>
  );
}

function SkillGroupCard({ group }: SkillGroupCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative overflow-hidden rounded-[2.1rem] border border-white/20 bg-white/[0.08] p-7 shadow-[0_55px_110px_-75px_rgba(244,114,182,0.6)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-200/35 via-transparent to-sky-200/25 opacity-70"
      />
      <h3 className="relative z-10 font-display text-base font-semibold text-white">{group.title}</h3>
      <motion.ul
        variants={cardVariants}
        className="relative z-10 mt-4 flex flex-wrap gap-2"
      >
        {group.skills.map((skill) => (
          <SkillPill key={skill} name={skill} />
        ))}
      </motion.ul>
    </motion.div>
  );
}

export function SkillsSection({ eyebrow, title, groups }: SkillsSectionProps) {
  return (
    <motion.section
      id="skills"
      className="scroll-mt-32"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-white/8 via-white/[0.02] to-white/[0.01] p-8 shadow-[0_65px_130px_-85px_rgba(244,114,182,0.6)] backdrop-blur-xs md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-28 bottom-0 -z-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.26),_transparent_70%)] opacity-75 blur-[130px]"
        />

        <motion.div variants={cardVariants} className="relative space-y-10">
          <SectionHeader eyebrow={eyebrow} title={title} />

          <motion.div
            variants={cardVariants}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {groups.map((group) => (
              <SkillGroupCard key={group.title} group={group} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
