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
    "rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/15",
  ghost:
    "rounded-full border border-white/10 bg-transparent px-5 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-white/30 hover:text-white",
};

function HeroActionButton({ action }: HeroActionButtonProps) {
  const { label, href, variant, external } = action;

  return (
    <a
      className={actionStyles[variant]}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {label}
    </a>
  );
}

function HeroHighlightItem({ highlight }: HeroHighlightProps) {
  return (
    <div className="space-y-1">
      <dt className="text-xs uppercase tracking-[0.3em] text-slate-500">
        {highlight.label}
      </dt>
      <dd className="text-3xl font-semibold text-white">{highlight.value}</dd>
    </div>
  );
}

type HeroAvatarProps = {
  name: string;
};

function HeroAvatar({ name }: HeroAvatarProps) {
  const initials = getInitials(name);

  return (
    <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-[2.5rem] border border-white/10 bg-white/5 p-[1px] shadow-[0_25px_80px_-40px_rgba(56,189,248,0.45)] md:mx-0">
      <div className="flex h-full w-full items-center justify-center rounded-[2.35rem] bg-[#050815] text-3xl font-semibold text-white">
        {initials}
      </div>
    </div>
  );
}

export function HeroSection({ profile, highlights, actions, headline }: HeroSectionProps) {
  const experienceHighlight = highlights.find(
    (highlight) => highlight.label.toLowerCase().includes("experience"),
  );

  return (
    <section className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
      <div className="space-y-7">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          {profile.title}
          {experienceHighlight
            ? ` · ${experienceHighlight.value} years experience`
            : null}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {headline}
        </h1>
        <p className="max-w-2xl text-lg text-slate-300">{profile.summary}</p>
        <p className="text-sm text-slate-400">{profile.availability}</p>

        <div className="flex flex-wrap items-center gap-3">
          {actions.map((action) => (
            <HeroActionButton key={action.label} action={action} />
          ))}
        </div>

        <dl className="flex flex-wrap gap-8 pt-6">
          {highlights.map((highlight) => (
            <HeroHighlightItem key={highlight.label} highlight={highlight} />
          ))}
        </dl>
      </div>

      <HeroAvatar name={profile.name} />
    </section>
  );
}
