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
      className="relative transition-colors duration-200 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white/60 after:transition-all after:duration-200 hover:after:w-full" 
      href={href}
    >
      {label}
    </a>
  );
}

export function SiteHeader({ profile, navItems }: SiteHeaderProps) {
  const initials = getInitials(profile.name);

  return (
    <div className="fixed top-4 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 px-6 sm:px-10 lg:px-0">
      <header
        className="flex items-center justify-between gap-6 rounded-full border border-white/10 bg-white/5 px-5 py-3 shadow-[0_20px_45px_-25px_rgba(56,189,248,0.55)] backdrop-blur"
      >
      <a href="#" className="flex items-center gap-3 transition-opacity hover:opacity-80">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
          {initials}
        </div>
        <div className="hidden text-sm leading-tight text-slate-300 sm:block">
          <p className="font-medium text-white">{profile.name}</p>
          <p>{profile.title}</p>
        </div>
      </a>

      <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>

      <a
        className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition-colors hover:border-cyan-300/70 hover:bg-cyan-400/20"
        href={`mailto:${profile.email}`}
      >
        Let's talk
      </a>
    </header>
    </div>
  );
}
