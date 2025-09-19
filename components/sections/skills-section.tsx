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
    <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
      {name}
    </li>
  );
}

function SkillGroupCard({ group }: SkillGroupCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
      <h3 className="text-base font-medium text-white">{group.title}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <SkillPill key={skill} name={skill} />
        ))}
      </ul>
    </div>
  );
}

export function SkillsSection({ eyebrow, title, groups }: SkillsSectionProps) {
  return (
    <section id="skills" className="space-y-8">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="grid gap-6 sm:grid-cols-2">
        {groups.map((group) => (
          <SkillGroupCard key={group.title} group={group} />
        ))}
      </div>
    </section>
  );
}
