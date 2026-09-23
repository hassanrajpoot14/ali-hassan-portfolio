import { principles } from "@/data/principles";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** Operating philosophy — differentiates reliability-minded engineers. */
export function Approach() {
  return (
    <Container id="approach" className="py-14 sm:py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="// approach"
          title="How I keep production calm"
          description="Principles I actually use when pipelines break, certificates expire, or a VPS runs hot at the wrong hour."
        />
      </Reveal>

      <ol className="grid gap-4 sm:grid-cols-2 lg:gap-5">
        {principles.map((item, index) => (
          <Reveal key={item.id} delay={index * 70}>
            <li className="flex h-full gap-4 rounded-2xl border border-ink-200/80 bg-white/90 p-5 dark:border-ink-700 dark:bg-ink-900/70">
              <span
                className="font-mono text-sm font-semibold text-brand-600 dark:text-brand-400"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {item.body}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Container>
  );
}
