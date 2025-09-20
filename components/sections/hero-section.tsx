import type { HeroAction, Highlight, Profile } from "@/data/portfolio";
import { getInitials } from "@/lib/get-initials";

type HeroSectionProps = {
  profile: Profile;
  highlights: Highlight[];
  actions: HeroAction[];
  headline: string;
};

type HeroActionButtonProps = {
  action: HeroAction;
};

type HeroHighlightProps = {
  highlight: Highlight;
};

const actionStyles: Record<HeroAction["variant"], string> = {
  primary:
    "relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/10 px-6 py-2 text-sm font-medium text-white shadow-[0_28px_60px_-40px_rgba(56,189,248,0.75)] transition-all duration-300 hover:border-white/35 hover:bg-white/15 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-white/20 before:via-white/5 before:to-white/20 before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-100",
  ghost:
    "relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-transparent px-6 py-2 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-white/25 hover:text-white before:absolute before:inset-0 before:-z-10 before:bg-white/5 before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-100",
};

function HeroActionButton({ action }: HeroActionButtonProps) {
  const { label, href, variant, external } = action;

  return (
    <a
      className={actionStyles[variant]}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="relative z-10">{label}</span>
    </a>
  );
}

function HeroHighlightItem({ highlight }: HeroHighlightProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] px-5 py-4 shadow-[0_35px_70px_-45px_rgba(56,189,248,0.6)]">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-px rounded-[1.35rem] border border-white/10 opacity-40"
      />
      <div className="relative z-10 space-y-1">
        <dt className="text-xs uppercase tracking-[0.35em] text-slate-500">
          {highlight.label}
        </dt>
        <dd className="text-3xl font-semibold text-white">{highlight.value}</dd>
      </div>
    </div>
  );
}

type HeroAvatarProps = {
  name: string;
};

function HeroAvatar({ name }: HeroAvatarProps) {
  const initials = getInitials(name);

  return (
    <div className="relative flex h-[15rem] w-[15rem] items-center justify-center md:mr-6">
      <div className="relative isolate flex h-full w-full items-center justify-center overflow-hidden rounded-[3.5rem] border border-white/15 bg-white/[0.03] shadow-[0_65px_120px_-75px_rgba(56,189,248,0.85)] before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),transparent_70%)] before:opacity-80 before:content-[''] after:pointer-events-none after:absolute after:-inset-[22%] after:-z-20 after:rounded-full after:border after:border-cyan-400/30 after:opacity-40 after:content-['']">
        <span className="relative flex h-[85%] w-[85%] items-center justify-center rounded-[3rem] bg-[#050815]/95 text-4xl font-semibold tracking-[0.35em] text-white">
          {initials}
        </span>
      </div>
    </div>
  );
}

export function HeroSection({ profile, highlights, actions, headline }: HeroSectionProps) {
  const experienceHighlight = highlights.find((highlight) =>
    highlight.label.toLowerCase().includes("experience"),
  );
  const experienceCopy = experienceHighlight
    ? `${experienceHighlight.value} yrs experience`
    : undefined;

  return (
    <section className="relative isolate overflow-hidden rounded-[2.75rem] border border-white/15 bg-white/[0.03] px-8 py-12 shadow-[0_70px_140px_-80px_rgba(56,189,248,0.85)] md:px-12 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-soft opacity-50 mask-fade-b"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-36 top-12 -z-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_70%)] opacity-80 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 -bottom-8 -z-20 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_bottom,_rgba(45,212,191,0.22),_transparent_70%)] opacity-70 blur-[120px]"
      />

      <div className="relative grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1 text-xs uppercase tracking-[0.4em] text-slate-300">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            <span>{profile.title}</span>
            {experienceCopy ? (
              <span className="text-slate-400">· {experienceCopy}</span>
            ) : null}
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-300/95">
            {profile.summary}
          </p>

          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-2 w-2 rounded-full bg-emerald-400/60 blur-[1px]" />
              <span className="relative h-[6px] w-[6px] rounded-full bg-emerald-300" />
            </span>
            {profile.availability}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {actions.map((action) => (
              <HeroActionButton key={action.label} action={action} />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 md:items-end">
          <HeroAvatar name={profile.name} />
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden />
            {profile.location}
          </span>
        </div>
      </div>

      <dl className="relative mt-12 grid gap-4 sm:grid-cols-3">
        {highlights.map((highlight) => (
          <HeroHighlightItem key={highlight.label} highlight={highlight} />
        ))}
      </dl>
    </section>
  );
}
