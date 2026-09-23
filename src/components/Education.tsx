import { GraduationCap } from "lucide-react";
import { education } from "@/data";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** Compact education cards — same layout for every entry, quieter than Experience. */
export function Education() {
  return (
    <Container id="education" className="py-12 sm:py-16 md:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="// education"
          title="Education"
          description="Academic path, most recent first."
        />
      </Reveal>

      <div className="mx-auto max-w-2xl space-y-3">
        {education.map((item, index) => (
          <Reveal key={item.id} delay={index * 50}>
            <article className="flex items-start gap-3 rounded-2xl border border-ink-200/80 bg-white/90 px-3.5 py-3.5 shadow-sm dark:border-ink-700 dark:bg-ink-900/70 sm:gap-4 sm:px-5 sm:py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-400 text-white shadow-soft sm:h-11 sm:w-11">
                <GraduationCap size={20} aria-hidden />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <h3 className="break-words font-display text-[0.95rem] font-semibold leading-snug text-ink-900 sm:text-lg dark:text-white">
                  {item.degree}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-brand-700 dark:text-brand-300">
                  {item.institution}
                </p>
                {item.location ? (
                  <p className="mt-0.5 text-sm text-ink-500 dark:text-ink-400">{item.location}</p>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
