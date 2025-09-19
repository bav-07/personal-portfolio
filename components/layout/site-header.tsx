import type { NavItem, Profile } from "@/data/portfolio";
import { getInitials } from "@/lib/get-initials";

type SiteHeaderProps = {
  profile: Profile;
  navItems: NavItem[];
};

type NavLinkProps = NavItem;

function NavLink({ href, label }: NavLinkProps) {
  return (
    <a className="transition-colors hover:text-white" href={href}>
      {label}
    </a>
  );
}

export function SiteHeader({ profile, navItems }: SiteHeaderProps) {
  const initials = getInitials(profile.name);

  return (
    <header
      className="sticky top-4 z-50 flex items-center justify-between gap-6 rounded-full border border-white/10 bg-white/5 px-5 py-3 shadow-[0_20px_45px_-25px_rgba(56,189,248,0.55)] backdrop-blur"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
          {initials}
        </div>
        <div className="hidden text-sm leading-tight text-slate-300 sm:block">
          <p className="font-medium text-white">{profile.name}</p>
          <p>{profile.title}</p>
        </div>
      </div>

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
  );
}
