import type { NavItem, Profile } from "@/data/portfolio";
import { getInitials } from "@/lib/get-initials";
import { ThemeToggle } from "@/components/common/theme-toggle";

type SiteHeaderProps = {
  profile: Profile;
  navItems: NavItem[];
};

type NavLinkProps = NavItem;

function NavLink({ href, label }: NavLinkProps) {
  return (
    <a
      className="site-header__nav-link group relative inline-flex items-center overflow-hidden rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:shadow-white/20 hover:shadow-lg"
      href={href}
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {label}
      {/* <span className="pointer-events-none absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-400/80 via-white/70 to-transparent transition-transform duration-300 group-hover:scale-x-100" /> */}
    </a>
  );
}

export function SiteHeader({ profile, navItems }: SiteHeaderProps) {
  const initials = getInitials(profile.name);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-4">
      <div className="site-header__panel relative isolate mx-auto flex w-full max-w-5xl items-center justify-between gap-6 overflow-hidden rounded-full border px-6 py-3 backdrop-blur sm:mx-6 lg:mx-auto">
        <span
          aria-hidden
          className="site-header__halo pointer-events-none absolute inset-0 -z-20 opacity-75 transition-opacity duration-700"
        />
        <span
          aria-hidden
          className="site-header__glint pointer-events-none absolute inset-0 -z-30"
        />

        <a className="site-header__brand-link flex items-center gap-4" href="#top" data-brand-link>
          <div className="site-header__initials flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold">
            <span className="site-header__initials-text text-xs tracking-[0.2em]">{initials}</span>
          </div>
          <div className="site-header__brand-copy hidden text-sm leading-tight sm:block">
            <p className="site-header__brand-name font-display text-base font-semibold">{profile.name}</p>
            <p className="site-header__brand-title">{profile.title}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className="site-header__actions flex items-center gap-3">
          <ThemeToggle />
          <a
            className="site-header__cta relative inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-all duration-500"
            href={`mailto:${profile.email}`}
          >
            <span className="relative">Let's talk</span>
          </a>
        </div>
      </div>
    </header>
  );
}
