"use client";

import type { NavItem, Profile } from "@/data/portfolio";
import { getInitials } from "@/lib/get-initials";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useCallback, useEffect, useRef, useState } from "react";

type SiteHeaderProps = {
  profile: Profile;
  navItems: NavItem[];
};

type NavLinkProps = NavItem;

function NavLink({ href, label }: NavLinkProps) {
  return (
    <a
      className="site-header__nav-link group relative inline-flex items-center overflow-hidden rounded-lg px-2 lg:px-4 py-2 text-sm font-semibold transition-all duration-300 hover:shadow-white/20 hover:shadow-lg"
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Reflect mobile nav open state on <body> so global UI (e.g., custom cursor) can adapt
  useEffect(() => {
    document.body.setAttribute("data-nav-open", mobileOpen ? "true" : "false");
    return () => {
      document.body.removeAttribute("data-nav-open");
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  // Basic outside click handling
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closeMobile();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen, closeMobile]);

  // Focus first link when opening
  useEffect(() => {
    if (mobileOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-4 px-6 sm:px-10">
      <div className="site-header__panel relative isolate mx-auto flex w-full max-w-5xl items-center justify-between gap-2 lg:gap-6 overflow-hidden rounded-full border px-6 py-3 backdrop-blur">
        <span
          aria-hidden
          className="site-header__halo pointer-events-none absolute inset-0 -z-20 opacity-75 transition-opacity duration-700"
        />
        <span
          aria-hidden
          className="site-header__glint pointer-events-none absolute inset-0 -z-30"
        />

        <a className="site-header__brand-link flex items-center gap-4" href="#top" data-brand-link>
          {/* <div className="site-header__initials flex h-11 w-11 aspect-square items-center justify-center rounded-full text-sm font-semibold">
            <span className="site-header__initials-text text-xs tracking-[0.2em]">{initials}</span>
          </div> */}
          <div className="site-header__brand-copy text-sm leading-tight">
            <p className="site-header__brand-name font-display text-base font-semibold">{profile.name}</p>
            <p className="site-header__brand-title tracking-tighter">{profile.title}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-2 lg:gap-4 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className="site-header__actions flex items-center gap-3">
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="site-header__social-link relative inline-flex h-9 w-9 items-center justify-center rounded-full  text-white/80 hover:text-white  transition-colors"
            >
              <FaGithub className="h-[1.05rem] w-[1.05rem]" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="site-header__social-link relative inline-flex h-9 w-9 items-center justify-center rounded-full  text-white/80 hover:text-white transition-colors"
            >
              <FaLinkedin className="h-[1.05rem] w-[1.05rem]" />
            </a>
          </div>
          <ThemeToggle />
          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden site-header__toggle relative inline-flex h-10 w-10 items-center justify-center border border-white/5 text-white/90 hover:text-white hover:border-white/15 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile nav panel */}
      <div
        id="mobile-nav-panel"
        ref={panelRef}
        className={`md:hidden fixed backdrop-blur-3xl mx-6 sm:mx-10 rounded-3xl left-0 right-0 top-[calc(var(--header-offset,0px)+5.75rem)] z-40 transition-[opacity,transform,translate] duration-300 ${mobileOpen ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-2'}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-nav__panel relative max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/15 via-white/8 to-transparent px-6 py-6 shadow-[0_50px_120px_-60px_rgba(244,114,182,0.55)]">
          <ul className="flex flex-col gap-2" role="menu">
            {navItems.map((item, idx) => (
              <li key={item.href} role="none">
                <a
                  ref={idx === 0 ? firstLinkRef : undefined}
                  role="menuitem"
                  onClick={closeMobile}
                  className="mobile-nav__link group flex w-full items-center justify-between rounded-full px-4 py-3 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                  href={item.href}
                >
                  <span>{item.label}</span>
                  <span className="h-px w-10 origin-left scale-x-0 bg-gradient-to-r from-cyan-400/80 via-white/70 to-transparent transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
