import { SectionHeader } from "@/components/common/section-header";

type AboutSectionProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export function AboutSection({ eyebrow, title, paragraphs }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="scroll-mt-32 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur"
    >
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="grid gap-6 text-slate-300 md:grid-cols-2">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </section>
  );
}
