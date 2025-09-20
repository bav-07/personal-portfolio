import type { Profile } from "@/data/portfolio";

type SiteFooterProps = {
  profile: Profile;
};

export function SiteFooter({ profile }: SiteFooterProps) {
  return (
    <footer className="flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:justify-between">
      <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
      <span>{profile.location}</span>
    </footer>
  );
}
