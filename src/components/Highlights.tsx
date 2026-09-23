import { Activity, Gauge, Server, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { highlights } from "@/data/highlights";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const icons: LucideIcon[] = [Server, Gauge, Timer, Activity];

/** Scannable proof strip — what a hiring manager should notice first. */
export function Highlights() {
  return (
    <Container
      id="impact"
      className="border-y border-ink-200/60 bg-ink-950 py-14 text-ink-100 sm:py-16 md:py-20 dark:border-ink-800"
    >
      <Reveal>
        <SectionHeading
          eyebrow="// impact"
          title="What production looks like day to day"
          description="Not vanity metrics — the work that keeps live apps reachable, releasable, and recoverable."
          tone="inverse"
        />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Reveal key={item.id} delay={index * 60}>
              <article className="h-full rounded-2xl border border-ink-700/80 bg-ink-900/60 p-5">
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                  <Icon size={20} aria-hidden />
                </span>
                <p className="font-display text-2xl font-bold tracking-tight text-white sm:text-[1.65rem]">
                  {item.value}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wide text-brand-300">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">{item.detail}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}
