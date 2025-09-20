import type { Experience } from "@/data/portfolio";
import { SectionHeader } from "@/components/common/section-header";

type ExperienceSectionProps = {
  eyebrow: string;
  title: string;
  experiences: Experience[];
};

type ExperienceCardProps = {
  experience: Experience;
};

type ExperienceHighlightProps = {
  text: string;
};

function ExperienceHighlight({ text }: ExperienceHighlightProps) {
  return (
    <li className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-300">
      {text}
    </li>
  );
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="group grid gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-cyan-300/60 hover:bg-white/[0.05]">
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
          <ExperienceHighlight key={item} text={item} />
        ))}
      </ul>
    </article>
  );
}

export function ExperienceSection({ eyebrow, title, experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="scroll-mt-32 space-y-8">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="space-y-6">
        {experiences.map((experienceItem) => (
          <ExperienceCard
            key={`${experienceItem.company}-${experienceItem.role}`}
            experience={experienceItem}
          />
        ))}
      </div>
    </section>
  );
}
