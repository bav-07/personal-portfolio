const PROFILE = {
  name: "Taylor Morgan",
  title: "Software Engineer",
  location: "Based in Denver, CO",
  summary:
    "I craft resilient web platforms that balance thoughtful design with reliable engineering. With a focus on TypeScript, modern React patterns, and cloud-native tooling, I deliver interfaces that feel effortless to use.",
  availability: "Available for full-time roles and select freelance collaborations.",
  email: "hello@taylormorgan.dev",
};

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const HIGHLIGHTS = [
  { label: "Years of experience", value: "2" },
  { label: "Projects shipped", value: "8+" },
  { label: "Teammates mentored", value: "5" },
];

const EXPERIENCES = [
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

const PROJECTS = [
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

const SKILL_GROUPS = [
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
    skills: [
      "Git & GitHub",
      "Docker",
      "Vercel",
      "AWS",
      "Grafana",
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/taylormorgan" },
  { label: "GitHub", href: "https://github.com/taylormorgan" },
  { label: "Resume", href: "https://taylormorgan.dev/resume.pdf" },
];

const initials = PROFILE.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-180px] -z-10 flex justify-center">
        <div className="h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-[160px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-24 px-6 pb-24 pt-12 sm:px-10 lg:px-0">
        <header className="sticky top-6 z-20 flex items-center justify-between gap-6 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
              {initials}
            </div>
            <div className="hidden text-sm leading-tight text-slate-300 sm:block">
              <p className="font-medium text-white">{PROFILE.name}</p>
              <p>{PROFILE.title}</p>
            </div>
          </div>

          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                className="transition-colors hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition-colors hover:border-cyan-300/70 hover:bg-cyan-400/20"
            href={`mailto:${PROFILE.email}`}
          >
            Let's talk
          </a>
        </header>

        <section className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="space-y-7">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              {PROFILE.title} · {HIGHLIGHTS[0].value} years experience
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Designing and shipping thoughtful products for fast-moving teams.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">{PROFILE.summary}</p>
            <p className="text-sm text-slate-400">{PROFILE.availability}</p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                className="rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/15"
                href="#projects"
              >
                View projects
              </a>
              <a
                className="rounded-full border border-white/10 bg-transparent px-5 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-white/30 hover:text-white"
                href="https://taylormorgan.dev/resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Download résumé
              </a>
            </div>

            <dl className="flex flex-wrap gap-8 pt-6">
              {HIGHLIGHTS.map((highlight) => (
                <div key={highlight.label} className="space-y-1">
                  <dt className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {highlight.label}
                  </dt>
                  <dd className="text-3xl font-semibold text-white">{highlight.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-[2.5rem] border border-white/10 bg-white/5 p-[1px] shadow-[0_25px_80px_-40px_rgba(56,189,248,0.45)] md:mx-0">
            <div className="flex h-full w-full items-center justify-center rounded-[2.35rem] bg-[#050815] text-3xl font-semibold text-white">
              {initials}
            </div>
          </div>
        </section>

        <section id="about" className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">About</h2>
            <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Profile</span>
          </div>
          <div className="grid gap-6 text-slate-300 md:grid-cols-2">
            <p>
              I thrive in collaborative environments where shipping is the default. From pairing with designers to aligning with
              product partners, I help teams untangle complex requirements and deliver polished experiences quickly.
            </p>
            <p>
              Outside of work you can find me experimenting with generative art, writing about engineering craft, and mentoring early-career developers navigating their first roles.
            </p>
          </div>
        </section>

        <section id="experience" className="space-y-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">Experience</h2>
            <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Journey</span>
          </div>
          <div className="space-y-6">
            {EXPERIENCES.map((experience) => (
              <article
                key={`${experience.company}-${experience.role}`}
                className="group grid gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-cyan-300/60 hover:bg-white/[0.05]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-medium text-white">{experience.role}</h3>
                    <p className="text-sm text-slate-300">{experience.company}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {experience.period}
                  </span>
                </div>
                <p className="text-sm text-slate-300">{experience.description}</p>
                <ul className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                  {experience.highlights.map((item) => (
                    <li key={item} className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">Selected Projects</h2>
            <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Builds</span>
          </div>
          <ul className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <li
                key={project.name}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-cyan-300/60 hover:bg-white/[0.05]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-medium text-white">{project.name}</h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {project.year}
                  </span>
                </div>
                <p className="text-sm text-slate-300">{project.description}</p>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-200"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <a
                  className="mt-auto inline-flex items-center text-sm font-medium text-cyan-200 transition-colors hover:text-cyan-100"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore project →
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className="space-y-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">Skills</h2>
            <span className="text-xs uppercase tracking-[0.35em] text-slate-500">Toolkit</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur"
              >
                <h3 className="text-base font-medium text-white">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="space-y-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/[0.02] to-transparent p-10 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Let’s build something memorable</h2>
            <p className="text-sm text-slate-300">
              I’m always interested in discussing ambitious product ideas or opportunities to join mission-driven teams.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-200">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.href}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-colors hover:border-white/30 hover:text-white"
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
          <a
            className="inline-flex items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 px-6 py-3 text-sm font-medium text-cyan-100 transition-colors hover:border-cyan-300/70 hover:bg-cyan-400/20"
            href={`mailto:${PROFILE.email}`}
          >
            {PROFILE.email}
          </a>
        </section>

        <footer className="flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</span>
          <span>{PROFILE.location}</span>
        </footer>
      </main>
    </div>
  );
}
