import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const accentBar: Record<(typeof projects)[number]["accent"], string> = {
  teal: "from-brand-500 to-brand-700",
  lime: "from-accent-400 to-accent-600",
  sky: "from-sky-400 to-sky-600",
  amber: "from-amber-400 to-amber-600",
  cyan: "from-cyan-400 to-cyan-600",
};

/** Case-study cards — problem → outcome, not generic project placeholders. */
export function Projects() {
  return (
    <Container id="projects" className="py-14 sm:py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="// work"
          title="Production case studies"
          description="Real infrastructure work from live customer systems — details anonymized where needed, outcomes kept concrete."
        />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 70}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft dark:border-ink-700 dark:bg-ink-900/70 dark:hover:border-brand-600">
              <div
                className={`relative flex min-h-[7.5rem] flex-col justify-between bg-gradient-to-br p-5 text-white ${accentBar[project.accent]}`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                    maskImage: "radial-gradient(ellipse at 30% 20%, black 20%, transparent 70%)",
                  }}
                  aria-hidden
                />
                <p className="relative font-mono text-[11px] uppercase tracking-wide text-white/85">
                  {project.context}
                </p>
                <h3 className="relative mt-3 font-display text-xl font-bold leading-snug tracking-tight sm:text-[1.35rem]">
                  {project.title}
                </h3>
              </div>

              <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {project.summary}
                </p>

                <dl className="mt-4 space-y-3 border-t border-ink-100 pt-4 dark:border-ink-800">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wide text-ink-400">
                      Problem
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                      {project.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wide text-accent-700 dark:text-accent-400">
                      Outcome
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
                      {project.outcome}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                  {project.tech.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-lg border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-200"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {(project.githubUrl || project.liveUrl) && (
                  <div className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4 dark:border-ink-800">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 transition hover:text-brand-700 dark:text-ink-200 dark:hover:text-brand-300"
                      >
                        Source
                        <ArrowUpRight size={14} aria-hidden />
                      </a>
                    ) : null}
                    {project.liveUrl && project.liveUrl !== "#" ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 transition hover:text-brand-700 dark:text-ink-200 dark:hover:text-brand-300"
                      >
                        Live
                        <ArrowUpRight size={14} aria-hidden />
                      </a>
                    ) : null}
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
