'use client';

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
};

const headerVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <motion.div variants={headerVariants} className="space-y-3">
      <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.45em] text-fuchsia-200/80">
        <span
          aria-hidden
          className="section-header__rule-top h-px w-10 rounded-full bg-gradient-to-r from-fuchsia-400/70 via-sky-300/80 to-transparent"
        />
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-[2.1rem]">
        {title}
      </h2>
      <div
        aria-hidden
        className="section-header__rule-bottom h-px w-24 rounded-full bg-gradient-to-r from-fuchsia-300/70 via-white/80 to-cyan-300/50"
      />
    </motion.div>
  );
}
