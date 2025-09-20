'use client';

import { motion } from "framer-motion";
import type { HeroAction, Highlight, Profile } from "@/data/portfolio";
import { getInitials } from "@/lib/get-initials";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

type HeroSectionProps = {
  profile: Profile;
  highlights: Highlight[];
  actions: HeroAction[];
  headline: string;
};

type HeroActionButtonProps = {
  action: HeroAction;
};

type HeroHighlightProps = {
  highlight: Highlight;
};

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

const highlightVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const highlightListVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.12 },
  },
};

const actionStyles: Record<HeroAction["variant"], string> = {
  primary:
    "relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/30 bg-gradient-to-r from-sky-400/70 via-fuchsia-500/70 to-emerald-400/70 px-6 py-2 text-sm font-medium text-white shadow-[0_30px_80px_-40px_rgba(244,114,182,0.9)] transition-all duration-400 hover:border-white/60 hover:shadow-[0_40px_90px_-35px_rgba(56,189,248,0.8)] before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-white/30 before:via-white/10 before:to-white/30 before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-100",
  ghost:
    "relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/25 bg-white/5 px-6 py-2 text-sm font-medium text-slate-100 transition-all duration-400 hover:border-white/45 hover:bg-white/10 hover:text-white before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-white/20 before:via-transparent before:to-white/20 before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-90",
};

function HeroActionButton({ action }: HeroActionButtonProps) {
  const { label, href, variant, external } = action;

  return (
    <motion.a
      variants={buttonVariants}
      className={actionStyles[variant]}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="relative z-10 font-medium tracking-tight">{label}</span>
    </motion.a>
  );
}

function HeroHighlightItem({ highlight }: HeroHighlightProps) {
  return (
    <motion.div
      variants={highlightVariants}
      className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/[0.08] px-5 py-4 shadow-[0_40px_85px_-45px_rgba(244,114,182,0.65)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-200/40 via-transparent to-sky-200/20 opacity-70"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-px rounded-[1.35rem] border border-white/40 opacity-60"
      />
      <div className="relative z-10 space-y-1">
        <dt className="text-xs uppercase tracking-[0.42em] text-fuchsia-100/80">
          {highlight.label}
        </dt>
        <dd className="font-display text-3xl font-semibold text-white">
          {highlight.value}
        </dd>
      </div>
    </motion.div>
  );
}

type HeroAvatarProps = {
  name: string;
};

function HeroAvatar({ name }: HeroAvatarProps) {
  const initials = getInitials(name);

  return (
    <motion.div variants={contentVariants} className="relative flex h-[15rem] w-[15rem] items-center justify-center md:mr-6">
      <div className="relative isolate flex h-full w-full items-center justify-center overflow-hidden rounded-[3.5rem] border border-white/25 bg-gradient-to-br from-white/20 via-white/6 to-transparent shadow-[0_75px_140px_-80px_rgba(244,114,182,0.85)] before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_30%_25%,rgba(244,114,182,0.45),transparent_72%)] before:opacity-80 before:content-[''] after:pointer-events-none after:absolute after:-inset-[22%] after:-z-20 after:rounded-full after:border after:border-fuchsia-300/40 after:opacity-40 after:content-['']">
        <span className="relative flex h-[85%] w-[85%] items-center justify-center rounded-[3rem] bg-[#070a1d]/90 font-display text-4xl font-semibold tracking-[0.4em] text-white">
          {initials}
        </span>
      </div>
    </motion.div>
  );
}

export function HeroSection({ profile, highlights, actions, headline }: HeroSectionProps) {
  const experienceHighlight = highlights.find((highlight) =>
    highlight.label.toLowerCase().includes("experience"),
  );
  const experienceCopy = experienceHighlight
    ? `${experienceHighlight.value} yrs experience`
    : undefined;

  return (
    <motion.section
      variants={heroVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className="relative isolate overflow-hidden rounded-[2.75rem] border border-white/20 bg-gradient-to-br from-white/20 via-white/[0.06] to-white/[0.02] px-8 py-12 shadow-[0_80px_160px_-90px_rgba(244,114,182,0.8)] md:px-12 md:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-soft opacity-45 mask-fade-b"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-36 top-12 -z-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.32),_transparent_68%)] opacity-85 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 -bottom-8 -z-20 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.28),_transparent_70%)] opacity-80 blur-[130px]"
      />

      <div className="relative grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <motion.div variants={contentVariants} className="space-y-8">
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.42em] text-fuchsia-100/90"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            <span>{profile.title}</span>
            {experienceCopy ? (
              <span className="text-fuchsia-100/70">· {experienceCopy}</span>
            ) : null}
          </motion.div>

          <motion.h1
            variants={contentVariants}
            className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {headline}
          </motion.h1>
          <motion.p
            variants={contentVariants}
            className="max-w-2xl text-lg leading-relaxed text-slate-100/90"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-3 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100"
          >
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-2 w-2 rounded-full bg-emerald-400/60 blur-[1px]" />
              <span className="relative h-[6px] w-[6px] rounded-full bg-emerald-300" />
            </span>
            {profile.availability}
          </motion.div>

          <motion.div
            variants={contentVariants}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            {actions.map((action) => (
              <HeroActionButton key={action.label} action={action} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={contentVariants}
          className="flex flex-col items-center gap-5 md:items-end"
        >
          <HeroAvatar name={profile.name} />
          <motion.span
            variants={badgeVariants}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-fuchsia-100/90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden />
            {profile.location}
          </motion.span>
        </motion.div>
      </div>

      <motion.dl
        variants={highlightListVariants}
        className="relative mt-12 grid gap-4 sm:grid-cols-3"
      >
        {highlights.map((highlight) => (
          <HeroHighlightItem key={highlight.label} highlight={highlight} />
        ))}
      </motion.dl>
    </motion.section>
  );
}
