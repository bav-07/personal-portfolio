import { JSX } from 'react';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

export type Profile = {
  name: string;
  title: string;
  location: string;
  summary: string;
  availability?: string;
  email: string;
  github: string;
  linkedin: string;
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
  logo: string;
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
  icon: string;
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
    "I'm a full-stack developer, crafting resilient web platforms that balance thoughtful design with reliable engineering.",
  // availability: "Available for full-time roles and select freelance collaborations.",
  email: "bavaharsan.nagarajah@gmail.com",
  github: "https://github.com/bav-07",
  linkedin: "https://linkedin.com/in/bavaharsan-nagarajah",
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
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
    label: "Connect",
    href: "#contact",
    variant: "ghost",
  },
];

export const heroHeadline =
  "Hey there, I'm Bav.";

export const aboutContent = [
  "I'm currently working as a software engineer at Sky, and have a Masters degree in Mechanical Engineering from Imperial College London. I aim to deliver intuitive, performant and accessible web applications. I want to solve complex problems, and craft innovative experiences that go above and beyond.",
  "Outside of code, I enjoy making art and music. I wish to bring elements of creativity and playfulness into my work, and build products that bring smiles to people's faces.",
];

export const experiences: Experience[] = [
  {
    role: "Software Engineer",
    company: "Sky",
    period: "2023 — Present",
    logo: "sky_logo.jpeg",
    description:
      "Working within the Digital Technology space, I have primarily been building and maintaining high-traffic webpages on the Sky.com platform, using Next.js, React and TypeScript. I collaborate closely with designers, product managers and other engineers to deliver performant, accessible and brand-consistent experiences that are used by millions of users daily.",
    highlights: [
      // "Led the migration of data-driven Watch pages to a modern Next.js stack with app directory routing and TypeScript-first components, implementing server-side rendering for improved performance - cutting load times by 63%.",
      // "Engineered Next.js pages and components for high-impact campaigns, including the launch of Sky Glass Air and Black Friday, built for performance, accessibility and brand-consistency.",
      // "Led observability upgrades within our Next.js apps, including implementing server-side logs surfaced through Kibana/Grafana dashboards, and migrating our monitoring solution from Dynatrace to OpenTelemetry.",
      // "Re-architected Playwright automation test suite implementing GraphQL API mocking to cut out dependencies on external data, stabilising CI/CD pipeline and cutting runtime from 30 to 5 minutes."
    ],
  },
  {
    role: "Software Engineering Associate",
    company: "Lloyds Banking Group",
    period: "2023",
    logo: "lloyds_banking_group_logo.jpeg",
    description:
      "Developed savings/investment forecast microservice (Java/Spring Boot) for LBG Mobile Banking App, allowing customers to connect savings/investments to real-life goals - rolled out to 1M+ UK customers.",
    highlights: [
    
    ],
  },
  {
    role: "MEng Mechanical Engineering",
    company: "Imperial College London",
    period: "2018-2022",
    logo: "imperial_college_london_logo.jpeg",
    description:
      "Graduated with First Class Honours. Capstone project consisted of developing a web app to visualise the behaviour of oscillatory systems, built with Vue.js, with the aim of making complex dynamics concepts easier to understand for students studying the Dynamics course.",
    highlights: [
    
    ],
  }
];

export const projects: Project[] = [
  {
    name: "Financial Management API",
    year: "2025",
    description:
      "A full-stack API for managing income and expenses, featuring JWT authentication, MongoDB persistence, and savings calculations. Built to practice clean architecture, controller testing, and TypeScript best practices.",
    stack: ["TypeScript", "Node.js", "Express", "MongoDB", "JWT", "Mongoose"],
    link: "https://github.com/bav-07/expense-tracker-api"
  },
  {
    name: "Kabutops Trumps",
    year: "2023",
    description:
      "A Pokémon-themed Top Trumps game where users compare stats across cards to win rounds. Developed as a collaborative React project, focusing on state management and interactive UI.",
    stack: ["JavaScript", "React", "CSS", "Java", "Spring Boot", "Tailwind"],
    link: "https://github.com/bav-07/KabutopsTrumpsFrontEnd"
  },
  {
    name: "Movie Reviews",
    year: "2023",
    description:
      "A movie review platform with search functionality, and the ability to post and manage reviews. Designed to explore full-stack app development with modern front-end practices.",
    stack: ["JavaScript", "React", "CSS", "Node.js"],
    link: "https://github.com/bav-07/json-statham-front-end"
  }
];


export const skillGroups: SkillGroup[] = [
  {
    title: "Core Stack",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Java",
      "Spring Boot",
      "GraphQL",
      "MongoDB",
    ],
  },
  {
    title: "Front-End",
    skills: [
      "Design Systems",
      "Styled Components",
      "Responsive UI",
      "Accessibility",
      "Figma",
    ],
  },
  {
    title: "Testing",
    skills: [
      "Playwright",
      "Jest",
      "Unit Tests",
      "E2E Tests",
      "API Mocking",
    ],
  },
  {
    title: "Tooling",
    skills: [
      "Git",
      "CI/CD",
      "Octopus",
      "Concourse",
      "Jenkins",
      "Swagger",
      "Postman",
    ],
  },
  {
    title: "Monitoring",
    skills: [
      "OpenTelemetry",
      "Kibana",
      "Grafana",
      "Dynatrace",
    ],
  },
  {
    title: "Collaboration",
    skills: [
      "Mentoring",
      "Pair Programming",
      "A/B Testing",
      "Code Reviews",
    ],
  },
];



export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/bavaharsan-nagarajah", icon: "FaLinkedin" },
  { label: "GitHub", href: "https://github.com/bav-07", icon: "FaGithub" },
  { label: "Youtube", href: "https://www.youtube.com/@bavdev", icon: "FaYoutube" },
];

export const sectionMeta = {
  about: { eyebrow: "Profile", title: "About" },
  experience: { eyebrow: "Experience", title: "Journey" },
  projects: { eyebrow: "Builds", title: "Selected Projects" },
  skills: { eyebrow: "Toolkit", title: "Skills" },
};

export const contactCopy = {
  heading: "Let's connect",
  description:
    "I’m always interested in discussing ambitious product ideas or opportunities to join mission-driven teams.",
};
