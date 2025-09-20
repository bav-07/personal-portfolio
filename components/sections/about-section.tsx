import { SectionHeader } from "@/components/common/section-header";

type AboutSectionProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export function AboutSection({ eyebrow, title, paragraphs }: AboutSectionProps) {
  const [leadParagraph, ...additionalParagraphs] = paragraphs;

  return (
    <section
      id="about"
      className="relative isolate scroll-mt-32 overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[0.02] p-8 shadow-[0_55px_100px_-70px_rgba(56,189,248,0.55)] backdrop-blur md:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-soft opacity-35"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 -z-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.28),_transparent_70%)] opacity-70 blur-[120px]"
      />

      <div className="relative space-y-10">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          {leadParagraph ? (
            <article className="relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-gradient-to-br from-white/[0.1] via-white/[0.03] to-transparent p-6 text-base leading-relaxed text-slate-100/90 shadow-[0_40px_80px_-55px_rgba(56,189,248,0.65)]">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-px rounded-[2rem] border border-white/10 opacity-40"
              />
              <p className="relative z-10">{leadParagraph}</p>
            </article>
          ) : null}

          {additionalParagraphs.length ? (
            <div className="relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-white/[0.03] p-6 text-base leading-relaxed text-slate-300 shadow-[0_35px_70px_-55px_rgba(56,189,248,0.5)]">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50"
              />
              <div className="relative z-10 space-y-4">
                {additionalParagraphs.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
