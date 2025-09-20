'use client';

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/section-header";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

type AboutSectionProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export function AboutSection({ eyebrow, title, paragraphs }: AboutSectionProps) {
  const [leadParagraph, ...additionalParagraphs] = paragraphs;

  const sectionVariants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.32,
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

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      id="about"
      className="relative isolate scroll-mt-32 overflow-hidden rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-white/8 via-white/[0.02] to-white/[0.01] p-8 shadow-[0_70px_120px_-80px_rgba(244,114,182,0.65)] backdrop-blur-xs md:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 -z-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.32),_transparent_70%)] opacity-75 blur-[120px]"
      />

      <motion.div variants={cardVariants} className="relative space-y-10">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          {leadParagraph ? (
            <motion.article
              variants={cardVariants}
              className="relative overflow-hidden rounded-[2.3rem] border border-white/25 bg-gradient-to-br from-white/20 via-white/5 to-transparent p-6 text-base leading-relaxed text-slate-100 shadow-[0_55px_110px_-70px_rgba(244,114,182,0.6)]"
            >
              <p className="relative z-10 text-slate-50/95">{leadParagraph}</p>
            </motion.article>
          ) : null}

          {additionalParagraphs.length ? (
            <motion.div
              variants={cardVariants}
              className="relative overflow-hidden rounded-[2.3rem] border border-white/20 bg-white/[0.08] p-6 text-base leading-relaxed text-slate-200 shadow-[0_55px_110px_-70px_rgba(56,189,248,0.55)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-200/35 via-transparent to-sky-200/25 opacity-70"
              />
              <div className="relative z-10 space-y-4">
                {additionalParagraphs.map((text, index) => (
                  <p key={index} className="text-slate-100/85">
                    {text}
                  </p>
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>
      </motion.div>
    </motion.section>
  );
}
