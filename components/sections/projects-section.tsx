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
    <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-200">
      {name}
    </li>
  );
}

function ProjectLink({ href }: ProjectLinkProps) {
  return (
    <a
      className="mt-auto inline-flex items-center text-sm font-medium text-cyan-200 transition-colors hover:text-cyan-100"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      Explore project →
    </a>
  );
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <li className="group flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-cyan-300/60 hover:bg-white/[0.05]">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-medium text-white">{project.name}</h3>
        <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
          {project.year}
        </span>
      </div>
      <p className="text-sm text-slate-300">{project.description}</p>
      <ul className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
      </ul>
      <ProjectLink href={project.link} />
    </li>
  );
}

export function ProjectsSection({ eyebrow, title, projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="space-y-8">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </ul>
    </section>
  );
}
