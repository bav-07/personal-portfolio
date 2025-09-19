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
      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-colors hover:border-white/30 hover:text-white"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {label}
    </a>
  );
}

function ContactButton({ email }: ContactButtonProps) {
  return (
    <a
      className="inline-flex items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 px-6 py-3 text-sm font-medium text-cyan-100 transition-colors hover:border-cyan-300/70 hover:bg-cyan-400/20"
      href={`mailto:${email}`}
    >
      {email}
    </a>
  );
}

export function ContactSection({ heading, description, socialLinks, email }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="scroll-mt-32 space-y-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/[0.02] to-transparent p-10 text-center"
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">{heading}</h2>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-200">
        {socialLinks.map((link) => (
          <ContactLink key={link.href} {...link} />
        ))}
      </div>
      <ContactButton email={email} />
    </section>
  );
}
