import type { Profile } from "@/data/portfolio";

type SiteFooterProps = {
  profile: Profile;
};

export function SiteFooter({ profile }: SiteFooterProps) {
  return (
    <footer className="mt-16 flex flex-col items-center gap-3 border-t border-white/15 pt-8 text-xs text-fuchsia-100/70 sm:flex-row sm:justify-between">
      <span className="tracking-wide">
        {new Date().getFullYear()} <span className="font-display text-white">{profile.name}</span>.
      </span>
      <span className="inline-flex items-center gap-2 text-fuchsia-100/70">
        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300" aria-hidden />
        {profile.location}
      </span>
    </footer>
  );
}
