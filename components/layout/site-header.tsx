import type { NavItem, Profile } from "@/data/portfolio";
import { getInitials } from "@/lib/get-initials";

type SiteHeaderProps = {
  profile: Profile;
  navItems: NavItem[];
};

type NavLinkProps = NavItem;

function NavLink({ href, label }: NavLinkProps) {
  return (
    <a
      className="group relative inline-flex items-center overflow-hidden px-1 py-0.5 text-sm text-slate-300 transition-colors duration-300 hover:text-white"
      href={href}
    >
      {label}
      <span className="pointer-events-none absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-400/80 via-white/70 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}

export function SiteHeader({ profile, navItems }: SiteHeaderProps) {
  const initials = getInitials(profile.name);

  return (
    <header className="sticky top-4 z-50">
      <div className="group relative isolate flex items-center justify-between gap-6 overflow-hidden rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 shadow-[0_45px_90px_-50px_rgba(56,189,248,0.8)] backdrop-blur">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.4),_transparent_65%)] opacity-70 transition-opacity duration-700 group-hover:opacity-90"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-30 bg-gradient-to-r from-white/10 via-transparent to-white/10"
        />

        <div className="flex items-center gap-4">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10 text-sm font-semibold text-white shadow-[0_25px_55px_-35px_rgba(56,189,248,0.9)] before:absolute before:inset-[1.5px] before:rounded-full before:bg-[#060a18]/85 before:opacity-90 before:backdrop-blur before:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_70%)] after:opacity-60 after:content-['']">
            <span className="relative z-10 text-xs tracking-[0.2em] text-slate-100">{initials}</span>
          </div>
          <div className="hidden text-sm leading-tight text-slate-400 sm:block">
            <p className="font-medium text-white">{profile.name}</p>
            <p>{profile.title}</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <a
          className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-400/20 via-transparent to-sky-500/20 px-5 py-2 text-sm font-medium text-cyan-100 shadow-[0_20px_45px_-25px_rgba(56,189,248,0.6)] transition-all duration-500 hover:border-cyan-300/70 hover:text-white before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-cyan-400/40 before:via-cyan-200/20 before:to-sky-500/40 before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] hover:before:opacity-100"
          href={`mailto:${profile.email}`}
        >
          <span className="relative">Let's talk</span>
        </a>
      </div>
    </header>
  );
}
