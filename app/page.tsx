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
      <SiteHeader profile={profile} navItems={navItems} />
      
      <main
        className="relative isolate mx-auto flex w-full max-w-5xl flex-col gap-24 px-6 pb-24 pt-28 sm:px-10 lg:px-0 before:absolute before:-top-40 before:left-1/2 before:h-[520px] before:w-[520px] before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.22),_transparent_60%)] before:opacity-80 before:blur-[120px] before:content-[''] after:pointer-events-none after:absolute after:-top-24 after:right-[-160px] after:h-[420px] after:w-[420px] after:rounded-full after:bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.18),_transparent_68%)] after:opacity-75 after:blur-3xl after:content-['']"
      >

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
