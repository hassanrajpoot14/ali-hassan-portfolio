import {
  Boxes,
  Cloud,
  HardDrive,
  MonitorSmartphone,
  RefreshCw,
  Server,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillCategories } from "@/data";
import type { SkillCategory } from "@/data";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const iconMap: Record<SkillCategory["icon"], LucideIcon> = {
  container: Boxes,
  server: Server,
  cicd: RefreshCw,
  cloud: Cloud,
  hosting: HardDrive,
  os: MonitorSmartphone,
  security: ShieldCheck,
};

export function Skills() {
  return (
    <Container
      id="skills"
      className="border-y border-ink-200/60 bg-gradient-to-b from-brand-50/40 via-white to-accent-50/30 py-14 sm:py-20 md:py-28 dark:border-ink-800 dark:from-ink-950 dark:via-ink-950 dark:to-ink-900"
    >
      <Reveal>
        <SectionHeading
          eyebrow="// skills"
          title="Toolchain that keeps prod healthy"
          description="What I use to ship and run systems — containers, edge proxy, CI/CD, Linux, and observability."
        />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {skillCategories.map((category, index) => {
          const Icon = iconMap[category.icon];
          return (
            <Reveal key={category.id} delay={index * 60}>
              <article className="h-full rounded-2xl border border-ink-200/80 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft sm:p-5 dark:border-ink-700 dark:bg-ink-900/60 dark:hover:border-brand-600">
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-accent-400/20 text-brand-700 sm:h-11 sm:w-11 dark:text-brand-300">
                    <Icon size={22} aria-hidden />
                  </span>
                  <h3 className="min-w-0 font-display text-base font-semibold leading-snug text-ink-900 sm:text-lg dark:text-ink-50">
                    {category.title}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li key={skill.name}>
                      <div className="mb-1.5 flex items-center justify-between gap-2 text-sm sm:gap-3">
                        <span className="min-w-0 truncate font-medium text-ink-700 dark:text-ink-200">
                          {skill.name}
                        </span>
                        <span className="shrink-0 font-mono text-xs text-ink-400">{skill.level}%</span>
                      </div>
                      <div
                        className="h-2 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800"
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${skill.name} proficiency`}
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}
