'use client';

import { motion } from "framer-motion";
import type { SocialLink } from "@/data/portfolio";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa";

type ContactSectionProps = {
  heading: string;
  description: string;
  socialLinks: SocialLink[];
  email: string;
};

type ContactLinkProps = SocialLink;

type ContactButtonProps = {
  email: string;
};

// Map of icon names to their components
const iconMap = {
  FaLinkedin,
  FaGithub, 
  FaYoutube,
} as const;

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: easeOut, when: "beforeChildren", staggerChildren: 0.05 },
  },
} as const;

const contentVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24, ease: easeOut } },
} as const;

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
} as const;

const buttonVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: easeOut } },
} as const;

const linkVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: easeOut } },
} as const;

function ContactLink({ href, label, icon }: ContactLinkProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap];
  
  return (
    <motion.a
      variants={linkVariants}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/25 bg-white/10 p-3 text-sm text-fuchsia-100 transition-colors duration-300 hover:border-white/45 hover:text-white"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      {IconComponent && (
        <span className="relative z-10">
          <IconComponent size={28} />
        </span>
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-130 from-fuchsia-200/35 via-transparent to-sky-200/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.a>
  );
}

function ContactButton({ email }: ContactButtonProps) {
  return (
    <motion.a
      variants={buttonVariants}
      className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/40 bg-linear-130 from-fuchsia-400/35 to-sky-400/25 p-3 text-sm font-medium text-white shadow-[0_45px_110px_-65px_rgba(244,114,182,0.8)] transition-all duration-500 hover:border-white/60 hover:text-white before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-fuchsia-400/45 before:to-sky-300/35 before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] hover:before:opacity-100"
      href={`mailto:${email}`}
      aria-label='Email'
    >
      <span className="relative z-10"><MdEmail size={28}/></span>
    </motion.a>
  );
}

export function ContactSection({ heading, description, socialLinks, email }: ContactSectionProps) {
  return (
    <motion.section
      id="contact"
      className="scroll-mt-32"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        variants={contentVariants}
        className="contact-section relative isolate overflow-hidden rounded-[2.75rem] border border-white/35 bg-gradient-to-br from-fuchsia-400/30 via-[#060a21]/85 to-transparent px-10 py-12 text-center shadow:[0_80px_160px_-90px_rgba(244,114,182,0.8)] shadow-[0_80px_160px_-90px_rgba(244,114,182,0.8)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -z-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.4),_transparent_70%)] opacity-90 blur-3xl"
        />

        <motion.div variants={contentVariants} className="relative mx-auto max-w-2xl space-y-6">
          <motion.div variants={contentVariants} className="space-y-3">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{heading}</h2>
            <p className="text-sm leading-relaxed text-slate-100/85">{description}</p>
          </motion.div>

          <motion.div
            variants={listVariants}
            className="flex flex-wrap justify-center gap-3 text-sm text-fuchsia-100"
          >
            {socialLinks.map((link) => (
              <ContactLink key={link.href} {...link} />
            ))}
            <ContactButton email={email} />
          </motion.div>

        </motion.div>
      </motion.div>
    </motion.section>
  );
}
