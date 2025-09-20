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
    <li className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-slate-200">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent opacity-60"
      />
      <span className="relative z-10 block">{text}</span>
    </li>
  );
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <li className="relative pl-12 sm:pl-14">
      <span
        aria-hidden
        className="absolute left-0 top-3 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/40 bg-[#050a1d] shadow-[0_30px_60px_-45px_rgba(56,189,248,0.7)]"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-300" />
      </span>
      <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-cyan-300/60 hover:bg-white/[0.05]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent opacity-60"
        />
        <div className="relative z-10 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h3 className="text-lg font-medium text-white">{experience.role}</h3>
            <p className="text-sm text-slate-300">{experience.company}</p>
          </div>
          <span className="text-xs uppercase tracking-[0.35em] text-slate-500">
            {experience.period}
          </span>
        </div>
        <p className="relative z-10 mt-3 text-sm leading-relaxed text-slate-300/95">
          {experience.description}
        </p>
        <ul className="relative z-10 mt-4 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
          {experience.highlights.map((item) => (
            <ExperienceHighlight key={item} text={item} />
          ))}
        </ul>
      </article>
    </li>
  );
}

export function ExperienceSection({ eyebrow, title, experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="scroll-mt-32">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[0.02] p-8 shadow-[0_55px_110px_-75px_rgba(56,189,248,0.6)] backdrop-blur md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid-soft opacity-30"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 -z-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.28),_transparent_70%)] opacity-70 blur-[120px]"
        />

        <div className="relative space-y-10">
          <SectionHeader eyebrow={eyebrow} title={title} />

          <ol className="relative mt-6 space-y-10 before:absolute before:left-3 before:top-4 before:h-[calc(100%-1.5rem)] before:w-px before:bg-gradient-to-b from-cyan-400/40 via-white/10 to-transparent">
            {experiences.map((experienceItem) => (
              <ExperienceCard
                key={`${experienceItem.company}-${experienceItem.role}`}
                experience={experienceItem}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
