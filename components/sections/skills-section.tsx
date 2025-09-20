import type { SkillGroup } from "@/data/portfolio";
import { SectionHeader } from "@/components/common/section-header";

type SkillsSectionProps = {
  eyebrow: string;
  title: string;
  groups: SkillGroup[];
};

type SkillGroupCardProps = {
  group: SkillGroup;
};

type SkillPillProps = {
  name: string;
};

function SkillPill({ name }: SkillPillProps) {
  return (
    <li className="relative overflow-hidden rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-sm text-slate-200">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent opacity-60"
      />
      <span className="relative z-10">{name}</span>
    </li>
  );
}

function SkillGroupCard({ group }: SkillGroupCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[2.1rem] border border-white/10 bg-white/[0.03] p-7 shadow-[0_40px_80px_-60px_rgba(56,189,248,0.55)]">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent opacity-60"
      />
      <h3 className="relative z-10 text-base font-medium text-white">{group.title}</h3>
      <ul className="relative z-10 mt-4 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <SkillPill key={skill} name={skill} />
        ))}
      </ul>
    </div>
  );
}

export function SkillsSection({ eyebrow, title, groups }: SkillsSectionProps) {
  return (
    <section id="skills" className="scroll-mt-32">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[0.02] p-8 shadow-[0_50px_110px_-80px_rgba(56,189,248,0.55)] backdrop-blur md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid-soft opacity-30"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-28 bottom-0 -z-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_bottom,_rgba(129,140,248,0.24),_transparent_70%)] opacity-65 blur-[120px]"
        />

        <div className="relative space-y-10">
          <SectionHeader eyebrow={eyebrow} title={title} />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <SkillGroupCard key={group.title} group={group} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
