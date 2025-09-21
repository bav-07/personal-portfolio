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
  name: "Bav Nagarajah",
  title: "Software Engineer",
  location: "Based in London, UK",
  summary:
    "I craft resilient web platforms that balance thoughtful design with reliable engineering. With a focus on TypeScript, modern React patterns, and cloud-native tooling, I deliver interfaces that feel effortless to use.",
  availability: "Available for full-time roles and select freelance collaborations.",
  email: "bavaharsan.nagarajah@gmail.com",
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const highlights: Highlight[] = [
  { label: "Years of experience", value: "2.5" },
  { label: "Projects shipped", value: "10+" },
  { label: "Teammates mentored", value: "5" },
];

export const heroActions: HeroAction[] = [
  { label: "View projects", href: "#projects", variant: "primary" },
  {
    label: "Download resume",
    href: "https://bavaharsan.dev/resume.pdf",
    variant: "ghost",
    external: true,
  },
];

export const heroHeadline =
  "Hey there, I'm Bav.";

export const aboutContent = [
  "I thrive in collaborative environments where shipping is the default. From pairing with designers to aligning with product partners, I help teams untangle complex requirements and deliver polished experiences quickly.",
  "Outside of work you can find me experimenting with generative art, writing about engineering craft, and mentoring early-career developers navigating their first roles.",
];

export const experiences: Experience[] = [
  {
    role: "Software Engineer",
    company: "Sky",
    period: "July 2023 — Present",
    description:
      "",
    highlights: [
      "Led the migration of data-driven Watch pages to a modern Next.js stack with app directory routing and TypeScript-first components, implementing server-side rendering for improved performance - cutting load times by 63%.",
      "Engineered Next.js pages and components for high-impact campaigns, including the launch of Sky Glass Air and Black Friday, built for performance, accessibility and brand-consistency.",
      "Led observability upgrades within our Next.js apps, including implementing server-side logs surfaced through Kibana/Grafana dashboards, and migrating our monitoring solution from Dynatrace to OpenTelemetry.",
      "Re-architected Playwright automation test suite implementing GraphQL API mocking to cut out dependencies on external data, stabilising CI/CD pipeline and cutting runtime from 30 to 5 minutes."
    ],
  },
  {
    role: "Software Engineering Associate",
    company: "Lloyds Banking Group",
    period: "March 2023 - July 2023",
    description:
      "Prototyped internal tooling and automation workflows that accelerated deployment feedback loops for the engineering team.",
    highlights: [
      "Developed savings/investment forecast microservice (Java/Spring Boot) for LBG Mobile Banking App, allowing customers to connect savings/investments to real-life goals - rolled out to 1M+ UK customers.",
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
    name: "Bav UI",
    year: "2022",
    description:
      "An open-source component library that pairs expressive motion with pragmatic defaults for enterprise dashboards.",
    stack: ["Storybook", "Radix UI", "Tailwind CSS", "Vitest"],
    link: "https://github.com/bav-07/bav-ui",
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
  { label: "LinkedIn", href: "https://linkedin.com/in/bavaharsan-nagarajah" },
  { label: "GitHub", href: "https://github.com/bav-07" },
  { label: "Resume", href: "https://bavaharsan.dev/resume.pdf" },
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
