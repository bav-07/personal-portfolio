import type { SocialLink } from "@/data/portfolio";

type ContactSectionProps = {
  heading: string;
  description: string;
  socialLinks: SocialLink[];
  email: string;
};

type ContactLinkProps = SocialLink;

type ContactButtonProps = {
  email: string;
};

function ContactLink({ href, label }: ContactLinkProps) {
  return (
    <a
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-200 transition-colors duration-300 hover:border-white/35 hover:text-white"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span className="relative z-10">{label}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </a>
  );
}

function ContactButton({ email }: ContactButtonProps) {
  return (
    <a
      className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-400/25 via-transparent to-sky-500/25 px-6 py-3 text-sm font-medium text-cyan-100 shadow-[0_40px_100px_-60px_rgba(56,189,248,0.75)] transition-all duration-500 hover:border-cyan-300/70 hover:text-white before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-cyan-400/40 before:via-cyan-200/30 before:to-sky-500/40 before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] hover:before:opacity-100"
      href={`mailto:${email}`}
    >
      <span className="relative z-10">{email}</span>
    </a>
  );
}

export function ContactSection({ heading, description, socialLinks, email }: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-mt-32">
      <div className="relative isolate overflow-hidden rounded-[2.75rem] border border-cyan-400/30 bg-gradient-to-br from-cyan-400/20 via-[#050b19]/80 to-transparent px-10 py-12 text-center shadow-[0_65px_130px_-80px_rgba(56,189,248,0.8)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid-soft opacity-25"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -z-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_70%)] opacity-80 blur-3xl"
        />

        <div className="relative mx-auto max-w-2xl space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{heading}</h2>
            <p className="text-sm leading-relaxed text-slate-200/90">{description}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-200">
            {socialLinks.map((link) => (
              <ContactLink key={link.href} {...link} />
            ))}
          </div>

          <ContactButton email={email} />
        </div>
      </div>
    </section>
  );
}
