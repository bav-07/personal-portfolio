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
      className="group relative inline-flex items-center overflow-hidden px-1 py-0.5 text-sm text-fuchsia-100/80 transition-colors duration-300 hover:text-white"
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
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-4">
      <div className="relative isolate mx-auto flex w-full max-w-5xl items-center justify-between gap-6 overflow-hidden rounded-full border border-white/25 bg-white/10 px-6 py-3 shadow-[0_55px_110px_-65px_rgba(244,114,182,0.75)] backdrop-blur sm:mx-6 lg:mx-auto">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.45),_transparent_65%)] opacity-75 transition-opacity duration-700 group-hover:opacity-95"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-30 bg-gradient-to-r from-white/20 via-transparent to-white/20"
        />

        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
            <span className="text-xs tracking-[0.2em] text-slate-100">{initials}</span>
          </div>
          <div className="hidden text-sm leading-tight text-fuchsia-100/80 sm:block">
            <p className="font-display text-base font-semibold text-white">{profile.name}</p>
            <p>{profile.title}</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <a
          className="relative inline-flex items-center gap-2 rounded-full border border-white/35 bg-gradient-to-r from-fuchsia-400/25 via-transparent to-sky-400/25 px-5 py-2 text-sm font-medium text-white transition-all duration-500 hover:border-white/55 hover:text-white"
          href={`mailto:${profile.email}`}
        >
          <span className="relative">Let's talk</span>
        </a>
      </div>
    </header>
  );
}
