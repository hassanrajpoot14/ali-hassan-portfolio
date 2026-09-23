import { experience } from "@/data";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <Container id="experience" className="py-14 sm:py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="// experience"
          title="Where I've run infrastructure"
          description="Outcome-focused work history — from Linux foundations to remote production DevOps for live customer apps."
        />
      </Reveal>

      <ol className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-brand-400 before:via-brand-300 before:to-accent-400 sm:space-y-8 lg:before:left-1/2 lg:before:-translate-x-px">
        {experience.map((job, index) => {
          const left = index % 2 === 0;
          return (
            <li key={job.id} className="relative">
              <span
                className="absolute left-0 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-brand-500 shadow-soft lg:left-1/2 lg:-translate-x-1/2 dark:border-ink-950"
                aria-hidden
              >
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>

              <Reveal delay={index * 80}>
                <article
                  className={`ml-10 min-w-0 rounded-2xl border border-ink-200/80 bg-white/90 p-4 shadow-sm transition hover:border-brand-300 hover:shadow-soft sm:p-5 lg:ml-0 lg:w-[calc(50%-2rem)] dark:border-ink-700 dark:bg-ink-900/70 dark:hover:border-brand-600 ${
                    left ? "lg:mr-auto" : "lg:ml-auto"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {job.current ? (
                      <span className="rounded-lg bg-accent-100 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-accent-800 dark:bg-accent-900/40 dark:text-accent-300">
                        Current
                      </span>
                    ) : null}
                    <span className="font-mono text-xs text-ink-500 dark:text-ink-400">
                      {job.period}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-lg font-bold text-ink-900 sm:text-xl dark:text-white">
                    {job.role}
                  </h3>
                  <p className="mt-1 break-words text-sm font-medium text-brand-700 dark:text-brand-300">
                    {job.company} · {job.location} · {job.employmentType}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {job.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Container>
  );
}
