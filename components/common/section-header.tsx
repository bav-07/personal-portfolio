import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
};

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <span className="text-xs uppercase tracking-[0.35em] text-slate-500">
        {eyebrow}
      </span>
    </div>
  );
}
