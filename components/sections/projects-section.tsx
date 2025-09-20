import type { Project } from "@/data/portfolio";
import { SectionHeader } from "@/components/common/section-header";

type ProjectsSectionProps = {
  eyebrow: string;
  title: string;
  projects: Project[];
};

type ProjectCardProps = {
  project: Project;
};

type TechBadgeProps = {
  name: string;
};

type ProjectLinkProps = {
  href: string;
};

function TechBadge({ name }: TechBadgeProps) {
  return (
    <li className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-200">
      {name}
    </li>
  );
}

function ProjectLink({ href }: ProjectLinkProps) {
  return (
    <a
      className="group relative inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition-colors duration-300 hover:text-white"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span className="relative">Explore project</span>
      <span
        aria-hidden
        className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-200 transition-colors duration-300 group-hover:border-cyan-300/70 group-hover:bg-cyan-400/20"
      >
        →
      </span>
    </a>
  );
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <li className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-[2.3rem] border border-white/10 bg-white/[0.03] p-7 shadow-[0_45px_90px_-65px_rgba(56,189,248,0.6)] transition-colors duration-300 hover:border-cyan-300/60 hover:bg-white/[0.05]">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent opacity-60"
      />
      <div className="relative z-10 flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-medium text-white">{project.name}</h3>
        <span className="text-xs uppercase tracking-[0.35em] text-slate-500">{project.year}</span>
      </div>
      <p className="relative z-10 text-sm leading-relaxed text-slate-300/95">{project.description}</p>
      <ul className="relative z-10 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
      </ul>
      <div className="relative z-10 mt-auto pt-2">
        <ProjectLink href={project.link} />
      </div>
    </li>
  );
}

export function ProjectsSection({ eyebrow, title, projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="scroll-mt-32">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[0.02] p-8 shadow-[0_55px_110px_-75px_rgba(56,189,248,0.6)] backdrop-blur md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid-soft opacity-35"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 bottom-0 -z-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_bottom,_rgba(45,212,191,0.25),_transparent_70%)] opacity-70 blur-[130px]"
        />

        <div className="relative space-y-10">
          <SectionHeader eyebrow={eyebrow} title={title} />

          <ul className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
