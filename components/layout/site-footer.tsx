import type { Profile } from "@/data/portfolio";

type SiteFooterProps = {
  profile: Profile;
};

export function SiteFooter({ profile }: SiteFooterProps) {
  return (
    <footer className="mt-16 flex flex-col items-center gap-3 border-t border-white/10 pt-8 text-xs text-slate-500/80 sm:flex-row sm:justify-between">
      <span className="tracking-wide">© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
      <span className="inline-flex items-center gap-2 text-slate-400">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden />
        {profile.location}
      </span>
    </footer>
  );
}
