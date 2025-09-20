import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
};

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <div className="space-y-3">
      <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.45em] text-slate-400">
        <span
          aria-hidden
          className="h-px w-10 rounded-full bg-gradient-to-r from-cyan-400/70 via-white/80 to-transparent"
        />
        {eyebrow}
      </span>
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      <div
        aria-hidden
        className="h-px w-20 rounded-full bg-gradient-to-r from-white/60 via-cyan-300/50 to-transparent"
      />
    </div>
  );
}
