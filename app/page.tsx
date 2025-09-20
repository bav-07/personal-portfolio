import {
  aboutContent,
  contactCopy,
  experiences,
  heroActions,
  heroHeadline,
  highlights,
  navItems,
  profile,
  projects,
  sectionMeta,
  skillGroups,
  socialLinks,
} from "@/data/portfolio";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <main
        className="relative isolate mx-auto flex w-full max-w-5xl flex-col gap-24 px-6 pb-24 pt-12 sm:px-10 lg:px-0 before:absolute before:-top-40 before:left-1/2 before:h-[520px] before:w-[520px] before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_65%)] before:opacity-70 before:blur-[110px] before:content-[''] after:pointer-events-none after:absolute after:-top-24 after:right-[-160px] after:h-[420px] after:w-[420px] after:rounded-full after:bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.14),_transparent_70%)] after:opacity-70 after:blur-3xl after:content-['']"
      >
        <SiteHeader profile={profile} navItems={navItems} />

        <HeroSection
          profile={profile}
          highlights={highlights}
          actions={heroActions}
          headline={heroHeadline}
        />

        <AboutSection
          eyebrow={sectionMeta.about.eyebrow}
          title={sectionMeta.about.title}
          paragraphs={aboutContent}
        />

        <ExperienceSection
          eyebrow={sectionMeta.experience.eyebrow}
          title={sectionMeta.experience.title}
          experiences={experiences}
        />

        <ProjectsSection
          eyebrow={sectionMeta.projects.eyebrow}
          title={sectionMeta.projects.title}
          projects={projects}
        />

        <SkillsSection
          eyebrow={sectionMeta.skills.eyebrow}
          title={sectionMeta.skills.title}
          groups={skillGroups}
        />

        <ContactSection
          heading={contactCopy.heading}
          description={contactCopy.description}
          socialLinks={socialLinks}
          email={profile.email}
        />

        <SiteFooter profile={profile} />
      </main>
    </div>
  );
}
