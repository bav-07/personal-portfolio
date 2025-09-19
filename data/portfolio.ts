export type Profile = {
  name: string;
  title: string;
  location: string;
  summary: string;
  availability: string;
  email: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type Highlight = {
  label: string;
  value: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

export type Project = {
  name: string;
  year: string;
  description: string;
  stack: string[];
  link: string;
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type SocialLink = {
  label: string;
  href: string;
};

export type HeroAction = {
  label: string;
  href: string;
  variant: "primary" | "ghost";
  external?: boolean;
};

export const profile: Profile = {
  name: "Taylor Morgan",
  title: "Software Engineer",
  location: "Based in Denver, CO",
  summary:
    "I craft resilient web platforms that balance thoughtful design with reliable engineering. With a focus on TypeScript, modern React patterns, and cloud-native tooling, I deliver interfaces that feel effortless to use.",
  availability: "Available for full-time roles and select freelance collaborations.",
  email: "hello@taylormorgan.dev",
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const highlights: Highlight[] = [
  { label: "Years of experience", value: "2" },
  { label: "Projects shipped", value: "8+" },
  { label: "Teammates mentored", value: "5" },
];

export const heroActions: HeroAction[] = [
  { label: "View projects", href: "#projects", variant: "primary" },
  {
    label: "Download résumé",
    href: "https://taylormorgan.dev/resume.pdf",
    variant: "ghost",
    external: true,
  },
];

export const heroHeadline =
  "Designing and shipping thoughtful products for fast-moving teams.";

export const aboutContent = [
  "I thrive in collaborative environments where shipping is the default. From pairing with designers to aligning with product partners, I help teams untangle complex requirements and deliver polished experiences quickly.",
  "Outside of work you can find me experimenting with generative art, writing about engineering craft, and mentoring early-career developers navigating their first roles.",
];

export const experiences: Experience[] = [
  {
    role: "Software Engineer",
    company: "Lumina Systems",
    period: "2023 — Present",
    description:
      "Building design systems and shipping new product surfaces for a SaaS analytics platform serving over 40k active users.",
    highlights: [
      "Led the migration to a modern React stack with app directory routing and TypeScript-first components.",
      "Collaborated with designers to launch a modular dashboard experience that lifted activation metrics by 18%.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Lightwave Labs",
    period: "2022 — 2023",
    description:
      "Prototyped internal tooling and automation workflows that accelerated deployment feedback loops for the engineering team.",
    highlights: [
      "Built a CI-integrated release assistant that reduced QA turnaround time by two hours per release.",
      "Introduced shared utility patterns, trimming bundle size and boosting confidence in refactors.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Pulseboard",
    year: "2024",
    description:
      "A modular product analytics workspace with live data tiles, custom reports, and collaborative annotations for distributed teams.",
    stack: ["Next.js", "TypeScript", "tRPC", "Tailwind CSS"],
    link: "https://pulseboard.app",
  },
  {
    name: "Shiftform",
    year: "2023",
    description:
      "Form experience toolkit with accessible components, validation flows, and analytics hooks for rapid product experiments.",
    stack: ["React", "Zod", "Framer Motion", "Vercel"],
    link: "https://shiftform.dev",
  },
  {
    name: "Atlas UI",
    year: "2022",
    description:
      "An open-source component library that pairs expressive motion with pragmatic defaults for enterprise dashboards.",
    stack: ["Storybook", "Radix UI", "Tailwind CSS", "Vitest"],
    link: "https://github.com/taylormorgan/atlas-ui",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Core Stack",
    skills: [
      "TypeScript",
      "React & Next.js",
      "Node.js",
      "tRPC",
      "PostgreSQL",
      "Prisma",
    ],
  },
  {
    title: "Experience",
    skills: [
      "Design Systems",
      "API Design",
      "Testing & Automation",
      "Performance Optimization",
      "Accessibility",
    ],
  },
  {
    title: "Tooling",
    skills: ["Git & GitHub", "Docker", "Vercel", "AWS", "Grafana"],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/taylormorgan" },
  { label: "GitHub", href: "https://github.com/taylormorgan" },
  { label: "Resume", href: "https://taylormorgan.dev/resume.pdf" },
];

export const sectionMeta = {
  about: { eyebrow: "Profile", title: "About" },
  experience: { eyebrow: "Journey", title: "Experience" },
  projects: { eyebrow: "Builds", title: "Selected Projects" },
  skills: { eyebrow: "Toolkit", title: "Skills" },
};

export const contactCopy = {
  heading: "Let’s build something memorable",
  description:
    "I’m always interested in discussing ambitious product ideas or opportunities to join mission-driven teams.",
};
